---
sidebar_position: 5
title: ChatOps
---

# ChatOps

Send alerts and events to Telegram and Slack channels.

**Base path:** `/api/ext/cockpit-pro/chatops`

## Channels

### `GET /channels`

List all channels (config fields redacted for security).

### `POST /channels`

Create a chat channel.

**Telegram:**
```json
{
  "platform": "telegram",
  "name": "Ops Alerts",
  "config": { "bot_token": "123:ABC...", "chat_id": "-100123456" },
  "events": ["alert.fired", "container.down", "incident.created"],
  "enabled": true
}
```

**Slack:**
```json
{
  "platform": "slack",
  "name": "Incident Channel",
  "config": { "webhook_url": "https://hooks.slack.com/services/..." },
  "events": ["incident.created", "incident.resolved"]
}
```

### `GET /channels/:id`

Get channel details with recent messages.

### `PUT /channels/:id`

Update channel configuration.

### `DELETE /channels/:id`

Delete channel and its message history.

### `POST /channels/:id/test`

Send a test message to verify the channel is working.

## Messages

### `GET /channels/:id/messages`

Get message delivery log for a channel with pagination.

## Dispatch

### `POST /dispatch`

Manually send an event to all matching channels.

**Request:**
```json
{
  "event_type": "alert.fired",
  "payload": { "rule": "High CPU", "value": 95.2 }
}
```

**Response:**
```json
{ "ok": true, "dispatched": 2 }
```

Events are dispatched to all enabled channels that have the matching event type in their `events` array.
