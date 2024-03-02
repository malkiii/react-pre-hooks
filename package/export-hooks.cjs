const fs = require('fs');
const path = require('path');

const srcDirectory = path.join(__dirname, 'src');
const indexFile = path.join(srcDirectory, 'index.ts');
const hooksFolders = fs
  .readdirSync(srcDirectory, { withFileTypes: true })
  .filter(file => file.isDirectory() && file.name.startsWith('use'));

// Create or overwrite the index.ts file
fs.writeFileSync(indexFile, '/** @run "pnpm prebuild" to modify this file */\n');

hooksFolders.forEach(folder => {
  const folderPath = path.join(srcDirectory, folder.name);
  const folderIndexFile = path.join(folderPath, 'index.ts');

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
