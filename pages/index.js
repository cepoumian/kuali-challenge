import Head from 'next/head';

import Test from '@/components/Test';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cesar Poumian</title>
        <meta name="description" content="Sitio de Cesar Poumian para Kuali Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Test />
        </div>
      </main>
    </div>
  );
}
