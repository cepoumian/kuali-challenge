import Header from '@/components/Header';
import Page from '@/components/Page';
import Profile from '@/components/Profile';
import { getUsersByUsername } from '@/lib/api';

export default function ProfilePage({ params }) {
  console.log(params);
  return (
    <Page title="Pagina Principal">
      <Header />
      {/* {requestError && <p>{requestError}</p>} */}
      <Profile />
    </Page>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
