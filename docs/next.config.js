const { name, homepage } = require('../packages/hooks/package.json');

/** @type {import('nextra').NextraConfig} */
const nextraConfig = {
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx'
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: [name],
  basePath: new URL(homepage).pathname,
  images: { unoptimized: true }
};

module.exports = require('nextra')(nextraConfig)(nextConfig);
