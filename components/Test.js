import { useEffect } from 'react';

import useHttp from '@/hooks/use-http';
import { getUsers } from '@/lib/api';
import styles from '@/styles/Test.module.css';

export default function Test() {
  const { sendRequest, status, data: users, error } = useHttp(getUsers, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'completed' && users) {
    console.log(users);
  }

  return (
    <div className={styles.prueba}>
      <img src="images/kuali-logo-blanco.png" alt="Logo de Soluciones Kuali" />
      <h1>Pagina Inicial (Prueba)</h1>
    </div>
  );
}
