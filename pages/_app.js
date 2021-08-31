import { AuthContextProvider } from 'store/auth-context';
import { ThemeContextProvider } from 'store/theme-context';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
