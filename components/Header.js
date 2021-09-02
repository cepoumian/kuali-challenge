import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAppUserData } from '@/lib/api';
import AuthContext from 'store/auth-context';
import useHttp from '@/hooks/use-http';
import User from './User';
import Tooltip from './Tooltip';
import styles from '../styles/header.module.css';

export default function Header({ toggleTheme }) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { isLoggedIn, token } = authContext;
  const [showTooltip, setShowTooltip] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  const { sendRequest, status, data, error } = useHttp(getAppUserData, true);

  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  useEffect(() => {
    if (data && status === 'completed') {
      setUserData(data);
    }
  }, [status, data, error, setUserData]);

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
      <div className={styles.fullLogo}>
        <Link href="/main">
          <a>
            <img src="/images/logo-blanco.svg" alt="Kuali logo" />
          </a>
        </Link>
      </div>
      <div className={styles.smallLogo}>
        <Link href="/main">
          <a>
            <img src="/images/logoSmall.svg" alt="Kuali logo" />
          </a>
        </Link>
      </div>
      {isLoggedIn && (
        <div className={styles.wrapper}>
          <User showTooltip={showTooltipHandler} userData={userData} />
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
