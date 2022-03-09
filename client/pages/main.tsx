import styles from '../styles/main/main.module.css';
import Head from 'next/head';
import Script from 'next/script';
import { NextPage } from 'next';
import Map from '../components/main/map/map';
import Sidebar from '../components/main/sidebar/sidebar';
import { useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Main: NextPage = () => {
  const [location, setLocation] = useState<number[]>([]);
  const [roomsId, setRoomsData] = useState(0);

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Script
        src="https://kit.fontawesome.com/026077c6cc.js"
        crossOrigin="anonymous"
      ></Script>
      <section className={styles.section}>
        <main className={styles.main} id={'mainPage'}>
          <Map roomsData={setRoomsData} setLocation={setLocation} />
          <Sidebar location={location} roomsId={roomsId} />
        </main>
      </section>
    </>
  );
};
export default Main;
function useMemot(arg0: () => any) {
  throw new Error('Function not implemented.');
}
