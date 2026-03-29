---
sidebar_position: 2
title: Containers
---

# Containers

## `GET /api/containers`

List all Docker containers.

**Response:**
```json
{ "containers": [{ "id": "abc123", "name": "nginx", "state": "running", "image": "nginx:latest", ... }] }
```

## `GET /api/containers/:id`

Get container details and live stats (CPU, memory, network I/O).

## `GET /api/containers/:id/logs`

Get container logs.

| Query Param | Default | Description |
|-------------|---------|-------------|
| `tail` | `100` | Number of lines (1-1000) |
| `since` | — | Timestamp filter |
| `stdout` | `true` | Include stdout |
| `stderr` | `true` | Include stderr |

**Response:**
```json
{ "lines": ["2026-03-29T10:00:00Z INFO Starting...", "..."] }
```

## `GET /api/containers/:id/logs/search`

Search container logs with regex.

| Query Param | Default | Description |
|-------------|---------|-------------|
| `q` | *(required)* | Search pattern (max 200 chars) |
| `regex` | `false` | Enable regex matching |
| `context` | `2` | Lines of context (max 5) |

:::caution
Regex patterns are validated against ReDoS patterns before execution.
:::

## `POST /api/containers/:id/start` <span class="badge badge--info">operator+</span>

Start a stopped container.

## `POST /api/containers/:id/stop` <span class="badge badge--info">operator+</span>

Stop a running container.

| Query Param | Default | Description |
|-------------|---------|-------------|
| `t` | `10` | Timeout in seconds before force kill |

:::warning
You cannot stop the Cockpit API container itself (self-action protection).
:::

## `POST /api/containers/:id/restart` <span class="badge badge--info">operator+</span>

Restart a container.

## `POST /api/containers/:id/exec` <span class="badge badge--warning">admin</span>

Execute a command inside a running container.

**Request:**
```json
{ "command": "ls -la /app" }
```

**Response:**
```json
{ "stdout": "total 48\ndrwxr-xr-x...", "stderr": "", "exitCode": 0 }
```

Commands are validated against an allowlist. Max 500 characters.

## `GET /api/containers/:id/top`

Get running processes inside a container.

## `POST /api/containers/bulk` <span class="badge badge--info">operator+</span>

Bulk start/stop/restart up to 20 containers at once.

**Request:**
```json
{ "ids": ["container1", "container2"], "action": "restart" }
```

## `POST /api/containers/:id/rebuild` <span class="badge badge--warning">admin</span>

Remove the container and pull the latest version of its image.
