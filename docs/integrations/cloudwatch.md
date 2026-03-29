---
sidebar_position: 6
title: CloudWatch
---

# AWS CloudWatch

Pull CloudWatch alarms and EC2 metrics using IAM credentials. No AWS SDK required — uses direct API calls with Signature V4 signing.

**Edition:** Pro

## Configuration

```json
{
  "adapter": "cloudwatch",
  "name": "AWS Production",
  "config": {
    "access_key_id": "AKIA...",
    "secret_access_key": "...",
    "region": "us-east-1"
  },
  "poll_interval": 60
}
```

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `access_key_id` | Yes | — | IAM access key ID |
| `secret_access_key` | Yes | — | IAM secret access key |
| `region` | No | `us-east-1` | AWS region |
| `endpoint_url` | No | — | Custom endpoint (for proxies) |

## IAM Permissions Required

The IAM user needs these CloudWatch permissions:

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudwatch:DescribeAlarms",
    "cloudwatch:GetMetricStatistics",
    "cloudwatch:ListMetrics"
  ],
  "Resource": "*"
}
```

## What It Pulls

### Alarms
All CloudWatch alarms with their current state (`OK`, `ALARM`, `INSUFFICIENT_DATA`).

### Metrics
EC2 instance metrics (5-minute averages):
- `CPUUtilization` (percent)
- `NetworkIn` (bytes)
- `NetworkOut` (bytes)
- `DiskReadOps` (count)
