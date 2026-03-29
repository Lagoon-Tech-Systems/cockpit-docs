---
sidebar_position: 6
title: Webhooks
---

# Webhooks

Fire HTTP callbacks on system events.

## `GET /api/webhooks` <span class="badge badge--warning">admin</span>

List all configured webhooks.

## `POST /api/webhooks` <span class="badge badge--warning">admin</span>

Create a webhook.

**Request:**
```json
{
  "name": "Slack Alerts",
  "url": "https://hooks.slack.com/services/...",
  "events": ["alert.fired", "container.down"],
  "headers": { "X-Custom": "value" }
}
```

**Webhook payload format:**
```json
{
  "event": "container.down",
  "timestamp": "2026-03-29T10:00:00Z",
  "data": { "container": "nginx", "reason": "OOM killed" }
}
```

:::caution Security
URLs are validated against SSRF — private/internal addresses (127.*, 10.*, 172.16-31.*, 192.168.*) are blocked. Timeout is 10 seconds per request.
:::

## `DELETE /api/webhooks/:id` <span class="badge badge--warning">admin</span>

Delete a webhook.

**Limits:** Max 50 webhooks (CE).
