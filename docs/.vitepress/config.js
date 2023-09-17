import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vitepress';
import { author, description, repository } from '../../package.json';

const site = {
  title: 'Realtime hooks',
  description,
  author: author.name,
  logo: '/realtime-hooks-logo.svg',
  og: ''
};

function getAllHooks() {
  const guideDirectory = path.join(__dirname, '../guide');
  const srcDirectory = path.join(__dirname, '../../package/src');

  const hooks = fs
    .readdirSync(srcDirectory, { withFileTypes: true })
    .filter(dir => dir.isDirectory() && dir.name.startsWith('use'))
    .map(dir => dir.name);

  hooks.forEach(hook => {
    const hookDoc = path.join(guideDirectory, `${hook}.md`);
    if (!fs.existsSync(hookDoc)) fs.writeFileSync(hookDoc, `# ${hook}`);
  });

  return hooks;
}

export default defineConfig({
  title: site.title,
  description: site.description,
  head: [
    ['link', { rel: 'icon', href: site.logo, type: 'image/svg+xml' }],
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
          items: getAllHooks().map(hook => ({ text: hook, link: `/guide/${hook}` }))
        }
      ]
    },
    editLink: {
      text: 'Edit this page',
      pattern: `${repository.url}/edit/master/docs/:path`
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright &copy; 2023-PRESENT ${site.author}`
    }
  }
});
