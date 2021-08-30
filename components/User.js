import styles from '@/styles/user.module.css';

export default function User() {
  return (
    <div className={styles.user}>
      <div className={styles.initials}>CP</div>
      <div className={styles.details}>
        <p>Cesar Poumian</p>
        <div>Mi Perfil</div>
      </div>
    </div>
  );
}
