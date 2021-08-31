import { useEffect, useState } from 'react';

import Page from '@/components/Page';
import Header from '@/components/Header';
import Main from '@/components/Main';
import DisplayError from '@/components/DisplayError';

import useHttp from '@/hooks/use-http';
import { getUsers, getUsersByUsername } from '@/lib/api';

export default function MainPage({ initialUsers, error }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    sendRequest,
    status,
    data,
    error: requestError,
  } = useHttp(getUsersByUsername, true);

  useEffect(() => {
    setLoading(true);

    if (!data && status === 'pending') {
      setUsers(initialUsers);
      setLoading(false);
    }

    if (data && status === 'completed') {
      const searchedUsers = [];
      searchedUsers.push(data);
      setUsers(searchedUsers);
      setLoading(false);
    }
  }, [status, data, setUsers, initialUsers]);

  const searchUsers = (username) => {
    if (username.length !== 0) {
      sendRequest(username);
    }
  };

  return (
    <Page title="Pagina Principal">
      <Header />
      {requestError && <p>{requestError}</p>}
      <Main initialUsers={users} loading={loading} searchUsers={searchUsers} />
    </Page>
  );
}

/* Habilita renderización en el lado del servidor (SSR) */
export async function getServerSideProps() {
  let users = null;
  let error = null;

  try {
    users = await getUsers(0);
  } catch (requestError) {
    error = JSON.stringify(requestError.message);
  }

  return {
    props: { initialUsers: users, error },
  };
}
