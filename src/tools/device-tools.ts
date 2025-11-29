/**
 * Device Management Tools for UniFi MCP Server
 * Created by: CamoZeroDay
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export function registerDeviceTools(): Tool[] {
  return [
    {
      name: 'device_list',
      description: 'List all UniFi devices (APs, switches, gateways) in the network with their status, model, IP, and version information',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
    {
      name: 'device_get',
      description: 'Get detailed information about a specific UniFi device by MAC address including uptime, clients, traffic stats',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the device (e.g., "aa:bb:cc:dd:ee:ff")',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'device_restart',
      description: 'Restart/reboot a specific UniFi device by MAC address. This will cause brief downtime for the device.',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the device to restart',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'device_locate',
      description: 'Enable or disable LED blinking on a device to physically locate it. Useful for finding devices in server racks.',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the device',
          },
          enable: {
            type: 'boolean',
            description: 'true to start blinking LED, false to stop',
          },
        },
        required: ['mac', 'enable'],
      },
    },
    {
      name: 'device_adopt',
      description: 'Adopt a new UniFi device into the network',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the device to adopt',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'device_upgrade',
      description: 'Upgrade firmware on a specific device',
      inputSchema: {
        type: 'object',
        properties: {
          mac: {
            type: 'string',
            description: 'MAC address of the device to upgrade',
          },
        },
        required: ['mac'],
      },
    },
    {
      name: 'port_list',
      description: 'List all switch ports and their configuration',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
        },
        required: ['switch_mac'],
      },
    },
    {
      name: 'port_enable',
      description: 'Enable a specific switch port',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
        },
        required: ['switch_mac', 'port_idx'],
      },
    },
    {
      name: 'port_disable',
      description: 'Disable a specific switch port',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
        },
        required: ['switch_mac', 'port_idx'],
      },
    },
    {
      name: 'poe_enable',
      description: 'Enable Power over Ethernet on a specific port',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
        },
        required: ['switch_mac', 'port_idx'],
      },
    },
    {
      name: 'poe_disable',
      description: 'Disable Power over Ethernet on a specific port',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
        },
        required: ['switch_mac', 'port_idx'],
      },
    },
    {
      name: 'port_configure_vlan',
      description: 'Configure VLAN settings for a switch port',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
          vlan_id: {
            type: 'number',
            description: 'VLAN ID to assign',
          },
        },
        required: ['switch_mac', 'port_idx', 'vlan_id'],
      },
    },
    {
      name: 'port_cycle',
      description: 'Power cycle a switch port (turn off then on)',
      inputSchema: {
        type: 'object',
        properties: {
          switch_mac: {
            type: 'string',
            description: 'MAC address of the switch',
          },
          port_idx: {
            type: 'number',
            description: 'Port index number (1-based)',
          },
        },
        required: ['switch_mac', 'port_idx'],
      },
    },
  ];
}
