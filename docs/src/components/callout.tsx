import { Callout as NextraCallout } from 'nextra-theme-docs';
import { Info, Lightbulb, TriangleAlert } from './icons';

type CalloutProps = React.PropsWithChildren<{ type: 'info' | 'tip' | 'warning' }>;

export default function Callout({ type, children }: CalloutProps) {
  const Icon = type === 'info' ? Info : type === 'tip' ? Lightbulb : TriangleAlert;

  return (
    <NextraCallout type={type == 'tip' ? 'default' : type} emoji="">
      <div className="flex items-center gap-2">
        <Icon className="size-5" />
        <p className="uppercase my-2">{type}</p>
      </div>
      <div className="mb-3">{children}</div>
    </NextraCallout>
  );
}
