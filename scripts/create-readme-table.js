import fs from 'fs';
import path from 'path';
import doctrine from 'doctrine';
import { marked } from 'marked';
import { commentBlockPattern, hooksFolders, pkg, rootDir } from './utils.js';

main();

async function main() {
  const hooksDirectory = path.join(rootDir, 'docs/src/pages/docs/hooks');
  const readmeFilePath = path.join(rootDir, 'packages/hooks/README.md');

  const pages = getHooksPages(hooksDirectory);

  const tableRows = await convertToTableRows(pages);

  replaceTableContent(readmeFilePath, tableRows.join('\n'));

  console.log('✅ README table updated successfully!');
}

/**
 * @param {string} name
 */
function getHookPageURL(name) {
  return `${pkg.homepage}/docs/hooks/${name}`;
}

/**
 * @param {string} content
 */
async function getHookDescription(content) {
  const md = await marked(content);
  return md.trim().replace(/\.\/(\w+)/g, getHookPageURL('$1'));
}

function getHooksPages() {
  return hooksFolders.map(folder => {
    const pagePath = path.join(folder.path, folder.name, 'index.page.jsx');
    const fileContent = fs.readFileSync(pagePath, 'utf8');

    const block = doctrine.parse(commentBlockPattern.exec(fileContent)[0] ?? '', { unwrap: true });

    const title = folder.name;
    const description = block.tags[0]?.description?.trim() ?? '';

    return { title, description };
  });
}

/**
 * @param {ReturnType<typeof getHooksPages>} data
 */
async function convertToTableRows(data) {
  return Promise.all(
    data.map(async ({ title, description }) => {
      const url = getHookPageURL(title);
      const desc = await getHookDescription(description);

      return `<tr><td><a href="${url}">${title}</a></td><td>${desc}</td></tr>`;
    })
  );
}

/**
 * @param {string} filePath
 * @param {string} tableRows
 */
function replaceTableContent(filePath, tableRows) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const tableStartIndex = fileContent.indexOf('<table id="hooks"');
  const tableEndIndex = fileContent.indexOf('</table>') + '</table>'.length;

  const newTableContent = `\
<table id="hooks" align=center>
  <tr align=left><th>Name</th><th>Description</th></tr>
  ${tableRows}
</table>`;

  fs.writeFileSync(
    filePath,
    fileContent.slice(0, tableStartIndex) + newTableContent + fileContent.slice(tableEndIndex)
  );
}
