import styles from '@/styles/loginForm.module.css';

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" />
      </fieldset>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
