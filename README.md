# UniFi Network MCP Server

A comprehensive Model Context Protocol (MCP) server providing programmatic access to UniFi Network Controller APIs. Enables AI assistants like Claude to manage and monitor UniFi network infrastructure through natural language.

**🏆 All Credit: CamoZeroday**

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/CamoRageaholic1/unifi-mcp-server
cd unifi-mcp-server
npm install

# 2. Configure
cp .env.example .env
# Edit .env with your UniFi credentials

# 3. Build and run
npm run build
npm start
```

## ✨ Features

### 46 Management Tools Across 9 Categories

- 📱 **Device Management** (13 tools): List, restart, adopt, upgrade devices, control ports & PoE
- 👥 **Client Management** (9 tools): Block/unblock, bandwidth limits, friendly names  
- 🌐 **WiFi Management** (6 tools): Configure SSIDs, passwords, security
- 🔧 **Network & VLAN** (4 tools): Create VLANs, configure DHCP
- 🔥 **Firewall** (2 tools): Create rules, filter traffic
- 🌍 **Port Forwarding** (4 tools): Create/enable/disable forwards
- 📈 **Monitoring** (5 tools): System health, statistics, alerts
- ⚙️ **Site Management** (2 tools): Backups, site info
- 🔌 **Switch Port Control**: Per-port and PoE management

---

## 📋 Installation

See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup guide.

### Requirements

- Node.js 18+ (20 LTS recommended)
- UniFi Network Controller (any version with API support)
- Network access to controller

---

## 💬 Example Commands

```
"List all my UniFi devices"
"Turn off PoE on port 8"
"Change guest WiFi password to Welcome2024"
"Create VLAN 20 for IoT devices"
"Block client aa:bb:cc:dd:ee:ff"
"Show system health"
```

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Architecture overview
- Full README in repository

---

## 🔒 Security

- Environment-based configuration (no hardcoded credentials)
- SSL/TLS verification support
- Docker secrets compatible
- Comprehensive security documentation

---

## 📄 License

MIT License - See LICENSE file

**Created by: CamoZeroDay**

---

**⭐ Star this repo if it helps you!**
