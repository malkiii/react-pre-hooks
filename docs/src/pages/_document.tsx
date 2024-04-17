import { Head, Html, Main, NextScript } from 'next/document';
import { site } from '~/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
