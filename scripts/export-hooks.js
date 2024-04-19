import fs from 'fs';
import path from 'path';
import { hooksFolders } from './utils.js';

const indexFile = path.join(hooksFolders[0].path, 'index.ts');

// Create or overwrite the index.ts file
fs.writeFileSync(indexFile, '/** @run "pnpm prebuild" to modify this file */\n');

hooksFolders.forEach(folder => {
  const folderIndexFile = path.join(folder.path, folder.name, 'index.ts');

  try {
    const fileContent = fs.readFileSync(folderIndexFile, 'utf8');
    const exports = fileContent.match(/export (const use\w+|type \w+)/g);

    if (exports && exports.length > 0) {
      const formattedExports = exports.join(', ').replace(/(export|const) /g, '');
      fs.appendFileSync(indexFile, `export { ${formattedExports} } from './${folder.name}';\n`);
    }
  } catch (error) {
    console.error(`Error reading or processing ${folderIndexFile}:`, error);
  }
});
