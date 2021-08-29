import Link from 'next/link';

import styles from '@/styles/header.module.css';
import User from './User';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/main">
          <a>
            <img src="/images/logo-blanco.svg" alt="Kuali logo" />
          </a>
        </Link>
      </div>
      <User />
    </header>
  );
}
