import fs from 'fs';
import path from 'path';

export const srcDirectory = path.join(import.meta.dirname, '../packages/hooks/src');
export const indexFile = path.join(srcDirectory, 'index.ts');
export const hooksFolders = fs
  .readdirSync(srcDirectory, { withFileTypes: true })
  .filter(file => file.isDirectory() && file.name.startsWith('use'));
