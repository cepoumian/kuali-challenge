import Header from '@/components/Header';
import Page from '@/components/Page';
import Profile from '@/components/Profile';
import { getUserByUsername } from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage({ user, error }) {
  return (
    <Page title="Pagina Principal">
      <Header />
      <Profile user={user} error={error} />
      <Link href="/main">
        <a
          style={{
            marginLeft: '6rem',
            textDecoration: 'none',
            color: 'var(--clr-1-azul-acento)',
          }}
        >
          Volver a la página principal
        </a>
      </Link>
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
