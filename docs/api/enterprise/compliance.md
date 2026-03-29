---
sidebar_position: 7
title: Compliance
---

# Compliance Logging

SOC2-grade audit logging with hash chain integrity, tamper detection, and export capabilities.

**Base path:** `/api/ext/cockpit-enterprise/compliance`

## Logs

### `GET /logs`

Query compliance log entries.

| Query Param | Description |
|-------------|-------------|
| `category` | Filter by category |
| `severity` | Filter by severity |
| `actor_id` | Filter by actor |
| `action` | Filter by action type |
| `outcome` | Filter by outcome (`success`, `failure`) |
| `from` | Start timestamp |
| `to` | End timestamp |
| `limit` | Max results (default 100) |
| `offset` | Pagination offset |

### `GET /logs/:id`

Get a single log entry with chain verification status.

**Response:**
```json
{
  "id": "uuid",
  "event_id": "evt_abc123",
  "category": "auth",
  "severity": "info",
  "actor_id": "user-uuid",
  "actor_type": "user",
  "action": "login",
  "resource_type": "session",
  "resource_id": "sess-uuid",
  "detail": "Successful login from 203.0.113.42",
  "outcome": "success",
  "entry_hash": "sha256:...",
  "previous_hash": "sha256:...",
  "chain_valid": true,
  "created_at": "2026-03-29T10:00:00Z"
}
```

### `POST /logs`

Create a compliance log entry.

**Request:**
```json
{
  "category": "auth",
  "severity": "info",
  "actor_id": "user-uuid",
  "actor_type": "user",
  "action": "login",
  "resource_type": "session",
  "resource_id": "sess-uuid",
  "detail": "Successful login from 203.0.113.42",
  "outcome": "success",
  "metadata": { "ip": "203.0.113.42", "user_agent": "..." }
}
```

Each entry is hashed (SHA-256) and linked to the previous entry's hash, forming a tamper-evident chain. Writes are serialized via database transactions to prevent chain forks.

## Export

### `GET /export`

Export compliance logs as JSON or CSV.

| Query Param | Description |
|-------------|-------------|
| `format` | `json` or `csv` |
| `from` | Start timestamp |
| `to` | End timestamp |

CSV export follows RFC 4180 (carriage returns escaped). Max 10,000 rows per export.

## Configuration

### `GET /config`

Get compliance configuration.

### `PUT /config`

Update compliance configuration.

**Request:**
```json
{
  "enabled": true,
  "retention_days": 365,
  "hash_algorithm": "sha256",
  "log_api_reads": false,
  "export_format": "json"
}
```

## Statistics

### `GET /stats`

Get log statistics.

**Response:**
```json
{
  "total_entries": 15420,
  "last_24h": 342,
  "oldest_entry": "2026-01-01T00:00:00Z",
  "newest_entry": "2026-03-29T10:00:00Z",
  "by_category": { "auth": 5000, "data": 8000, "config": 2420 },
  "by_severity": { "info": 14000, "warning": 1200, "error": 220 },
  "by_outcome": { "success": 15000, "failure": 420 }
}
```

## Chain Verification

### `POST /verify-chain`

Verify hash chain integrity.

**Request:**
```json
{ "from": "2026-03-01", "limit": 1000 }
```

**Response:**
```json
{
  "verified": true,
  "entries_checked": 1000,
  "broken_at_id": null,
  "reason": null
}
```

If the chain is broken:
```json
{
  "verified": false,
  "entries_checked": 542,
  "broken_at_id": "uuid",
  "reason": "Hash mismatch: expected sha256:abc, got sha256:def"
}
```

## Retention

### `DELETE /retention`

Run retention cleanup — deletes entries older than the configured retention period.

Before deleting, records an anchor hash in the `compliance_anchors` table so chain verification remains valid across cleanup boundaries.

**Response:**
```json
{ "deleted": 5000, "retention_days": 365, "chain_anchor_recorded": true }
```
