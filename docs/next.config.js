const { name, homepage } = require('../packages/hooks/package.json');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: [name],
  basePath: new URL(homepage).pathname
};

module.exports = withNextra(nextConfig);
