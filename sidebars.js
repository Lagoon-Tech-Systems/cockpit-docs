/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/docker',
        'getting-started/mobile-app',
        'getting-started/cli',
        'getting-started/windows-agent',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/overview',
        'integrations/prometheus',
        'integrations/grafana',
        'integrations/datadog',
        'integrations/cloudwatch',
        'integrations/pagerduty',
        'integrations/http-json',
        'integrations/custom-adapters',
      ],
    },
    {
      type: 'category',
      label: 'Extensions',
      items: [
        'extensions/overview',
        'extensions/building-extensions',
      ],
    },
    'editions',
    'environment-variables',
  ],
  api: [
    'api/overview',
    {
      type: 'category',
      label: 'Community Edition',
      items: [
        'api/ce/auth',
        'api/ce/containers',
        'api/ce/stacks',
        'api/ce/system',
        'api/ce/alerts',
        'api/ce/webhooks',
        'api/ce/schedules',
        'api/ce/integrations',
        'api/ce/docker',
      ],
    },
    {
      type: 'category',
      label: 'Pro',
      items: [
        'api/pro/incidents',
        'api/pro/remediation',
        'api/pro/status-pages',
        'api/pro/uptime',
        'api/pro/chatops',
        'api/pro/sla',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise',
      items: [
        'api/enterprise/sso',
        'api/enterprise/white-label',
        'api/enterprise/custom-roles',
        'api/enterprise/ip-allowlist',
        'api/enterprise/mtls',
        'api/enterprise/encryption',
        'api/enterprise/compliance',
      ],
    },
  ],
};

export default sidebars;
