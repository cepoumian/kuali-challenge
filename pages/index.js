import { Fragment } from 'react';
import Head from 'next/head';

import Login from '@/components/Login';
import styles from '@/styles/enter.module.css';

export default function Enter() {
  return (
    <Fragment>
      <Head>
        <title>Login to Kuali Challenge</title>
        <meta name="description" content="Login to Kuali Challenge" />
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.hello}>
          <img src="/images/login-imagen.svg" alt="Ilustración de fondo" />
        </div>
        <Login />
      </div>
    </Fragment>
  );
}
