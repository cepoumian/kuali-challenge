import { useEffect, useState } from 'react';

import Page from '@/components/Page';
import Header from '@/components/Header';
import Main from '@/components/Main';
import DisplayError from '@/components/DisplayError';

import useHttp from '@/hooks/use-http';
import { getUsers, getUserByUsername } from '@/lib/api';

export default function MainPage({ initialUsers, initialError }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendRequest, status, data, error } = useHttp(getUserByUsername, true);

  useEffect(() => {
    setLoading(true);

    if (!data && status === 'pending') {
      setUsers(initialUsers);
      setLoading(false);
    }

    if (data && status === 'completed') {
      const searchedUser = [];
      searchedUser.push(data);
      setUsers(searchedUser);
      setLoading(false);
    }
  }, [status, data, setUsers, initialUsers]);

  const searchUser = (username) => {
    if (username.length !== 0) {
      sendRequest(username);
    }
  };

  return (
    <Page title="Pagina Principal">
      <Header />
      <Main
        initialUsers={users}
        loading={loading}
        searchUser={searchUser}
        initialError={initialError}
        error={error}
      />
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
    props: { initialUsers: users, initialError: error },
  };
}
