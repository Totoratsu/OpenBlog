import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { Provider } from 'react-redux';

import { useStore } from '../libs/redux/store';

function App({ Component, pageProps }: AppProps): JSX.Element {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default App;
