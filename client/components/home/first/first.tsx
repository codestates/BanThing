import Link from 'next/link';
import styles from './First.module.css';
import { Zoom, Fade } from 'react-awesome-reveal';

export default function First() {
  return (
    <>
      <div className={styles.title_container}>
        <main className={styles.main}>
          <Zoom triggerOnce={true} delay={150}>
            <div className={styles.title_title}>
              <img
                className={styles.title_logo}
                src="/banthing.png"
                alt="BanThing Logo"
              />
            </div>
          </Zoom>
          <Fade triggerOnce={true} delay={1000}>
            <div className={styles.title_description}>
              <div>함께하는 배달 주문으로</div>
              <span>부담을 </span>
              <span className={styles.orange}>반띵</span>
              <span>해보세요.</span>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={1600}>
            <Link href="/main">
              <button className={styles.title_button}>
                <span>시작하기</span>
              </button>
            </Link>
          </Fade>
        </main>
        <Fade triggerOnce={true} duration={1200}>
          <div className={styles.title_image_container}>
            <img
              src="/use1.gif"
              alt="title-image"
              className={styles.title_image}
            />
          </div>
        </Fade>
        <Fade triggerOnce={true} delay={1600}>
          <Link href="/main">
            <button className={styles.title_button_mobile}>
              <span>시작하기</span>
            </button>
          </Link>
        </Fade>
      </div>
    </>
  );
}
