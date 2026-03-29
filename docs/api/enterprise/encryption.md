---
sidebar_position: 6
title: Encryption
---

# Encryption at Rest

Manage SQLCipher encryption configuration, key rotation, and audit trails.

**Base path:** `/api/ext/cockpit-enterprise/encryption`

:::info
This module is a management/configuration layer. It does **not** perform encryption itself — it manages the state and key rotation records for SQLCipher, which must be configured at the database driver level.
:::

## `GET /status`

Get current encryption status.

**Response:**
```json
{
  "enabled": true,
  "sqlcipher_available": true,
  "algorithm": "aes-256-cbc",
  "kdf_iterations": 256000,
  "last_rotation": "2026-03-15T10:00:00Z",
  "pending_rotations": 0
}
```

## `GET /config`

Get encryption configuration.

## `PUT /config`

Update encryption configuration.

**Request:**
```json
{
  "enabled": true,
  "algorithm": "aes-256-cbc",
  "kdf_iterations": 256000,
  "page_size": 4096
}
```

## `POST /rotate-key`

Initiate a key rotation.

**Request:**
```json
{ "notes": "Quarterly rotation per security policy" }
```

**Response (202 Accepted):**
```json
{
  "id": "uuid",
  "status": "pending",
  "message": "Key rotation initiated"
}
```

## `GET /rotations`

Get key rotation history. Paginated.

## `GET /audit`

Get encryption audit log entries. Filter by `event_type`.

## `DELETE /audit/retention`

Clean up old audit entries.

| Query Param | Description |
|-------------|-------------|
| `days` | Keep entries newer than this many days |

**Response:**
```json
{ "deleted": 150, "retention_days": 90 }
```
