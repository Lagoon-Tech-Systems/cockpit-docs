---
sidebar_position: 1
title: Authentication
---

# Authentication

## `POST /auth/token`

Authenticate with an API key (single-admin mode).

**Request:**
```json
{ "apiKey": "your-secret-key" }
```

**Response:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "role": "admin",
  "serverName": "Production VPS"
}
```

## `POST /auth/login`

Authenticate with email/password (multi-user mode).

**Request:**
```json
{ "email": "admin@example.com", "password": "your-password" }
```

**Response:** Same as `/auth/token`.

## `POST /auth/refresh`

Refresh an expired access token.

**Request:**
```json
{ "refreshToken": "eyJ..." }
```

**Response:**
```json
{ "accessToken": "eyJ...", "refreshToken": "eyJ..." }
```

:::info
Refresh tokens include a fingerprint (hash of User-Agent + IP). If the fingerprint changes, the refresh is rejected.
:::

## `GET /auth/users` <span class="badge badge--warning">admin</span>

List all users. Only available when `AUTH_MODE=users`.

**Response:**
```json
{ "users": [{ "id": 1, "email": "admin@example.com", "role": "admin", "created_at": "..." }] }
```

## `POST /auth/users` <span class="badge badge--warning">admin</span>

Create a new user.

**Request:**
```json
{ "email": "user@example.com", "password": "strong-password", "role": "operator" }
```

## `DELETE /auth/users/:id` <span class="badge badge--warning">admin</span>

Delete a user account. Cannot delete yourself.

## `PUT /auth/users/:id/role` <span class="badge badge--warning">admin</span>

Update a user's role.

**Request:**
```json
{ "role": "viewer" }
```

**Valid roles:** `admin`, `operator`, `viewer`
