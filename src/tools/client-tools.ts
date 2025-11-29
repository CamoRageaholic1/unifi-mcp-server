/**
 * Client Management Tools for UniFi MCP Server
 * Created by: CamoZeroDay
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerClientTools(): Tool[] {
  return [
    {
      name: 'client_list',
      description: 'List all connected clients (wireless and wired) including their device name, IP, MAC, connection type, and signal strength',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'client_get',
      description: 'Get detailed information about a specific client by MAC address including bandwidth usage, connection history',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_block',
      description: 'Block a client from accessing the network by MAC address. The client will not be able to connect until unblocked.',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client to block',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_unblock',
      description: 'Unblock a previously blocked client to restore network access',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client to unblock',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_reconnect',
      description: 'Force a client to reconnect (disconnect and allow immediate reconnection)',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_set_bandwidth_limit',
      description: 'Set bandwidth limits for a specific client',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client',
          },
          download_limit_kbps: {
            type: 'number',
            description: 'Download limit in Kbps (0 for unlimited)',
          },
          upload_limit_kbps: {
            type: 'number',
            description: 'Upload limit in Kbps (0 for unlimited)',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_set_name',
      description: 'Set a friendly name for a client device',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client',
          },
          name: {
            type: 'string',
            description: 'Friendly name to assign',
          },
        },
        required: ['mac', 'name'],
      },
    },
    {
      name: 'client_forget',
      description: 'Remove a client from the known clients list',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the client',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'client_filter_active',
      description: 'List only currently active/connected clients',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  ];
}
