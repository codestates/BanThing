import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Zoom, Fade } from 'react-awesome-reveal';

export default function Caption() {
  return (
    <>
      <div className={styles.caption_container}>
        <Zoom triggerOnce={true} delay={500}>
          <img
            src="/gotit.png"
            alt="title-image"
            className={styles.caption_image}
          />
        </Zoom>
        <Fade triggerOnce={true} delay={700}>
          <div className={styles.caption_description}>
            그럼, <span className={styles.orange}>반띵</span>하러 가볼까요?
          </div>
        </Fade>
        <Fade triggerOnce={true} delay={1000}>
          <Link href="/main">
            <button className={styles.caption_button}>
              <span>시작하기</span>
            </button>
          </Link>
        </Fade>
      </div>
    </>
  );
}
