---
sidebar_position: 2
title: Remediation
---

# Automated Remediation

Define rules that automatically execute actions when conditions are met.

**Base path:** `/api/ext/cockpit-pro/remediation`

## `GET /rules`

List all remediation rules.

## `POST /rules`

Create a remediation rule.

**Request:**
```json
{
  "name": "Restart on high memory",
  "condition_metric": "memory_percent",
  "condition_operator": ">",
  "condition_threshold": 95,
  "condition_duration": 300,
  "action_type": "restart",
  "action_target": "my-container",
  "action_config": {},
  "cooldown_seconds": 900
}
```

| Field | Description |
|-------|-------------|
| `condition_metric` | Metric to watch (`cpu_percent`, `memory_percent`, `disk_percent`, etc.) |
| `condition_operator` | Comparison (`>`, `<`, `>=`, `<=`, `==`) |
| `condition_threshold` | Numeric threshold |
| `condition_duration` | Seconds the condition must persist before triggering |
| `action_type` | Action to execute (`restart`, `start`, `stop`) |
| `action_target` | Container name or ID |
| `cooldown_seconds` | Minimum seconds between executions (default 900) |

## `PUT /rules/:id`

Update a remediation rule.

## `DELETE /rules/:id`

Delete a remediation rule.

## `PUT /rules/:id/toggle`

Enable or disable a rule.

**Request:**
```json
{ "enabled": false }
```

## `GET /history`

Get remediation execution history.

| Query Param | Default |
|-------------|---------|
| `limit` | `50` |

**Limits:** 10 rules on Pro, unlimited on Enterprise.
