import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import banner from 'vite-plugin-banner';
import { name, version, author } from './package.json';

const bannerText = `${name} v${version} Copyright 2023 ${author.name}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [banner(bannerText), react(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      name,
      entry: [path.resolve(__dirname, 'packages/hooks')],
      formats: ['es', 'umd'],
      fileName: format => `${name}.${format}.js`
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['html']
    },
    globals: true
  }
});
