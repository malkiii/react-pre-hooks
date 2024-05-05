import { site } from '~/constants/site';
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs';

type EditLinkProps = React.ComponentProps<
  NonNullable<NonNullable<DocsThemeConfig['editLink']>['component']>
>;

export default function EditLink(props: EditLinkProps) {
  const { title } = useConfig();

  const isHook = typeof title == 'string' && title.startsWith('use');

  return (
    <a
      href={
        isHook
          ? `${site.srcDirectory}/${title}/index.page.tsx`
          : `${site.github}/blob/master/docs/${props.filePath}`
      }
      className={props.className}
      target="_blank"
      rel="noopener noreferrer"
    >
      Edit this page on GitHub →
    </a>
  );
}
