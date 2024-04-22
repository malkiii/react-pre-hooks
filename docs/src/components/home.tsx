import React from 'react';
import { site } from '~/constants/site';
import { useSwiping } from 'react-pre-hooks';

export default function Home({ children }: React.PropsWithChildren) {
  const codeBlocks = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && (child.type as any).displayName === 'CodeBlock'
  );

  if (codeBlocks.length !== 2) {
    throw new Error('Home component must have exactly 2 CodeBlock children.');
  }

  return (
    <div className="px-6 pt-16 nx-min-h-[calc(100vh-var(--nextra-navbar-height))]">
      <h2 className="text-center text-balance font-bold leading-tight tracking-tight text-5xl">
        {site.description}
      </h2>
      <DemoCode blocks={codeBlocks} />
    </div>
  );
}

function DemoCode({ blocks }: { blocks: React.ReactNode[] }) {
  const containerWidth = React.useRef(0);

  const resizerRef = useSwiping<HTMLDivElement>(action => {
    const container = resizerRef.current?.parentElement;
    if (!container) return;

    if (action.type === 'start') {
      containerWidth.current = container.offsetWidth;
      return;
    }

    container.style.width = containerWidth.current - action.deltaX + 'px';
  });

  return (
    <div className="dark mx-auto flex bg-[rgb(14,14,14)] *:w-1/2 *:min-w-[33%] max-w-6xl border-solid border-[1rem] border-neutral-900 rounded-xl">
      <div className="relative border-r border-white/30">
        {blocks[0]}
        <div
          ref={resizerRef}
          className="h-full absolute top-0 right-0 translate-x-1/2 w-2 cursor-ew-resize"
        ></div>
      </div>
      {blocks[1]}
    </div>
  );
}
