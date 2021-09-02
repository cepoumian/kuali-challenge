import { useContext } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Page from '@/components/Page';
import Profile from '@/components/Profile';
import ThemeContext from 'store/theme-context';
import { getUserByUsername } from '@/lib/api';

export default function ProfilePage({ user, error }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Page title={`Perfil de ${user.login}`} theme={theme}>
      <Header toggleTheme={toggleTheme} />
      <Link href="/main">
        <a
          style={{
            marginTop: '3rem',
            marginLeft: '3rem',
            display: 'inline-block',
            textDecoration: 'none',
            color: theme ? 'var(--clr-1-principal)' : 'var(--clr-1-azul-acento)',
          }}
        >
          Volver a la página principal
        </a>
      </Link>
      <Profile user={user} error={error} theme={theme} />
    </Page>
  );
}

/* Habilita renderización en el lado del servidor (SSR) */
export async function getServerSideProps({ params }) {
  let user = null;
  let error = null;

  try {
    user = await getUserByUsername(params.login);
  } catch (requestError) {
    error = JSON.stringify(requestError.message);
  }

  return {
    props: { user, error },
  };
}
