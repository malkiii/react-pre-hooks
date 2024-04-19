import fs from 'fs';
import path from 'path';
import marked from 'marked';
import { homepage } from '../packages/hooks/package.json';
import { hooksFolders, indexFile } from './utils.js';

function getHookPageURL(name) {
  return `${homepage}/guide/${name}`;
}

function getHooksPages(directory) {
  return fs
    .readdirSync(directory)
    .filter(file => file.startsWith('use'))
    .map(file => {
      const filePath = path.join(directory, file);
      const contentLines = fs.readFileSync(filePath, 'utf8').split('\n');

      const title = contentLines[0].replace('#', '').trim();
      const description = contentLines[2].trim();

      return { title, description };
    });
}

function convertToTableRows(data) {
  return data
    .map(
      ({ title, description }) =>
        `<tr><td><a href="${getHookPageURL(title)}">${title}</a></td>` +
        `<td>${marked(description).trim()}</td></tr>`
    )
    .join('\n');
}

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

const guideDirectory = path.join(__dirname, '../docs/guide');
const readmeFilePath = path.join(__dirname, '../packages/hooks/README.md');

const pages = getHooksPages(guideDirectory);

const tableRows = convertToTableRows(pages);

replaceTableContent(readmeFilePath, tableRows);

console.log('README table updated successfully!');
