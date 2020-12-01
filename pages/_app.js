import CredentialsProvider from '../context/CredentialsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<CredentialsProvider>
			<Component {...pageProps} />
		</CredentialsProvider>
	);
}

export default MyApp;
