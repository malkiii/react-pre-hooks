import pkg from '../../../packages/hooks/package.json';

export const basePath = new URL(pkg.homepage).pathname;
export const site = {
  title: pkg.name,
  url: pkg.homepage,
  description: pkg.description,
  github: pkg.repository.url,
  author: pkg.author.name,
  srcDirectory: `${pkg.repository.url}/blob/master/${pkg.repository.directory}/src`,
  icon: `${basePath}/logo.svg`,
  og: `${basePath}/og.png`
} as const;
