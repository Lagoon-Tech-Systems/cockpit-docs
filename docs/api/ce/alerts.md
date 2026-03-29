---
sidebar_position: 5
title: Alerts
---

# Alert Rules

Threshold-based alerts with automatic evaluation and notifications.

## `GET /api/alerts/rules`

List all alert rules.

## `POST /api/alerts/rules` <span class="badge badge--warning">admin</span>

Create an alert rule.

**Request:**
```json
{
  "name": "High CPU",
  "metric": "cpu_percent",
  "operator": ">",
  "threshold": 90,
  "durationSeconds": 300
}
```

**Valid metrics:** `cpu_percent`, `memory_percent`, `disk_percent`, `load_1`, `container_stopped`

**Valid operators:** `>`, `<`, `>=`, `<=`, `==`

:::info
Alert cooldown is 15 minutes — the same rule won't fire again within that window.
:::

## `DELETE /api/alerts/rules/:id` <span class="badge badge--warning">admin</span>

Delete an alert rule.

## `PUT /api/alerts/rules/:id/toggle` <span class="badge badge--warning">admin</span>

Enable or disable an alert rule.

**Request:**
```json
{ "enabled": false }
```

## `GET /api/alerts/events`

Get alert event history.

| Query Param | Default | Max |
|-------------|---------|-----|
| `limit` | `50` | `500` |
