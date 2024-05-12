import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../');
export const commentBlockPattern = /\/\*\*([^\*]|\*[^\/])*\*\//;
export const hooksFolders = fs
  .readdirSync(path.join(rootDir, 'packages/hooks/src'), { withFileTypes: true })
  .filter(file => file.isDirectory() && file.name.startsWith('use'));

export { default as pkg } from '../packages/hooks/package.json' with { type: "json" };