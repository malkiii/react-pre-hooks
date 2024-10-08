import fs from 'fs';
import path from 'path';
import doctrine from 'doctrine';
import prettier from 'prettier';
import { commentBlockPattern, hooksFolders, pkg, rootDir } from './utils.js';

async function main() {
  const pagesDir = path.join(rootDir, 'docs/src/pages/docs/hooks');
  for (const folder of hooksFolders) {
    fs.writeFileSync(
      path.join(pagesDir, `${folder.name}.mdx`),
      await hookPageContent(folder.name, path.join(folder.path, folder.name, 'index.page.jsx'))
    );
  }
}

/**
 * @param {string} title
 * @param {string} pageFile
 */
async function hookPageContent(title, pageFile) {
  const fileContent = fs.readFileSync(pageFile, 'utf8').replace(/\r/g, '');
  const parsed = parsePageFile(fileContent);

  const pageHead = `\
---
title: ${title}
---

import { Tab, Tabs } from 'nextra-theme-docs';
import Callout from '~/components/callout';

# ${title}
`;

  const pageBody = (
    await Promise.all(
      parsed.map(async ({ doc, code }) => {
        const tagName = doc.tags[0]?.title;
        const description = doc.tags[0]?.description ?? '';

        switch (tagName) {
          case 'example':
            return `${description.trim()}\n${await generateDemoComponent(code)}`;
          case 'info':
          case 'tip':
          case 'warning':
            return `<Callout type="${tagName}">\n${description}\n</Callout>\n`;
          default:
            return `${description}\n${codeBlock(code, 'copy')}\n`;
        }
      })
    )
  ).join('\n');

  return [pageHead, pageBody, '## Type Definitions', getTypeDefinition(title)].join('\n');
}

/**
 * @param {string} fileContent
 */
function parsePageFile(fileContent) {
  const contentBlocks = fileContent.split(/\n+(?=\/\*\*)/);

  return contentBlocks
    .filter(block => commentBlockPattern.test(block))
    .map(block => {
      const comment = commentBlockPattern.exec(block)[0];

      const doc = doctrine.parse(comment, { unwrap: true });
      const code = block.replace(comment, '').trim();

      return { doc, code: code ? `${generateImports(code)}\n${code}` : '' };
    });
}

/**
 * @param {string} code
 */
function generateImports(code) {
  const reactPattern = /\bReact\b/;
  const hooksPattern = /\s+use[A-Z]\w+/g;

  let imports = '';

  if (reactPattern.test(code)) {
    imports += `import React from 'react';\n`;
  }

  const importedHooks = [...code.matchAll(hooksPattern)].map(match => match[0].trim());

  if (importedHooks.length) {
    imports += `import { ${importedHooks.join(', ')} } from '${pkg.name}';\n`;
  }

  return imports;
}

/**
 * @param {string} code
 * @param {string[]} attributes
 */
function codeBlock(code, ...attributes) {
  if (!code) return '';
  return ['```tsx ' + attributes.join(' '), code.trim(), '```'].join('\n');
}

/**
 * @param {string} code
 */
async function generateDemoComponent(code) {
  const basePath = new URL(pkg.homepage).pathname;
  const componentName = /export\s\w+\s(\w+)/.exec(code)?.[1] ?? 'hr';

  const previewCode = code.replace(/src="(\/[^"]+)"/g, `src="${basePath}$1"`).trim();

  const formattedCode = await prettier.format(code.replace(/[\t ]+className="[^"]*"\n*/g, ''), {
    parser: 'babel',
    ...(await prettier.resolveConfig('.prettierrc.json'))
  });

  return `
<Tabs items={['Demo', 'Code']}>
<Tab>
${previewCode}

<${componentName} />
</Tab>
<Tab>
${codeBlock(formattedCode, 'copy')}
</Tab>
</Tabs>
`;
}

function getTypeDefinition(hookName) {
  const definitionFile = path.join(rootDir, 'packages/hooks/dist', hookName, 'index.d.ts');

  const typeDefinition = fs
    .readFileSync(definitionFile, 'utf8')
    .replace(/\/\/.*|\/\*[^]*?\*\//g, '')
    .replace(/export\s+|declare\s+|\{\};/g, '')
    .replace(/import\("react"\)/g, 'React')
    .trim();

  return codeBlock(typeDefinition);
}

main();
