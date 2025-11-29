#!/usr/bin/env node
/**
 * UniFi Network MCP Server
 * Main entry point for the MCP server
 * 
 * Created by: CamoZeroDay
 * @license MIT
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { UniFiController } from './unifi-controller.js';
import { registerDeviceTools } from './tools/device-tools.js';
import { registerClientTools } from './tools/client-tools.js';
import { registerNetworkTools } from './tools/network-tools.js';
import { logger } from './utils/logger.js';
import { ConfigSchema, type Config } from './types/config.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class UniFiMCPServer {
  private server: Server;
  private controller: UniFiController;
  private config: Config;

  constructor() {
    this.server = new Server(
      {
        name: 'unifi-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    // Load and validate configuration
    this.config = this.loadConfig();
    this.controller = new UniFiController(this.config);

    this.setupHandlers();
  }

  private loadConfig(): Config {
    const config = {
      controllerUrl: process.env.UNIFI_CONTROLLER_URL,
      username: process.env.UNIFI_USERNAME,
      password: process.env.UNIFI_PASSWORD,
      site: process.env.UNIFI_SITE || 'default',
      verifySsl: process.env.UNIFI_VERIFY_SSL !== 'false',
    };

    return ConfigSchema.parse(config);
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          ...registerDeviceTools(),
          ...registerClientTools(),
          ...registerNetworkTools(),
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        await this.controller.connect();

        // Route to appropriate tool handler
        if (name.startsWith('device_') || name.startsWith('port_') || name.startsWith('poe_')) {
          return await this.handleDeviceTool(name, args);
        } else if (name.startsWith('client_')) {
          return await this.handleClientTool(name, args);
        } else if (name.startsWith('network_') || name.startsWith('wifi_') || 
                   name.startsWith('dhcp_') || name.startsWith('firewall_') ||
                   name.startsWith('portforward_') || name.startsWith('system_') ||
                   name.startsWith('site_')) {
          return await this.handleNetworkTool(name, args);
        }

        throw new Error(`Unknown tool: ${name}`);
      } catch (error) {
        logger.error(`Error executing tool ${name}:`, error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'unifi://devices',
            name: 'UniFi Devices',
            description: 'List of all UniFi devices in the network',
            mimeType: 'application/json',
          },
          {
            uri: 'unifi://clients',
            name: 'UniFi Clients',
            description: 'List of all connected clients',
            mimeType: 'application/json',
          },
          {
            uri: 'unifi://health',
            name: 'System Health',
            description: 'Overall system health status',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resource content
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      try {
        await this.controller.connect();

        if (uri === 'unifi://devices') {
          const devices = await this.controller.listDevices();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(devices, null, 2),
              },
            ],
          };
        }

        if (uri === 'unifi://clients') {
          const clients = await this.controller.listClients();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(clients, null, 2),
              },
            ],
          };
        }

        if (uri === 'unifi://health') {
          const health = await this.controller.getSiteHealth();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(health, null, 2),
              },
            ],
          };
        }

        throw new Error(`Unknown resource: ${uri}`);
      } catch (error) {
        logger.error(`Error reading resource ${uri}:`, error);
        throw error;
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => this.cleanup().catch(console.error));
    process.on('SIGTERM', () => this.cleanup().catch(console.error));
  }

  private async handleDeviceTool(name: string, args: Record<string, unknown>) {
    const mac = args.mac as string;

    switch (name) {
      case 'device_list':
        const devices = await this.controller.listDevices();
        return {
          content: [{ type: 'text', text: JSON.stringify(devices, null, 2) }],
        };

      case 'device_get':
        const device = await this.controller.getDevice(mac);
        if (!device) {
          return {
            content: [{ type: 'text', text: `Device with MAC ${mac} not found` }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(device, null, 2) }],
        };

      case 'device_restart':
        await this.controller.restartDevice(mac);
        return {
          content: [{ type: 'text', text: `Successfully restarted device ${mac}` }],
        };

      case 'device_locate':
        const enable = args.enable as boolean;
        await this.controller.locateDevice(mac, enable);
        return {
          content: [
            {
              type: 'text',
              text: `Device location LED ${enable ? 'enabled' : 'disabled'} for ${mac}`,
            },
          ],
        };

      default:
        return {
          content: [{ type: 'text', text: `Tool ${name} not yet implemented` }],
        };
    }
  }

  private async handleClientTool(name: string, args: Record<string, unknown>) {
    const mac = args.mac as string;

    switch (name) {
      case 'client_list':
        const clients = await this.controller.listClients();
        return {
          content: [{ type: 'text', text: JSON.stringify(clients, null, 2) }],
        };

      case 'client_get':
        const client = await this.controller.getClient(mac);
        if (!client) {
          return {
            content: [{ type: 'text', text: `Client with MAC ${mac} not found` }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(client, null, 2) }],
        };

      case 'client_block':
        await this.controller.blockClient(mac);
        return {
          content: [{ type: 'text', text: `Successfully blocked client ${mac}` }],
        };

      case 'client_unblock':
        await this.controller.unblockClient(mac);
        return {
          content: [{ type: 'text', text: `Successfully unblocked client ${mac}` }],
        };

      default:
        return {
          content: [{ type: 'text', text: `Tool ${name} not yet implemented` }],
        };
    }
  }

  private async handleNetworkTool(name: string, args: Record<string, unknown>) {
    switch (name) {
      case 'network_list':
        const networks = await this.controller.listNetworks();
        return {
          content: [{ type: 'text', text: JSON.stringify(networks, null, 2) }],
        };

      case 'network_health':
      case 'system_health':
        const health = await this.controller.getSiteHealth();
        return {
          content: [{ type: 'text', text: JSON.stringify(health, null, 2) }],
        };

      case 'network_stats':
        const stats = await this.controller.getSiteStats();
        return {
          content: [{ type: 'text', text: JSON.stringify(stats, null, 2) }],
        };

      default:
        return {
          content: [{ type: 'text', text: `Tool ${name} not yet implemented` }],
        };
    }
  }

  private async cleanup(): Promise<void> {
    logger.info('Shutting down UniFi MCP Server...');
    await this.controller.disconnect();
    await this.server.close();
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info('UniFi MCP Server running on stdio');
  }
}

// Start the server
const server = new UniFiMCPServer();
server.run().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});
