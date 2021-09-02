import { useState } from 'react';
import styles from '../styles/tooltip.module.css';

export default function Tooltip({ toggle, switchToggle, logout, hideTooltip }) {
  return (
    <div className={styles.wrapper} onClickO>
      <button type="button" onClick={hideTooltip}>
        X
      </button>
      <div className={styles.col}>
        <img src="/images/moon.svg" alt="" />
        <p>Activar tema oscuro</p>
        <label className={styles.switch}>
          <input type="checkbox" onClick={switchToggle} checked={toggle} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
      <div className={styles.col} onClick={logout}>
        <img src="/images/exit.svg" alt="" />
        <p>Cerrar Sesión</p>
      </div>
    </div>
  );
}
