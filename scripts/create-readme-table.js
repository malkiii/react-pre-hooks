import fs from 'fs';
import path from 'path';
import extractComments from 'extract-comments';
import { marked } from 'marked';
import { hooksFolders, pkg, rootDir } from './utils.js';

const hooksDirectory = path.join(rootDir, 'docs/src/pages/docs/hooks');
const readmeFilePath = path.join(rootDir, 'packages/hooks/README.md');

const pages = getHooksPages(hooksDirectory);

const tableRows = convertToTableRows(pages);

console.log(tableRows);

replaceTableContent(readmeFilePath, tableRows);

console.log('✅ README table updated successfully!');

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
  return md.trim().replace(/\(\.\/(\w+)\)/g, `(${getHookPageURL('$1')})`);
}

function getHooksPages() {
  return hooksFolders.map(folder => {
    const pagePath = path.join(folder.path, folder.name, 'index.page.tsx');

    /** @type {{ value: string }[]} */
    const pageContent = extractComments(fs.readFileSync(pagePath, 'utf8'));

    const title = folder.name;
    const description = pageContent
      .find(({ value }) => value.includes('@description'))
      ?.value.replace('@description', '')
      .trim();

    return { title, description };
  });
}

/**
 * @param {ReturnType<typeof getHooksPages>} data
 */
function convertToTableRows(data) {
  return data
    .map(
      async ({ title, description }) =>
        `<tr><td><a href="${getHookPageURL(title)}">${title}</a></td>` +
        `<td>${await getHookDescription(description)}</td></tr>`
    )
    .join('\n');
}

/**
 * @param {string} filePath
 * @param {string} tableRows
 */
function replaceTableContent(filePath, tableRows) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const tableStartIndex = fileContent.indexOf('<table');
  const tableEndIndex = fileContent.indexOf('</table>') + '</table>'.length;

  const newTableContent = `<table align=center>\n<tr align=left><th>Name</th><th>Description</th></tr>${tableRows}\n</table>`;

  fs.writeFileSync(
    filePath,
    fileContent.slice(0, tableStartIndex) + newTableContent + fileContent.slice(tableEndIndex)
  );
}
