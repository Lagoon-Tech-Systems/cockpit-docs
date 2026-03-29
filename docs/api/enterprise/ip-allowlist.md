---
sidebar_position: 4
title: IP Allowlist
---

# IP Allowlist

Restrict API access to specific IP addresses or CIDR ranges.

**Base path:** `/api/ext/cockpit-enterprise/ip-allowlist`

## Rules

### `GET /rules`

List allowlist rules. Filter by `scope`.

### `GET /rules/:id`

Get rule details.

### `POST /rules`

Add an IP or CIDR rule.

**Request:**
```json
{
  "cidr": "203.0.113.0/24",
  "label": "Office network",
  "scope": "global",
  "scope_id": null,
  "expires_at": "2026-12-31T23:59:59Z"
}
```

| Field | Description |
|-------|-------------|
| `cidr` | IPv4 address or CIDR range |
| `label` | Human-readable description |
| `scope` | `global` or scoped to a resource |
| `expires_at` | Optional expiration timestamp |

### `PUT /rules/:id`

Update a rule.

### `DELETE /rules/:id`

Delete a rule.

### `PUT /rules/:id/toggle`

Enable or disable a rule.

## Check

### `GET /check`

Check if the requesting IP is allowed.

**Response:**
```json
{
  "ip": "203.0.113.42",
  "allowed": true,
  "reason": "Matched rule: Office network (203.0.113.0/24)",
  "rules_evaluated": 5
}
```

## Configuration

### `GET /config`

Get enforcement configuration.

**Response:**
```json
{
  "config": {
    "enforcement_enabled": false,
    "deny_action": "block",
    "log_denials": true
  }
}
```

### `PUT /config`

Update enforcement configuration.

**Request:**
```json
{
  "enforcement_enabled": true,
  "deny_action": "block",
  "log_denials": true
}
```

:::warning
Enforcement is **off by default**. Enable it only after adding your own IP to the allowlist, or you will lock yourself out.
:::

:::info Limitations
- IPv4 only (IPv4-mapped IPv6 addresses like `::ffff:1.2.3.4` are normalized automatically)
- Full IPv6 CIDR support is planned for a future release
:::
