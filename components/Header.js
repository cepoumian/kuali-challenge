import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AuthContext from 'store/auth-context';
import styles from '@/styles/header.module.css';
import User from './User';
import Tooltip from './Tooltip';

export default function Header({ toggleTheme /* , showTooltip, showTooltipHandler */ }) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const isLoggedIn = authContext.isLoggedIn;
  const [showTooltip, setShowTooltip] = useState(false);
  const [toggle, setToggle] = useState(false);

  const logoutHandler = () => {
    authContext.logout();
    router.push('/');
  };

  const showTooltipHandler = () => {
    setShowTooltip((prevState) => !prevState);
  };

  const hideTooltipHandler = () => {
    if (showTooltip === true) {
      setShowTooltip(false);
    }
  };

  const toggleHandler = () => {
    toggleTheme();
    setToggle((prevState) => !prevState);
  };

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
          <User showTooltip={showTooltipHandler} />
        </div>
      )}
      {!isLoggedIn && (
        <Link href="/">
          <a className={styles.login}>Ingresa o Registrate</a>
        </Link>
      )}
      {showTooltip && (
        <Tooltip
          toggleTheme={toggleTheme}
          toggle={toggle}
          switchToggle={toggleHandler}
          logout={logoutHandler}
          hideTooltip={hideTooltipHandler}
        />
      )}
    </header>
  );
}
