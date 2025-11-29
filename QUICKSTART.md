# 🚀 Quick Start Guide - UniFi MCP Server

**Get your UniFi Network AI-managed in 5 minutes!**

All Credit: CamoZeroDay

---

## Before You Begin

You need:
- ✅ A UniFi Network Controller (any model)
- ✅ Admin credentials
- ✅ Node.js 18+ installed
- ✅ 5 minutes

---

## Step 1: Install (30 seconds)

```bash
# Option A: Global install
npm install -g @yourscope/unifi-mcp-server

# Option B: Clone repo
git clone <repo>
cd unifi-mcp-server
npm install
```

---

## Step 2: Configure (60 seconds)

Create `.env` file in project root:

```env
UNIFI_CONTROLLER_URL=https://192.168.1.1:8443
UNIFI_USERNAME=admin
UNIFI_PASSWORD=your_password_here
UNIFI_SITE=default
UNIFI_VERIFY_SSL=false
```

**Replace with YOUR values:**
- `UNIFI_CONTROLLER_URL`: Your controller's address
- `UNIFI_USERNAME`: Your admin username
- `UNIFI_PASSWORD`: Your admin password

---

## Step 3: Build & Test (60 seconds)

```bash
# Build the project
npm run build

# Test connection
npm start
```

**You should see:**
```
[INFO] UniFi Controller initialized for 192.168.1.1:8443
[INFO] Connecting to UniFi Controller...
[INFO] Successfully connected
[INFO] UniFi MCP Server running on stdio
```

**If it works:** Press `Ctrl+C` and continue to Step 4

**If it fails:** See Troubleshooting below

---

## Step 4: Connect to Claude (90 seconds)

### For Claude Desktop:

1. Find your Claude config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add this configuration:

```json
{
  "mcpServers": {
    "unifi": {
      "command": "node",
      "args": ["/full/path/to/unifi-mcp-server/dist/index.js"],
      "env": {
        "UNIFI_CONTROLLER_URL": "https://192.168.1.1:8443",
        "UNIFI_USERNAME": "admin",
        "UNIFI_PASSWORD": "your_password",
        "UNIFI_SITE": "default",
        "UNIFI_VERIFY_SSL": "false"
      }
    }
  }
}
```

3. **Restart Claude Desktop**

---

## Step 5: Test with Claude (30 seconds)

Open Claude and try:

```
"List all my UniFi devices"
"Show me connected clients"
"What's my network health?"
```

### Expected Response:
Claude will now show you your devices, clients, and network info!

---

## 🎉 Success! What's Next?

### Try These Commands:

**Device Management:**
- "Restart the office access point"
- "Turn off PoE on switch port 8"
- "Enable port 12 on the switch"

**Client Management:**
- "Block this device: aa:bb:cc:dd:ee:ff"
- "Show me all clients on Guest network"

**WiFi Management:**
- "Change guest WiFi password to Welcome2024"
- "Disable the IoT network"

**Network Management:**
- "Create VLAN 20 for IoT with subnet 192.168.20.0/24"
- "Show me system health"

**Port Forwarding:**
- "Forward port 3389 to 192.168.1.100 for RDP"

---

## 🐛 Troubleshooting

### Cannot Connect to Controller

**Error**: `UniFi Controller connection failed`

**Fix**:
```bash
# Test controller accessibility
curl -k https://192.168.1.1:8443

# If that fails, check:
# 1. Is controller IP correct?
# 2. Is port correct (usually 8443)?
# 3. Can you reach it from this machine?
```

### Authentication Failed

**Error**: `Login failed` or `Invalid credentials`

**Fix**:
1. Try logging into controller web UI with same credentials
2. Check for typos in username/password
3. Ensure account isn't locked
4. Verify account has admin permissions

### SSL Certificate Error

**Error**: `Certificate validation failed`

**Fix**: Set in `.env`:
```env
UNIFI_VERIFY_SSL=false
```

**For Production**: Install proper SSL certificate on controller

### Module Not Found

**Error**: `Cannot find module '@modelcontextprotocol/sdk'`

**Fix**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Claude Doesn't See the Server

**Fix**:
1. Verify config file location is correct
2. Check JSON syntax (use JSONLint)
3. Ensure full absolute path in `args`
4. Restart Claude Desktop completely
5. Check Claude Desktop logs

---

## 🔒 Security Quick Tips

### ✅ DO:
- ✅ Use dedicated service account
- ✅ Keep credentials in `.env` (never commit)
- ✅ Use VPN for remote access
- ✅ Rotate passwords every 90 days
- ✅ Enable audit logging on controller

### ❌ DON'T:
- ❌ Use main admin account
- ❌ Commit `.env` to git
- ❌ Expose controller to internet directly
- ❌ Use self-signed certs in production
- ❌ Share credentials

---

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **All 46 Tools**: See [docs/CAPABILITIES.md](./docs/CAPABILITIES.md)
- **Security Guide**: See [docs/SECURITY.md](./docs/SECURITY.md)
- **Docker Deployment**: See [docs/DOCKER.md](./docs/DOCKER.md)

---

## 🆘 Still Need Help?

1. Check [README.md](./README.md) for detailed docs
2. Review [docs/SETUP.md](./docs/SETUP.md) for step-by-step
3. Open an issue on GitHub
4. Check existing issues for solutions

---

**🎉 Congratulations! You're now managing your UniFi network with AI!**

**All credit goes to: CamoZeroDay**
