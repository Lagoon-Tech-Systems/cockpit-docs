---
sidebar_position: 1
title: SSO / SAML
---

# SSO / SAML

SAML 2.0 Single Sign-On with identity provider management, session tracking, and auto-provisioning.

**Base path:** `/api/ext/cockpit-enterprise/sso`

## Providers

### `GET /providers`

List configured identity providers.

### `GET /providers/:id`

Get IdP details.

### `POST /providers`

Add a SAML identity provider.

**Request:**
```json
{
  "name": "Okta Production",
  "entity_id": "http://www.okta.com/exk123",
  "sso_url": "https://acme.okta.com/app/sso/saml",
  "slo_url": "https://acme.okta.com/app/sso/logout",
  "certificate": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
  "binding": "HTTP-POST",
  "name_id_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "attribute_mapping": { "email": "user.email", "name": "user.displayName" },
  "auto_provision": true,
  "default_role": "viewer"
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `binding` | `HTTP-POST` | SAML binding type |
| `auto_provision` | `false` | Auto-create users from SAML assertions |
| `default_role` | `viewer` | Role for auto-provisioned users |
| `certificate` | *(required)* | IdP signing certificate (PEM, max 50KB) |

### `PUT /providers/:id`

Update IdP configuration.

### `DELETE /providers/:id`

Remove an identity provider.

### `PUT /providers/:id/toggle`

Enable or disable an IdP.

## SAML Endpoints

### `GET /metadata`

Get the Service Provider (SP) metadata as XML. Use this to configure your IdP.

Returns SAML SP metadata with ACS URL, entity ID, and name ID format. Uses `COCKPIT_BASE_URL` env var for URL generation (falls back to Host header).

### `POST /acs`

Assertion Consumer Service — receives SAML assertions from the IdP.

This endpoint:
1. Validates the SAML response signature using the provider's certificate
2. Strips XML comments to prevent injection
3. Validates conditions (NotBefore, NotOnOrAfter with 5-min clock skew, Audience restriction)
4. Extracts user attributes via the provider's attribute mapping
5. Creates an SSO session
6. Auto-provisions the user if enabled

:::info Rate Limited
The ACS endpoint is rate-limited to 10 requests per minute per IP to prevent brute-force attacks.
:::

## Sessions

### `GET /sessions`

List active SSO sessions.

### `DELETE /sessions/:id`

Revoke a specific SSO session.

### `DELETE /sessions/expired`

Purge all expired sessions.
