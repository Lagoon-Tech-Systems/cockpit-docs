---
sidebar_position: 2
title: Mobile App
---

# Mobile App Setup

Lagoon Cockpit's mobile app gives you full server management from your phone — real-time metrics, container controls, logs, and push notifications.

## Requirements

- iOS 15+ or Android 10+
- A running Cockpit API instance (see [Docker Self-Hosting](/getting-started/docker))

## Install

The app is available on both platforms:

- **iOS**: Search "Lagoon Cockpit" on the App Store
- **Android**: Search "Lagoon Cockpit" on Google Play

## Connect to Your Server

1. Open the app
2. Tap **Add Server**
3. Enter your server details:
   - **Name**: A friendly name (e.g., "Production VPS")
   - **URL**: Your Cockpit API URL (e.g., `https://cockpit.example.com`)
   - **API Key**: The `API_KEY` from your `.env`
4. Tap **Connect**

The app authenticates and stores the JWT token securely in the device keychain.

## Multi-Server

You can connect up to **3 servers** on the Community Edition (unlimited on Pro/Enterprise). Switch between servers from the server selector in the app header.

## Features

### Dashboard
Real-time gauges for CPU, RAM, and disk usage. Auto-refreshes via Server-Sent Events (SSE). Problem containers are highlighted automatically.

### Container Management
- View all containers with status indicators
- Start, stop, restart individual containers
- Bulk operations (start all, stop all)
- View container logs with search
- Execute commands inside containers

### Compose Stacks
Manage Docker Compose stacks as groups. View stack health, start/stop entire stacks.

### System Map
Visual node-graph showing your infrastructure topology — containers, networks, and connections.

### Alerts
Configure threshold-based alert rules (e.g., "CPU > 90% for 5 minutes"). Receive push notifications when alerts fire.

### Biometric Lock
Enable Face ID or fingerprint authentication to protect the app. Configure auto-lock timeout in Settings.

## Push Notifications (Pro)

Push notifications require the Pro edition and an Expo push token:

1. Set `EXPO_ACCESS_TOKEN` in your server's `.env`
2. In the app, go to **Settings > Notifications**
3. Enable push notifications
4. The app registers its push token with the server automatically

You'll receive notifications for:
- Alert rule triggers
- Container state changes (crash, restart)
- Incident updates (Pro)

## Troubleshooting

### "Connection refused" or timeout
- Verify the API is reachable from your phone's network
- If using a reverse proxy, ensure WebSocket/SSE is not being buffered
- Check `CORS_ORIGINS` includes your app's origin

### SSE not updating in real-time
- Some reverse proxies buffer SSE streams. Add `proxy_buffering off` in Nginx
- Check that the `/api/stream` endpoint is accessible

### Push notifications not arriving
- Verify `EXPO_ACCESS_TOKEN` is set and valid
- Check the server logs for push delivery errors
- Ensure notifications are enabled in your device's OS settings
