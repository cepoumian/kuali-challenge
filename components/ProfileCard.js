import styles from '@/styles/profileCard.module.css';
import Link from 'next/link';

export default function ProfileCard({ user }) {
  const { login, avatar_url, type } = user;

  return (
    <div className={styles.card}>
      <p>Usuario:</p>
      <h3>{login}</h3>
      <img src={avatar_url} alt="Profile avatar" className={styles.avatar} />
      <Link href={`/profile/${login}`}>
        <a className={styles.button}>Más Info</a>
      </Link>
    </div>
  );
}
