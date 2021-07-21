import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '../styles/globals.css';
import BaseStyles from '../styles/global';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <BaseStyles />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
