import styles from '@/styles/profileCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileCard({ user }) {
  const { login, avatar_url, type } = user;
  console.log(avatar_url);
  return (
    <div className={styles.card}>
      <p>Usuario:</p>
      <h3>{login}</h3>
      <Image
        src={avatar_url}
        alt="Profile avatar"
        className={styles.avatar}
        width={100}
        height={100}
      />
      <Link href={`/profile/${login}`}>
        <a className={styles.button}>Más Info</a>
      </Link>
    </div>
  );
}
