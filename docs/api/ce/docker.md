---
sidebar_position: 9
title: Docker Resources
---

# Docker Resources

Manage images, networks, and volumes.

## `GET /api/images`

List all Docker images with size and container usage count.

## `DELETE /api/images/:id` <span class="badge badge--warning">admin</span>

Remove a Docker image.

## `POST /api/images/prune` <span class="badge badge--warning">admin</span>

Remove all dangling (unused) images.

**Response:**
```json
{ "SpaceReclaimed": 1073741824 }
```

## `GET /api/networks`

List all Docker networks with connected containers.

## `GET /api/volumes`

List all Docker volumes.

## `DELETE /api/volumes/:name` <span class="badge badge--warning">admin</span>

Remove a Docker volume. The volume must not be in use by any container.
