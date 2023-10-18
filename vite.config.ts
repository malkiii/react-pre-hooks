import path from 'path';
import react from '@vitejs/plugin-react';
import banner from 'vite-plugin-banner';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { author, name, version } from './package.json';

const bannerText = `${name} v${version} Copyright 2023 ${author.name}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), dts({ insertTypesEntry: true }), react(), banner(bannerText)],
  build: {
    lib: {
      name,
      entry: [path.resolve(__dirname, 'package/src/index.ts')],
      formats: ['es', 'umd'],
      fileName: format => `index.${format}.js`
    }
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text']
    },
    globals: true
  }
});
