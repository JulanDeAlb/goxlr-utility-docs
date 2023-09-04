// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// @ts-ignore
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GoXLR Utility',
  tagline: 'Official Documentation Portal',
  favicon: 'img/goxlr-utiltiy.ico',

  // Set the production url of your site here
  url: 'https://goxlr-on-linux.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/goxlr-utility-docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'goxlr-on-linux', // Usually your GitHub org/user name.
  projectName: 'goxlr-utility', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://goxlr-on-linux.github.io/goxlr-utility-docs',
        },
        //blog: {
        //  showReadingTime: true,
        //  // Please change this to your repo.
        //  // Remove this to remove the "edit this page" links.
        //  editUrl:
        //    'https://goxlr-on-linux.github.io/goxlr-utility-docs',
        //},
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
    require.resolve("@cmfcmf/docusaurus-search-local"),
    // @ts-ignore
    svgFix,
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'GoXLR Utility',
        logo: {
          alt: 'GoXLR Utility Logo',
          src: 'img/goxlr-utility.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/GoXLR-on-Linux/goxlr-utility',
            position: 'right',
            className: 'navbar-social-link navbar-github-logo',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'FAQ',
                to: '/docs/faq',
              },
              {
                label: 'Installation',
                to: '/docs/installation/getting-started',
              },
              {
                label: 'API development',
                to: '/docs/development/api/getting-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/BRBjkkbvmZ',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/GoXLR-on-Linux/goxlr-utility',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} goxlr-on-linux.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

//Since SVGO cleans every id of a svg, we need to ensure it always adds a prefix.
//Otherwise, the ids are colliding leading to unintended result's.
function svgFix() {
  return {
    name: 'svg-fix',
    configureWebpack(config) {
      const svgRule = config.module.rules.find(rule => rule.test?.source === '\\.svg$');
      if (svgRule) {
        const {
          oneOf: [
            {
              use: [
                {
                  options: {
                    svgoConfig
                  }
                }
              ]
            }
          ]
        } = svgRule;
        svgoConfig.plugins.push('prefixIds');
      }
    }
  }
}

module.exports = config;
