import styles from '@/styles/user.module.css';

export default function User({ showTooltip }) {
  return (
    <div className={styles.user}>
      <div className={styles.initials}>CP</div>
      <div className={styles.details}>
        <p>Cesar Poumian</p>
        <button type="button" onClick={showTooltip}>
          Mi Perfil
        </button>
      </div>
    </div>
  );
}
