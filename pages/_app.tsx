import '../styles/globals.css';
import 'nprogress/nprogress.css';
import 'material-icons/iconfont/material-icons.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import { useRouter } from "next/router";
import NProgress from "nprogress";

import { store, wrapper } from '../store';

// Wrap the store by redux-persist to take effect
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(()=>{

    const progressStart = () => NProgress.start();
    const progressDone = () => NProgress.done();
    NProgress.configure({ showSpinner: false });

    // Subscribe to router events

    router.events.on('routeChangeStart', progressStart);
    router.events.on('routeChangeComplete', progressDone);
    router.events.on('routeChangeError', progressDone);

    // Unsubscribe from router events
    return ()=>{
        router.events.off('routeChangeStart', progressStart);
        router.events.off('routeChangeComplete', progressDone);
        router.events.off('routeChangeError', progressDone);
    }
}, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        {/* Parent Head with links */}
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&display=swap"/>
        </Head>

         {/* Main Body*/}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
