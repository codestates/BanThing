import styles from './Second.module.css';
import { Zoom, Fade, Slide, AttentionSeeker } from 'react-awesome-reveal';

export default function Second(): JSX.Element {
  return (
    <>
      <div className={styles.second_container}>
        <div>
          <img
            src="/worry.png"
            alt="title-image"
            className={styles.second_image}
          />
        </div>

        <div className={styles.second_description_container}>
          <Fade triggerOnce={true} delay={800}>
            <div className={styles.second_description1}>
              <span>1인분만 먹고싶은데 </span>
              <span className={styles.second_description_second_line}>
                주문최소금액이...
              </span>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={1500}>
            <div className={styles.second_description2}>
              <span>주문최소금액을 맞추려면</span>
              <span className={styles.second_description_second_line}>
                2인분은 시켜야하는데...
              </span>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={2200}>
            <div className={styles.second_description3}>
              2인분은 양이 너무 많고...
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={2900}>
            <div className={styles.second_description4}>
              <span>주문최소금액만 맞추면</span>
              <span className={styles.second_description_second_line}>
                배달비가 너무 비싸...
              </span>
            </div>
          </Fade>
        </div>

        {/* <Fade triggerOnce={true} delay={3200}> */}
        <main className={styles.second_title_container}>
          <div className={styles.second_title}>
            <span>주문하기 망설여지는 배달음식</span>
            <span className={styles.drop}></span>
          </div>
        </main>
        {/* </Fade> */}
      </div>
    </>
  );
}
