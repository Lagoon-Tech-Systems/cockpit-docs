---
sidebar_position: 3
title: Custom Roles
---

# Custom Roles (RBAC)

Granular role-based access control with resource-level permissions.

**Base path:** `/api/ext/cockpit-enterprise/roles`

## Roles

### `GET /`

List all custom roles with permission counts. Paginated.

### `GET /:id`

Get a role with its full permission set and user count.

### `POST /`

Create a custom role.

**Request:**
```json
{
  "name": "DevOps Lead",
  "description": "Full container access, read-only for settings",
  "priority": 10,
  "permissions": [
    { "resource": "containers", "actions": ["read", "start", "stop", "restart", "logs"] },
    { "resource": "stacks", "actions": ["read", "start", "stop"] },
    { "resource": "settings", "actions": ["read"] }
  ]
}
```

### `PUT /:id`

Update role name, description, priority, or permissions.

### `DELETE /:id`

Delete a role and all its user assignments.

## User Assignments

### `GET /:id/users`

List users assigned to a role. Paginated.

### `POST /:id/users`

Assign a user to a role.

**Request:**
```json
{ "user_id": "uuid" }
```

### `DELETE /:id/users/:userId`

Remove a user from a role.

## Permission Check

### `GET /users/:userId/check`

Check a user's effective permissions across all their roles.

| Query Param | Description |
|-------------|-------------|
| `resource` | Filter to a specific resource |
| `action` | Check a specific action |

**Response:**
```json
{
  "user_id": "uuid",
  "roles": ["DevOps Lead", "On-Call"],
  "permissions": {
    "containers": ["read", "start", "stop", "restart", "logs"],
    "stacks": ["read", "start", "stop"]
  },
  "has_permission": true
}
```

When `resource` and `action` are provided, `has_permission` indicates whether the user can perform that action.
