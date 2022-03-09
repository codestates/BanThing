import type { NextPage } from 'next';
import Head from 'next/head';
import First from '../components/home/first/first';
import Progress from '../components/home/progress';
import Second from '../components/home/second/second';
import Introduction from '../components/home/introduction';
import IntroductionMobile from '../components/home/fourth/IntroductionMobile';
import Third from '../components/home/third/third';
import Caption from '../components/home/caption';
import Footer from '../components/home/footer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  if (typeof window !== 'undefined') {
    window.onload = function () {
      setTimeout(function () {
        scrollTo(0, 0);
      }, 100);
    };
  }

  return (
    <>
      <div className={styles.home_container}>
        <Head>
          <title>BanThing</title>
          <meta name="BanThing" content="Order with your foodmate" />
          <link rel="icon" href="/icon.ico" />
        </Head>

        <Progress />

        <First />

        <Second />

        <Third />

        <Introduction
          imagePosition={'left'}
          image={'/foodmate.png'}
          title={'내 주변의 배달메이트'}
          description={[
            '마침 배달음식을 시켜먹고 싶은데',
            '배달비도 최저금액도 함께 나눌 수 있는',
            '내 주변의 배달메이트를 반띵에서 찾아보세요!',
            ' ',
            '지도상에서 현재 나의 위치를 기반으로',
            '내 주변의 배달메이트들이 올린',
            '반띵 게시글들을 확인할 수 있습니다.',
          ]}
        />

        {/* <div className={styles.use_image_container}>
          <img src="/use2.gif" alt="using-image" className={styles.use_image} />
        </div> */}

        <Introduction
          imagePosition={'right'}
          image={'/chatting.png'}
          title={'댓글을 통한 메뉴선정'}
          description={[
            '어떤 햄버거를 먹을지, 어떤 치킨을 먹을지',
            '배달메이트가 올린 게시글에 댓글을 달아',
            '구체적인 메뉴에 대해 상의해보세요.',
            ' ',
            '메뉴・역할・가격 등에 대한 합의가 끝났다면,',
            '배달메이트와 함께 음식을 주문하고',
            '맘편히 배달음식을 기다리기만 하면 됩니다!',
          ]}
        />

        <IntroductionMobile />

        {/* <Introduction
          imagePosition={'right'}
          image={'/rating.png'}
          title={'레이팅 시스템'}
          description={[
            '모든 합의가 끝나면 평가하기를 통해',
            '배달메이트에게 점수를 주세요!',
            ' ',
            '해당 점수는 배달메이트의 평점에 반영되며,',
            '평점은 다른 이용자들에게 노출됩니다.',
          ]}
        /> */}

        <Caption />

        <Footer />
      </div>
    </>
  );
};

export default Home;
