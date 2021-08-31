import { Fragment } from 'react';
import Head from 'next/head';

import styles from '@/styles/page.module.css';

export default function Page({ title, children }) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <div className={styles.wrapper}>{children}</div>
    </Fragment>
  );
}
