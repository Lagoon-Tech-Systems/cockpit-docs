---
sidebar_position: 6
title: SLA Tracking
---

# SLA Tracking

Define Service Level Agreements, track compliance, and monitor error budgets.

**Base path:** `/api/ext/cockpit-pro/sla`

## Definitions

### `GET /definitions`

List all SLA definitions.

### `POST /definitions`

Create an SLA definition.

**Request:**
```json
{
  "name": "API Availability SLA",
  "description": "99.9% uptime target for production API",
  "target_uptime": 99.9,
  "period_type": "monthly",
  "monitor_ids": ["uuid1", "uuid2"]
}
```

| Field | Description |
|-------|-------------|
| `target_uptime` | Target uptime percentage (e.g., 99.9) |
| `period_type` | `monthly` or `weekly` |
| `monitor_ids` | Uptime monitors linked to this SLA |

### `GET /definitions/:id`

Get SLA with current period status.

### `PUT /definitions/:id`

Update SLA definition.

### `DELETE /definitions/:id`

Delete SLA and all associated periods and breaches.

## Periods

### `GET /definitions/:id/periods`

List SLA periods (historical and current).

### `GET /definitions/:id/current`

Get or create the current period.

**Response:**
```json
{
  "period": {
    "id": "uuid",
    "start_date": "2026-03-01",
    "end_date": "2026-03-31",
    "actual_uptime": 99.87,
    "target_uptime": 99.9,
    "total_downtime_seconds": 1123,
    "is_breached": false
  },
  "burn_rate": 0.87
}
```

### `POST /definitions/:id/recalculate`

Recalculate the current period's uptime from monitor data.

## Error Budget

### `GET /definitions/:id/budget`

Get the current error budget status.

**Response:**
```json
{
  "total_budget_minutes": 43.2,
  "used_minutes": 18.7,
  "remaining_minutes": 24.5,
  "remaining_percentage": 56.7,
  "is_breached": false,
  "burn_rate": 0.87
}
```

The error budget is calculated from `target_uptime` and the period duration. For a 99.9% SLA on a 30-day month, the total budget is ~43.2 minutes of allowed downtime.

## Breaches

### `GET /breaches`

List all SLA breaches. Filter by `sla_id`.

### `GET /definitions/:id/breaches`

Breaches for a specific SLA.

## Reports

### `GET /definitions/:id/report`

Full SLA report with periods, breaches, and burn rate chart data.

**Response:**
```json
{
  "definition": { ... },
  "current_status": { ... },
  "periods": [...],
  "breaches": [...],
  "burn_rate_chart": [{ "date": "2026-03-01", "burn_rate": 0.0 }, ...]
}
```
