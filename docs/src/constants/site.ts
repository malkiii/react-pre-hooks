import pkg from '../../../packages/hooks/package.json';

export const basePath = new URL(pkg.homepage).pathname;
export const site = {
  title: pkg.name,
  url: pkg.homepage,
  description: pkg.description,
  github: pkg.repository.url,
  author: 'Malki Abderrahmane',
  directory: `${pkg.repository.url}/${pkg.repository.directory}`,
  icon: `${basePath}/logo.svg`,
  og: `${basePath}/og.png`
} as const;
