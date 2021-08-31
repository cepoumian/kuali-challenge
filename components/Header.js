import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AuthContext from 'store/auth-context';
import styles from '@/styles/header.module.css';
import User from './User';

export default function Header({ toggleTheme }) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
    router.push('/');
  };

  /* const toggleThemeTrigger = () => toggleTheme(); */

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/main">
          <a>
            <img src="/images/logo-blanco.svg" alt="Kuali logo" />
          </a>
        </Link>
      </div>
      {isLoggedIn && (
        <div className={styles.wrapper}>
          <button onClick={logoutHandler} className={styles.logout}>
            Salir de la aplicación
          </button>
          <button onClick={toggleTheme} className={styles.logout}>
            Cambiar de tema
          </button>
          <User />
        </div>
      )}
      {!isLoggedIn && (
        <Link href="/">
          <a className={styles.login}>Ingresa o Registrate</a>
        </Link>
      )}
    </header>
  );
}
