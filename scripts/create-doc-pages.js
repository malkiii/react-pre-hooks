import fs from 'fs';
import path from 'path';
import doctrine from 'doctrine';
import extractComments from 'extract-comments';
import { hooksFolders, pkg, rootDir } from './utils.js';

const pagesDir = path.join(rootDir, 'docs/src/pages/docs/hooks');

hooksFolders.forEach(folder => {
  fs.writeFileSync(
    path.join(pagesDir, `${folder.name}.mdx`),
    hookPageContent(folder.name, path.join(folder.path, folder.name, 'index.page.tsx'))
  );
});

/**
 * @param {string} title
 * @param {string} pageFile
 * @returns {string}
 */
function hookPageContent(title, pageFile) {
  const fileContent = fs.readFileSync(pageFile, 'utf8').replace(/\r/g, '').trim();
  const parsed = parsePageFile(fileContent);

  const pageHead = `\
---
title: ${title}
---

import { Tab, Tabs } from 'nextra-theme-docs';
import Callout from '~/components/callout';

# ${title}
`;

  const pageBody = parsed
    .map(({ doc, code }) => {
      const tagName = doc.tags[0]?.title;
      const description = doc.tags[0]?.description?.trim() ?? '';

      if (!code) return mdxContent(tagName, description);

      switch (tagName) {
        case 'description':
          return `${description}\n${codeBlock(code)}\n## Example\n`;
        case 'example':
          return `${description}\n${generateDemoComponent(code)}`;
        default:
          return `${description}\n${codeBlock(code, 'copy')}\n`;
      }
    })
    .join('\n');

  return `${pageHead}\n${pageBody}`;
}

/**
 * @param {string} fileContent
 */
function parsePageFile(fileContent) {
  /** @type {{ value: string; code: Record<string, any> }[]} */
  const comments = extractComments(fileContent);

  const contentLines = fileContent.split('\n');

  return comments.map((comment, index) => {
    const doc = doctrine.parse(comment.value, { unwrap: true });

    if (!comment.code.value) return { doc, code: '' };

    const startLine = comment.code.loc.start.line;
    const endLine = comments[index + 1]?.loc.start.line ?? contentLines.length + 1;

    const code = contentLines.slice(startLine - 1, endLine - 1).join('\n');

    return { doc, code: `${generateImports(code)}\n${code}` };
  });
}

/**
 * @param {string} code
 */
function generateImports(code) {
  const reactPattern = /\bReact\b/;
  const hooksPattern = /\s+use\w+/g;

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
  return '\n```tsx ' + attributes.join(' ') + '\n' + code.trim() + '\n```\n';
}

/**
 * @param {string} code
 */
function generateDemoComponent(code) {
  const componentName = /export\s\w+\s(\w+)/.exec(code)?.[1] ?? 'hr';

  return `
<Tabs items={['Preview', 'Code']}>
<Tab>
${code.trim()}

<${componentName} />
</Tab>
<Tab>
${codeBlock(code, 'copy')}
</Tab>
</Tabs>
`;
}

/**
 * @param {string} type
 * @param {string | undefined} content
 */
function mdxContent(type, content) {
  const callouts = ['info', 'tip', 'warning'];

  if (callouts.includes(type)) {
    return `<Callout type="${type}">\n${content}\n</Callout>\n`;
  }

  return content ?? '';
}
