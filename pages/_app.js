import { AuthContextProvider } from 'store/auth-context';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
