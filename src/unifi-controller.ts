/**
 * UniFi Controller API Wrapper
 * Provides abstraction layer for UniFi Controller interactions
 * 
 * Created by: CamoZeroDay
 * @license MIT
 */

import UniFi from 'node-unifi';
import { logger } from './utils/logger.js';
import type { Config, UniFiDevice, UniFiClient, UniFiNetwork, UniFiHealth } from './types/config.js';

export class UniFiController {
  private controller: UniFi | null = null;
  private config: Config;
  private connected: boolean = false;

  constructor(config: Config) {
    this.config = config;
    logger.info(`UniFi Controller initialized for ${config.controllerUrl}, site: ${config.site}`);
  }

  /**
   * Connect to the UniFi Controller
   */
  async connect(): Promise<void> {
    if (this.connected && this.controller) {
      return;
    }

    try {
      logger.info('Connecting to UniFi Controller...');
      
      const url = new URL(this.config.controllerUrl);
      
      this.controller = new UniFi.Controller({
        host: url.hostname,
        port: url.port || '8443',
        username: this.config.username,
        password: this.config.password,
        site: this.config.site,
        insecure: !this.config.verifySsl,
      });

      // Test connection by getting site info
      await this.controller.getSitesStats();
      this.connected = true;
      logger.info('Successfully connected to UniFi Controller');
    } catch (error) {
      logger.error('Failed to connect to UniFi Controller:', error);
      throw new Error(`UniFi Controller connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Disconnect from the UniFi Controller
   */
  async disconnect(): Promise<void> {
    if (this.controller && this.connected) {
      try {
        await this.controller.logout();
        this.connected = false;
        this.controller = null;
        logger.info('Disconnected from UniFi Controller');
      } catch (error) {
        logger.error('Error during disconnection:', error);
      }
    }
  }

  /**
   * Ensure we're connected before making API calls
   */
  private ensureConnected(): UniFi.Controller {
    if (!this.connected || !this.controller) {
      throw new Error('Not connected to UniFi Controller');
    }
    return this.controller;
  }

  // Device Management Methods

  /**
   * List all devices in the network
   */
  async listDevices(): Promise<UniFiDevice[]> {
    const controller = this.ensureConnected();
    const devices = await controller.getAccessDevices(this.config.site);
    return devices as UniFiDevice[];
  }

  /**
   * Get specific device by MAC address
   */
  async getDevice(mac: string): Promise<UniFiDevice | null> {
    const devices = await this.listDevices();
    return devices.find(d => d.mac.toLowerCase() === mac.toLowerCase()) || null;
  }

  /**
   * Restart a device by MAC address
   */
  async restartDevice(mac: string): Promise<boolean> {
    const controller = this.ensureConnected();
    await controller.restartDevice(this.config.site, mac);
    return true;
  }

  /**
   * Enable/disable device LED for location identification
   */
  async locateDevice(mac: string, enable: boolean): Promise<boolean> {
    const controller = this.ensureConnected();
    if (enable) {
      await controller.setDeviceLed(this.config.site, mac, true);
    } else {
      await controller.setDeviceLed(this.config.site, mac, false);
    }
    return true;
  }

  // Client Management Methods

  /**
   * List all clients (connected and recently connected)
   */
  async listClients(): Promise<UniFiClient[]> {
    const controller = this.ensureConnected();
    const clients = await controller.getClientDevices(this.config.site);
    return clients as UniFiClient[];
  }

  /**
   * Get specific client by MAC address
   */
  async getClient(mac: string): Promise<UniFiClient | null> {
    const clients = await this.listClients();
    return clients.find(c => c.mac.toLowerCase() === mac.toLowerCase()) || null;
  }

  /**
   * Block a client from the network
   */
  async blockClient(mac: string): Promise<boolean> {
    const controller = this.ensureConnected();
    await controller.blockClient(this.config.site, mac);
    return true;
  }

  /**
   * Unblock a previously blocked client
   */
  async unblockClient(mac: string): Promise<boolean> {
    const controller = this.ensureConnected();
    await controller.unblockClient(this.config.site, mac);
    return true;
  }

  // Network Management Methods

  /**
   * List all networks/VLANs
   */
  async listNetworks(): Promise<UniFiNetwork[]> {
    const controller = this.ensureConnected();
    const networks = await controller.getNetworkConf(this.config.site);
    return networks as UniFiNetwork[];
  }

  /**
   * Get site health information
   */
  async getSiteHealth(): Promise<UniFiHealth[]> {
    const controller = this.ensureConnected();
    const health = await controller.getSitesStats();
    return health as UniFiHealth[];
  }

  /**
   * Get detailed site statistics
   */
  async getSiteStats(): Promise<Record<string, unknown>> {
    const controller = this.ensureConnected();
    const stats = await controller.getSitesStats();
    return stats as Record<string, unknown>;
  }
}
