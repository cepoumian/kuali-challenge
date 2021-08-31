import { useState, useEffect, useRef } from 'react';

import useHttp from '@/hooks/use-http';
import usePage from '@/hooks/use-pagination';
import ProfileCard from './ProfileCard';
import styles from '@/styles/main.module.css';
import { getUsers } from '@/lib/api';
const per_page = parseInt(process.env.NEXT_PUBLIC_PER_PAGE);

export default function Main({ initialUsers, loading, searchUsers }) {
  const [users, setUsers] = useState([]);
  const { sendRequest, status, data, error: requestError } = useHttp(getUsers);
  const [next, setNext] = useState(0);
  const { getPage, page } = usePage(per_page);
  const searchInputRef = useRef();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

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

  const searchUsersHandler = () => {
    searchUsers(searchInputRef.current.value);
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>Perfiles de Github</h2>
          <div className={styles.search}>
            <input type="text" name="search" ref={searchInputRef} />
            <button onClick={searchUsersHandler}>Buscar usuario</button>
          </div>
        </div>
        <div className={styles.pages}>
          <button type="button" onClick={prevUsersHandler} disabled={page === 1}>
            Previos
          </button>
          {loading || (status === 'pending' ? <p>Cargando....</p> : <p>Página {page}</p>)}
          <button type="button" onClick={nextUsersHandler} disabled={page === 4}>
            Siguientes
          </button>
        </div>
        {requestError && <p>Se ha producido un errror: {requestError}</p>}
        <div className={styles.profiles}>
          {users?.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </div>
  );
}
