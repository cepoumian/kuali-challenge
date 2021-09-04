import { useState, useEffect } from 'react';

import useHttp from '@/hooks/use-http';
import usePage from '@/hooks/use-pagination';
import ProfileCard from './ProfileCard';
const per_page = parseInt(process.env.NEXT_PUBLIC_PER_PAGE);
import styles from '../styles/main.module.css';

export default function Main({
  initialUsers,
  searchUser,
  error,
  initialError,
  theme,
  loading,
}) {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [next, setNext] = useState(0);
  const { getPage, page } = usePage(per_page);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

  useEffect(() => {
    if (users && users.length > 0) {
      const usersChunk = users.slice(next, next + per_page);
      setCurrentUsers(usersChunk);
    }
  }, [users, next, setCurrentUsers]);

  useEffect(() => {
    getPage(next);
  }, [next, getPage]);

  useEffect(() => {
    setSearchError(error);
    const timeout = setTimeout(() => {
      setSearchError(null);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  const nextUsersHandler = () => {
    if (next <= per_page * 4) {
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
            &lt; Anterior
          </button>
          {loading ? <p>Cargando....</p> : <p>Página {page}</p>}
          <button type="button" onClick={nextUsersHandler} disabled={page === 4}>
            Siguiente &gt;
          </button>
        </div>
        {initialError && <p>Se ha producido un errror: {initialError}</p>}
        <div className={styles.profiles}>
          {currentUsers?.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}
