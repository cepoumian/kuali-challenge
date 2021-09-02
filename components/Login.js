import LoginForm from './LoginForm';
import styles from '../styles/login.module.css';

export default function Login() {
  return (
    <div className={styles.login}>
      <img src="/images/logo-color.svg" alt="Ilustración de fondo" />
      <h3>
        Estas por iniciar:
        <br /> Kuali Challenge
      </h3>
      <p>
        Ingresa tus datos <br /> para continuar.
      </p>
      <LoginForm />
    </div>
  );
}
