import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lagoon Cockpit',
  tagline: 'Self-hosted Docker management platform — monitor, manage, and secure your containers from anywhere.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.lagoontechsystems.com',
  baseUrl: '/',

  organizationName: 'lagoon-tech-systems',
  projectName: 'lagoon-cockpit',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Lagoon Cockpit',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'api',
            position: 'left',
            label: 'API Reference',
          },
          {
            href: 'https://lagoontechsystems.com',
            label: 'Website',
            position: 'right',
          },
          {
            href: 'https://github.com/lagoon-tech-systems/lagoon-cockpit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Getting Started', to: '/getting-started/docker' },
              { label: 'API Reference', to: '/api/overview' },
              { label: 'Integrations', to: '/integrations/overview' },
            ],
          },
          {
            title: 'Product',
            items: [
              { label: 'Editions', to: '/editions' },
              { label: 'Website', href: 'https://lagoontechsystems.com' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'GitHub', href: 'https://github.com/lagoon-tech-systems/lagoon-cockpit' },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} Lagoon Tech Systems. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'nginx'],
      },
    }),
};

export default config;
