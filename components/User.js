import { useEffect, useState } from 'react';
import styles from '../styles/user.module.css';

export default function User({ showTooltip, userData }) {
  const [email, setEmail] = useState('test@example.com');
  useEffect(() => {
    if (userData) {
      setEmail(userData.users[0].email);
    }
  }, [userData]);

  return (
    <div className={styles.user}>
      <div className={styles.initials}>{email.charAt(0)}</div>
      <div className={styles.details}>
        <p>{email.split('@')[0]}</p>
        <button type="button" onClick={showTooltip}>
          Mi Perfil
        </button>
      </div>
    </div>
  );
}
