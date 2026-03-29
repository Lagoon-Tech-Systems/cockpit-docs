---
sidebar_position: 3
title: Stacks
---

# Compose Stacks

Manage Docker Compose stacks as groups.

## `GET /api/stacks`

List all detected Compose stacks with their service health.

**Response:**
```json
{
  "stacks": [{
    "name": "monitoring",
    "services": 3,
    "running": 3,
    "stopped": 0
  }]
}
```

## `GET /api/stacks/:name`

Get stack details with all services.

## `POST /api/stacks/:name/start` <span class="badge badge--warning">admin</span>

Start all services in the stack.

## `POST /api/stacks/:name/stop` <span class="badge badge--warning">admin</span>

Stop all services in the stack.

## `POST /api/stacks/:name/restart` <span class="badge badge--warning">admin</span>

Restart all services in the stack.
