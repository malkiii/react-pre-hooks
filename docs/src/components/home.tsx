import React from 'react';
import Link from 'next/link';
import { site } from '~/constants/site';
import { useMediaQuery, useSwiping } from 'react-pre-hooks';
import { ArrowRight as ArrowRightIcon } from './icons';

export default function Home({ children }: React.PropsWithChildren) {
  const codeBlocks = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && (child.type as any).displayName === 'CodeBlock'
  );

  if (codeBlocks.length !== 2) {
    throw new Error('Home component must have exactly 2 CodeBlock children.');
  }

  return (
    <div className="px-6 relative pt-16 nx-min-h-[calc(100vh-var(--nextra-navbar-height))] overflow-hidden">
      <div className="text-center max-w-7xl mx-auto">
        <h2 className="sm:text-balance font-bold leading-tight tracking-tight text-5xl max-lg:text-4xl max-md:text-3xl">
          {site.description}
        </h2>
        <div className="flex mt-4 mb-12 items-center font-semibold justify-center gap-4 *:px-4 *:p-2 *:rounded-full *:transition-colors *:whitespace-nowrap">
          <Link
            href="/docs"
            className="flex items-center gap-1 text-white dark:text-white bg-[hsl(200_100_42%)] hover:bg-[hsl(200_100_35%)]"
          >
            Get Started
            <ArrowRightIcon className="inline-block w-6" />
          </Link>
          <a
            href={site.github}
            target="_blank"
            className="border text-neutral-950 dark:text-neutral-50 dark:border-neutral-500 dark:hover:border-neutral-50 border-neutral-500 hover:border-neutral-950"
          >
            View On GitHub
          </a>
        </div>
      </div>
      <DemoCode blocks={codeBlocks} />
    </div>
  );
}

function DemoCode({ blocks }: { blocks: React.ReactNode[] }) {
  const containerSize = React.useRef(0);
  const isVertical = useMediaQuery('(max-width: 1160px)');

  const resizerRef = useSwiping<HTMLDivElement>(action => {
    const container = resizerRef.current?.parentElement;
    if (!container) return;

    if (action.type === 'start') {
      containerSize.current = isVertical ? container.offsetHeight : container.offsetWidth;
      return;
    }

    if (isVertical) {
      container.style.height = containerSize.current - action.deltaY + 'px';
      container.style.width = '';
    } else {
      container.style.width = containerSize.current - action.deltaX + 'px';
      container.style.height = '';
    }
  });

  return (
    <div
      className={`dark touch-none mx-auto mb-24 flex bg-[rgb(14,14,14)] shadow-[0_0_250px_0] shadow-primary [--tw-text-opacity:0.3] hover:[--tw-text-opacity:0.5] max-[1160px]:h-[800px] min-[1160px]:*:w-1/2 *:min-w-[33%] *:min-h-[15%] max-w-6xl border-solid border-[0.75rem] border-neutral-900 rounded-xl transition-shadow duration-300 max-[1160px]:flex-col`}
    >
      <div className="relative max-[1160px]:border-b overflow-hidden min-[1160px]:border-r border-white/30">
        {blocks[0]}
        <div
          ref={resizerRef}
          className={`absolute right-0 ${isVertical ? 'bottom-0 translate-y-1/2 h-2 w-full cursor-ns-resize' : 'top-0 translate-x-1/2 w-2 h-full cursor-ew-resize'}`}
        ></div>
      </div>
      {blocks[1]}
    </div>
  );
}
