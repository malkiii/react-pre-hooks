import { site } from '~/constants/site';
import { useConfig } from 'nextra-theme-docs';

export default function SourceCodeLink() {
  const { title } = useConfig();

  if (typeof title == 'string' && !title.startsWith('use')) return null;

  return (
    <a
      href={`${site.srcDirectory}/${title}/index.ts`}
      target="_blank"
      rel="noreferrer"
      className="nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100 contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50"
    >
      View source code
    </a>
  );
}
