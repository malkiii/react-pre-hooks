import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({ subsets: ['latin'], display: 'swap', preload: true });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${fontSans.className} font-medium antialiased [&_::selection]:bg-primary [&_::selection]:text-white [&_[tabindex]]:ring-[none!important]`}
    >
      <Component {...pageProps} />
    </main>
  );
}
