---
sidebar_position: 7
title: Schedules
---

# Scheduled Actions

Cron-based container automation.

## `GET /api/schedules`

List all scheduled actions.

## `POST /api/schedules` <span class="badge badge--warning">admin</span>

Create a scheduled action.

**Request:**
```json
{
  "name": "Restart nginx nightly",
  "containerId": "abc123",
  "containerName": "nginx",
  "action": "restart",
  "cronExpression": "0 0 * * *"
}
```

**Valid actions:** `start`, `stop`, `restart`

**Cron format:** Standard 5-field (minute hour day-of-month month day-of-week)

| Example | Schedule |
|---------|----------|
| `0 0 * * *` | Daily at midnight |
| `*/15 * * * *` | Every 15 minutes |
| `0 9 * * 1-5` | Weekdays at 9 AM |
| `0 0 1 * *` | First day of month |

## `DELETE /api/schedules/:id` <span class="badge badge--warning">admin</span>

Delete a scheduled action.

## `PUT /api/schedules/:id/toggle` <span class="badge badge--warning">admin</span>

Enable or disable a schedule.

**Request:**
```json
{ "enabled": false }
```

## `GET /api/schedules/history`

Get execution history.

| Query Param | Default | Max |
|-------------|---------|-----|
| `limit` | `50` | `500` |

**Limits:** Max 50 schedules (CE).
