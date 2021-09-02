import { useState, useEffect } from 'react';

import useHttp from '@/hooks/use-http';
import usePage from '@/hooks/use-pagination';
import ProfileCard from './ProfileCard';
import styles from '@/styles/main.module.css';
import { getUsers } from '@/lib/api';
const per_page = parseInt(process.env.NEXT_PUBLIC_PER_PAGE);

export default function Main({ initialUsers, searchUser, error, initialError, theme }) {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [searchError, setSearchError] = useState('');
  const { sendRequest, status, data, error: requestError } = useHttp(getUsers);
  const [next, setNext] = useState(0);
  const { getPage, page } = usePage(per_page);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  useEffect(() => {
    setSearchError(error);
    const timeout = setTimeout(() => {
      setSearchError(null);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    sendRequest(next);
  }, [next, sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setUsers(data);
    }
  }, [status, data]);

  useEffect(() => {
    getPage(next);
  }, [next, getPage]);

  const nextUsersHandler = () => {
    if (next < 30) {
      setNext((prevState) => prevState + per_page);
    }
  };

  const prevUsersHandler = () => {
    if (next >= per_page) {
      setNext((prevState) => prevState - per_page);
    }
  };

  const searchUserHandler = () => {
    if (input.length > 0) {
      searchUser(input);
    } else {
      setInputError('Debe introducir un nombre de usuario');
      setTimeout(() => {
        setInputError(null);
      }, 2000);
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={theme ? styles.wrapperDark : styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>Perfiles de Github</h2>
          <div className={styles.search}>
            {inputError && <p>{inputError}</p>}
            {searchError && <p>El usuario no existe</p>}
            <input type="text" name="search" value={input} onChange={inputHandler} />
            <button onClick={searchUserHandler}>Buscar usuario</button>
          </div>
        </div>
        <div className={styles.pages}>
          <button type="button" onClick={prevUsersHandler} disabled={page === 1}>
            Anterior
          </button>
          {status === 'pending' ? <p>Cargando....</p> : <p>Página {page}</p>}
          <button type="button" onClick={nextUsersHandler} disabled={page === 4}>
            Siguiente
          </button>
        </div>
        {(initialError || requestError) && (
          <p>Se ha producido un errror: {initialError}</p>
        )}
        <div className={styles.profiles}>
          {users?.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}
