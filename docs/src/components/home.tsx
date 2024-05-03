import React from 'react';
import Link from 'next/link';
import { site } from '~/constants/site';
import { ArrowRight as ArrowRightIcon } from './icons';

export default function Home({ children }: React.PropsWithChildren) {
  const codeTabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && (child.type as any).displayName === 'CodeTab'
  );

  if (codeTabs.length !== 2) {
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
            className="border text-neutral-950 dark:text-neutral-50 dark:border-slate-200/20 border-slate-950/20  hover:bg-slate-400/5"
          >
            View On GitHub
          </a>
        </div>
      </div>
      <DemoCode tabs={codeTabs} />
    </div>
  );
}

function DemoCode({ tabs }: { tabs: React.ReactNode[] }) {
  return (
    <div className="dark touch-none mx-auto mb-24 flex bg-[rgb(14,14,14)] shadow-[0_0_250px_0] shadow-primary [--tw-text-opacity:0.3] hover:[--tw-text-opacity:0.5] lg:*:w-1/2 *:min-w-[33%] *:min-h-[15%] max-w-6xl border-solid border-[0.75rem] border-neutral-900 rounded-xl transition-shadow duration-300 max-lg:flex-col">
      <div className="relative max-lg:border-b overflow-hidden lg:border-r max-lg:border-white/30 lg:border-white/30">
        {tabs[0]}
      </div>
      {tabs[1]}
    </div>
  );
}
