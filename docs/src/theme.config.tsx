import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { site } from './constants/site';

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-2 whitespace-nowrap select-none">
      <Image src={site.icon} alt="Logo" width="800" height="714" className="w-8" priority />
      <span className="font-bold text-xl">{site.title}</span>
    </div>
  ),
  project: {
    link: site.github
  },
  toc: {
    float: true,
    backToTop: true
  },
  nextThemes: {
    defaultTheme: 'dark'
  },
  docsRepositoryBase: `${site.github}/tree/master/docs`,
  useNextSeoProps() {
    const { pathname } = useRouter();
    return { titleTemplate: pathname == '/' ? site.title : `%s | ${site.title}` };
  },
  primaryHue: 200,
  primarySaturation: 100,
  head: (
    <>
      <meta name="description" content={site.description} />
      <meta property="og:url" content={site.url} />
      <meta property="og:title" content={site.title} />
      <meta property="og:description" content={site.description} />
      <meta property="og:image" content={site.og} />
      <meta property="twitter:title" content={site.title} />
      <meta property="twitter:description" content={site.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={site.og} />
      <link rel="icon" href={site.icon} />
    </>
  ),
  footer: {
    text: (
      <p className="text-sm font-semibold">
        © Copyright 2023-{new Date().getFullYear()} Malki Abderrahmane
      </p>
    )
  }
};

export default config;
