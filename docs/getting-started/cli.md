---
sidebar_position: 3
title: CLI Tool
---

# CLI Tool

A zero-dependency command-line interface for managing Cockpit servers from your terminal.

## Install

```bash
# Run directly with npx (no install needed)
npx lagoon-cockpit-cli overview

# Or install globally
npm install -g lagoon-cockpit-cli
```

## Connect to a Server

```bash
cockpit connect https://cockpit.example.com your-api-key "Production VPS"
```

This authenticates and stores the connection config locally.

### Manage Multiple Servers

```bash
# List configured servers
cockpit servers

# Switch active server
cockpit use "Staging"
```

## Commands

### System Overview

```bash
# Full dashboard — CPU, RAM, Disk, Load, Container/Stack summary
cockpit overview
```

### Container Management

```bash
# List all containers
cockpit ps

# Filter by state
cockpit ps running
cockpit ps stopped

# Start, stop, restart
cockpit start my-container
cockpit stop my-container
cockpit restart my-container

# View logs (default: last 100 lines)
cockpit logs my-container
cockpit logs my-container --tail 500

# Search logs with regex
cockpit logs my-container --search "error|warning"

# Execute a command
cockpit exec my-container "ls -la /app"
```

### Compose Stacks

```bash
# List all stacks with health status
cockpit stacks
```

### Docker Resources

```bash
# List images with size and container count
cockpit images

# Show networks and connected containers
cockpit networks

# Disk usage breakdown
cockpit disk

# System prune (reclaim space)
cockpit prune
```

### Monitoring

```bash
# SSL certificate status
cockpit ssl

# HTTP endpoint probes
cockpit endpoints

# Toggle maintenance mode
cockpit maintenance on
cockpit maintenance off
```

### Audit & Activity

```bash
# View recent activity log (last 20 entries)
cockpit audit
```

### Help

```bash
cockpit help
```

## Configuration

The CLI stores its configuration at `~/.cockpit-cli.json`:

```json
{
  "servers": [
    {
      "name": "Production VPS",
      "url": "https://cockpit.example.com",
      "token": "eyJ...",
      "refreshToken": "eyJ...",
      "role": "admin"
    }
  ],
  "active": "Production VPS"
}
```

Tokens are automatically refreshed when expired.

## License

The CLI tool is licensed under MIT — free to use in any context.
