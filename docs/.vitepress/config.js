import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import pkg from '../../packages/hooks/package.json';

const site = {
  title: pkg.name,
  description: pkg.description,
  author: pkg.author,
  repository: pkg.repository.url,
  url: new URL(pkg.homepage),
  logo: '/logo.svg',
  og: new URL(pkg.homepage).href + '/og.png'
};

const hooksDir = path.join(__dirname, '../../packages/hooks/src');

function getHooksSectionItems() {
  return fs
    .readdirSync(hooksDir, { withFileTypes: true })
    .filter(file => file.isDirectory() && file.name.startsWith('use'))
    .map(({ name }) => ({ text: name, link: `/guide/${name}` }));
}

export default defineConfig({
  title: site.title,
  description: site.description,
  base: site.url.pathname,
  head: [
    ['link', { rel: 'icon', href: site.url.pathname + site.logo, type: 'image/svg+xml' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-G7X3ML41SG' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-G7X3ML41SG');`
    ],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: site.title }],
    ['meta', { property: 'og:description', content: site.description }],
    ['meta', { property: 'og:image', content: site.og }],
    ['meta', { name: 'twitter:title', content: site.title }],
    ['meta', { name: 'twitter:description', content: site.description }],
    ['meta', { name: 'twitter:image', content: site.og }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  themeConfig: {
    logo: { src: site.logo, width: 24, height: 24 },
    search: { provider: 'local' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    socialLinks: [{ icon: 'github', link: site.repository }],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Why Should You Use It?', link: '/guide/why' },
            { text: 'Getting Started', link: '/guide/' }
          ]
        },
        {
          text: 'Hooks',
          items: getHooksSectionItems()
        }
      ]
    },
    lastUpdated: true,
    editLink: {
      text: 'Edit this page',
      pattern: `${site.repository}/edit/master/docs/:path`
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright &copy; 2023-PRESENT ${site.author.name}`
    }
  }
});
