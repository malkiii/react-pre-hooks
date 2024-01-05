import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import { author, description, homepage, repository } from '../../package.json';

const site = {
  title: 'react-pre-hooks',
  description,
  url: new URL(homepage),
  logo: '/logo.svg',
  og: new URL(homepage).href + '/og.png'
};

function getHooksSectionItems() {
  return fs
    .readdirSync(path.join(__dirname, '../../package/src'), { withFileTypes: true })
    .filter(file => file.isDirectory() && file.name.startsWith('use'))
    .map(({ name }) => ({ text: name, link: `/guide/${name}` }));
}

export default defineConfig({
  title: site.title,
  description: site.description,
  base: site.url.pathname,
  head: [
    ['link', { rel: 'icon', href: site.url.pathname + site.logo, type: 'image/svg+xml' }],
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
    socialLinks: [{ icon: 'github', link: repository.url }],
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
      pattern: `${repository.url}/edit/master/docs/:path`
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright &copy; 2023-PRESENT ${author.name}`
    }
  }
});
