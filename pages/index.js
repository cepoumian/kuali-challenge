import { Fragment } from 'react';
import Head from 'next/head';

import Login from '@/components/Login';
import styles from '../styles/enter.module.css';

export default function EnterPage() {
  return (
    <Fragment>
      <Head>
        <title>Ingresa al Kuali Challenge</title>
        <meta name="description" content="Ingresa a Kuali Challenge" />
      </Head>
      <div className={styles.wrapper}>
        <figure className={styles.hello}>
          <img src="/images/login-imagen.svg" alt="Ilustración de fondo" />
        </figure>
        <Login />
      </div>
    </Fragment>
  );
}
