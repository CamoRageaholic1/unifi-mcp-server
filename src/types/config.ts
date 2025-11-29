import { z } from 'zod';

/**
 * Configuration schema for UniFi MCP Server
 * Created by: CamoZeroDay
 */
export const ConfigSchema = z.object({
  controllerUrl: z.string().url({
    message: 'UNIFI_CONTROLLER_URL must be a valid URL',
  }),
  username: z.string().min(1, {
    message: 'UNIFI_USERNAME is required',
  }),
  password: z.string().min(1, {
    message: 'UNIFI_PASSWORD is required',
  }),
  site: z.string().default('default'),
  verifySsl: z.boolean().default(true),
});

export type Config = z.infer<typeof ConfigSchema>;

/**
 * UniFi Device interface
 */
export interface UniFiDevice {
  _id: string;
  mac: string;
  name: string;
  type: string;
  model: string;
  version: string;
  state: number;
  adopted: boolean;
  ip: string;
  uptime: number;
  lastSeen: number;
  upgradable: boolean;
  displayableVersion?: string;
}

/**
 * UniFi Client interface
 */
export interface UniFiClient {
  _id: string;
  mac: string;
  name?: string;
  hostname?: string;
  ip: string;
  network?: string;
  apMac?: string;
  apName?: string;
  essid?: string;
  channel?: number;
  signal?: number;
  rssi?: number;
  noise?: number;
  txRate?: number;
  rxRate?: number;
  txBytes?: number;
  rxBytes?: number;
  uptime?: number;
  lastSeen: number;
  blocked?: boolean;
  isWired: boolean;
  isGuest?: boolean;
}

/**
 * UniFi Network interface
 */
export interface UniFiNetwork {
  _id: string;
  name: string;
  purpose: string;
  vlan?: number;
  enabled: boolean;
  isNat?: boolean;
  dhcpdEnabled?: boolean;
  ipSubnet?: string;
  dhcpdStart?: string;
  dhcpdStop?: string;
  numSta?: number;
}

/**
 * UniFi Health Status
 */
export interface UniFiHealth {
  subsystem: string;
  status: 'ok' | 'warning' | 'error';
  numUser?: number;
  numGuest?: number;
  numAdopted?: number;
  numAp?: number;
  numSw?: number;
  numGw?: number;
  wanIp?: string;
  latency?: number;
  uptime?: number;
  drops?: number;
  xputUp?: number;
  xputDown?: number;
  speedtestStatus?: string;
  speedtestLastrun?: number;
  speedtestPing?: number;
}

/**
 * Tool execution result
 */
export interface ToolResult {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}
