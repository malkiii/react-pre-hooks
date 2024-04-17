import pkg from '../../../packages/hooks/package.json';

export const site = {
  title: pkg.name,
  description: pkg.description,
  github: pkg.repository.url,
  author: 'Malki Abderrahmane',
  url: pkg.homepage,
  icon: '/logo.svg',
  og: '/og.png'
} as const;
