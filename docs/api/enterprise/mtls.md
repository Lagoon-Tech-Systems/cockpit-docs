---
sidebar_position: 5
title: mTLS
---

# Mutual TLS (mTLS)

Certificate-based authentication for agents and automated systems. Designed to work with a reverse proxy (Nginx/Traefik) that terminates TLS and forwards client certificate information.

**Base path:** `/api/ext/cockpit-enterprise/mtls`

## CA Certificates

### `GET /ca`

List trusted Certificate Authority certificates. Paginated.

### `POST /ca`

Upload a CA certificate.

**Request:**
```json
{
  "name": "Internal CA",
  "certificate": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
}
```

PEM certificate max size: 50KB. Fingerprint is computed from DER-encoded bytes (SHA-256).

### `DELETE /ca/:id`

Remove a CA certificate.

## Agents

### `GET /agents`

List enrolled agents. Filter by `enabled` status. Paginated.

### `GET /agents/:id`

Get agent details.

### `POST /agents`

Enroll an agent with its client certificate.

**Request:**
```json
{
  "hostname": "worker-01.internal",
  "description": "Production worker node",
  "certificate": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  "ca_id": "uuid",
  "tags": ["production", "worker"]
}
```

### `PUT /agents/:id`

Update agent metadata (hostname, description, tags).

### `DELETE /agents/:id`

Revoke an agent.

### `PUT /agents/:id/toggle`

Enable or disable an agent.

## Configuration

### `GET /config`

Get mTLS configuration.

### `PUT /config`

Update mTLS configuration.

**Request:**
```json
{
  "enforcement_enabled": true,
  "reject_unknown_certs": true,
  "auto_enroll": false
}
```

## Verification

### `POST /verify`

Verify a client certificate fingerprint. Called by the reverse proxy after TLS handshake.

**Headers:**
```
X-Verify-Secret: your-mtls-verify-secret
```

**Request:**
```json
{
  "fingerprint": "sha256:abc123...",
  "ip": "10.0.0.5"
}
```

**Response:**
```json
{
  "verified": true,
  "agent_id": "uuid",
  "hostname": "worker-01.internal"
}
```

:::caution
The verify endpoint requires the `MTLS_VERIFY_SECRET` env var to be set. Requests without a matching `X-Verify-Secret` header are rejected.
:::

### Nginx Integration Example

```nginx
location /api/ {
    # Verify client cert against mTLS endpoint
    auth_request /mtls-verify;

    proxy_pass http://cockpit:3000;
}

location = /mtls-verify {
    internal;
    proxy_pass http://cockpit:3000/api/ext/cockpit-enterprise/mtls/verify;
    proxy_set_header X-Verify-Secret your-mtls-verify-secret;
    proxy_set_header X-Client-Cert-Fingerprint $ssl_client_fingerprint;
    proxy_set_header X-Real-IP $remote_addr;
}
```
