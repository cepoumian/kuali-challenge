import { useState, useRef, useContext, Fragment } from 'react';
import { useRouter } from 'next/router';

import { signUpNewUser, signInUser } from '@/lib/api';
import AuthContext from 'store/auth-context';
import styles from '../styles/loginForm.module.css';

export default function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let res;
    let data;

    try {
      if (isLogin) {
        res = await signInUser(enteredEmail, enteredPassword);
      } else {
        res = await signUpNewUser(enteredEmail, enteredPassword);
      }

      if (res) setIsLoading(false);

      if (res.ok) {
        data = await res.json();
        authContext.login(data.idToken);
        router.push('/main');
      } else {
        data = await res.json();

        let errorMessage = 'La auntenticación de usuario ha fallado';

        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={emailInputRef} />

        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" ref={passwordInputRef} />
      </fieldset>
      {!isLoading && (
        <button type="submit" className={styles['form__button--auth']}>
          {isLogin ? 'Ingresa' : 'Crear nueva cuenta'}
        </button>
      )}
      {isLoading && <p>Cargando...</p>}
      <button
        type="button"
        className={styles['form__button--switch']}
        onClick={switchAuthModeHandler}
      >
        {isLogin ? 'Crea una nueva cuenta' : 'Ingresa con una cuenta existente'}
      </button>
    </form>
  );
}
