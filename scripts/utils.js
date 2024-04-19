import fs from 'fs';
import path from 'path';

export const rootDir = path.join(import.meta.dirname, '../');
export const hooksFolders = fs
  .readdirSync(path.join(rootDir, 'packages/hooks/src'), { withFileTypes: true })
  .filter(file => file.isDirectory() && file.name.startsWith('use'));
