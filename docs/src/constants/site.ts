import pkg from '../../../packages/hooks/package.json';

export const basePath = new URL(pkg.homepage).pathname;
export const site = {
  title: pkg.name,
  url: pkg.homepage,
  description: pkg.description,
  github: pkg.repository.url,
  author: {
    name: pkg.author.name,
    contact: 'https://x.com/MalkiAbduu'
  },
  srcDirectory: `${pkg.repository.url}/blob/master/${pkg.repository.directory}/src`,
  icon: `${basePath}/logo.svg`,
  og: `${pkg.homepage}/og.png`
} as const;
