/**
 * Network & WiFi Management Tools for UniFi MCP Server
 * Created by: CamoZeroDay
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerNetworkTools(): Tool[] {
  return [
    {
      name: 'network_list',
      description: 'List all configured networks/VLANs with their subnets, DHCP settings, and client counts',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'network_health',
      description: 'Get overall system health including uptime, connected clients, bandwidth usage',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'network_stats',
      description: 'Get detailed network statistics including throughput, latency, packet loss',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'wifi_list',
      description: 'List all WiFi networks (SSIDs) with their security settings and enabled status',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'wifi_configure',
      description: 'Configure WiFi network settings including SSID name, password, security type',
      inputSchema: {
        type: 'object',
        properties: {
          wifi_id: {
            type: 'string',
            description: 'WiFi network ID',
          },
          ssid: {
            type: 'string',
            description: 'New SSID name (optional)',
          },
          password: {
            type: 'string',
            description: 'New WiFi password (optional)',
          },
          enabled: {
            type: 'boolean',
            description: 'Enable or disable the WiFi network (optional)',
          },
        },
        required: ['wifi_id'],
      },
    },
    {
      name: 'wifi_enable',
      description: 'Enable a WiFi network by ID',
      inputSchema: {
        type: 'object',
        properties: {
          wifi_id: {
            type: 'string',
            description: 'WiFi network ID',
          },
        },
        required: ['wifi_id'],
      },
    },
    {
      name: 'wifi_disable',
      description: 'Disable a WiFi network by ID',
      inputSchema: {
        type: 'object',
        properties: {
          wifi_id: {
            type: 'string',
            description: 'WiFi network ID',
          },
        },
        required: ['wifi_id'],
      },
    },
    {
      name: 'wifi_set_password',
      description: 'Change the password for a WiFi network',
      inputSchema: {
        type: 'object',
        properties: {
          wifi_id: {
            type: 'string',
            description: 'WiFi network ID',
          },
          password: {
            type: 'string',
            description: 'New password (8-63 characters)',
          },
        },
        required: ['wifi_id', 'password'],
      },
    },
    {
      name: 'wifi_set_name',
      description: 'Change the SSID (name) of a WiFi network',
      inputSchema: {
        type: 'object',
        properties: {
          wifi_id: {
            type: 'string',
            description: 'WiFi network ID',
          },
          ssid: {
            type: 'string',
            description: 'New SSID name',
          },
        },
        required: ['wifi_id', 'ssid'],
      },
    },
    {
      name: 'network_create',
      description: 'Create a new network/VLAN',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Network name',
          },
          purpose: {
            type: 'string',
            description: 'Network purpose (corporate, guest, vlan-only)',
          },
          vlan_id: {
            type: 'number',
            description: 'VLAN ID (2-4094)',
          },
          subnet: {
            type: 'string',
            description: 'IP subnet (e.g., "192.168.20.0/24")',
          },
        },
        required: ['name', 'purpose', 'vlan_id', 'subnet'],
      },
    },
    {
      name: 'network_modify',
      description: 'Modify an existing network configuration',
      inputSchema: {
        type: 'object',
        properties: {
          network_id: {
            type: 'string',
            description: 'Network ID to modify',
          },
          name: {
            type: 'string',
            description: 'New network name (optional)',
          },
          enabled: {
            type: 'boolean',
            description: 'Enable/disable network (optional)',
          },
        },
        required: ['network_id'],
      },
    },
    {
      name: 'network_delete',
      description: 'Delete a network/VLAN',
      inputSchema: {
        type: 'object',
        properties: {
          network_id: {
            type: 'string',
            description: 'Network ID to delete',
          },
        },
        required: ['network_id'],
      },
    },
    {
      name: 'dhcp_configure',
      description: 'Configure DHCP settings for a network',
      inputSchema: {
        type: 'object',
        properties: {
          network_id: {
            type: 'string',
            description: 'Network ID',
          },
          enabled: {
            type: 'boolean',
            description: 'Enable DHCP',
          },
          start_ip: {
            type: 'string',
            description: 'DHCP range start IP',
          },
          end_ip: {
            type: 'string',
            description: 'DHCP range end IP',
          },
        },
        required: ['network_id'],
      },
    },
    {
      name: 'firewall_list_rules',
      description: 'List all firewall rules',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'firewall_create_rule',
      description: 'Create a new firewall rule',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Rule name',
          },
          action: {
            type: 'string',
            description: 'Action: accept, drop, reject',
          },
          protocol: {
            type: 'string',
            description: 'Protocol: all, tcp, udp, icmp',
          },
          src_address: {
            type: 'string',
            description: 'Source IP/CIDR',
          },
          dst_address: {
            type: 'string',
            description: 'Destination IP/CIDR',
          },
        },
        required: ['name', 'action'],
      },
    },
    {
      name: 'portforward_list',
      description: 'List all port forwarding rules',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'portforward_create',
      description: 'Create a port forwarding rule',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Rule name',
          },
          external_port: {
            type: 'number',
            description: 'External port number',
          },
          internal_ip: {
            type: 'string',
            description: 'Internal IP address',
          },
          internal_port: {
            type: 'number',
            description: 'Internal port number',
          },
          protocol: {
            type: 'string',
            description: 'Protocol: tcp, udp, tcp_udp',
          },
        },
        required: ['name', 'external_port', 'internal_ip', 'internal_port', 'protocol'],
      },
    },
    {
      name: 'portforward_enable',
      description: 'Enable a port forwarding rule',
      inputSchema: {
        type: 'object',
        properties: {
          rule_id: {
            type: 'string',
            description: 'Port forward rule ID',
          },
        },
        required: ['rule_id'],
      },
    },
    {
      name: 'portforward_disable',
      description: 'Disable a port forwarding rule',
      inputSchema: {
        type: 'object',
        properties: {
          rule_id: {
            type: 'string',
            description: 'Port forward rule ID',
          },
        },
        required: ['rule_id'],
      },
    },
    {
      name: 'system_health',
      description: 'Get comprehensive system health across all subsystems',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'system_alerts',
      description: 'List recent system alerts and notifications',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'system_events',
      description: 'Get recent system events log',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: 'Number of events to retrieve (default: 100)',
          },
        },
        required: [],
      },
    },
    {
      name: 'site_backup',
      description: 'Create a backup of site configuration',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'site_info',
      description: 'Get detailed site information and configuration',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  ];
}
