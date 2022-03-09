import styles from './IntroductionMobile.module.css';
import { Zoom, Fade, Slide } from 'react-awesome-reveal';

export default function Introduction(): JSX.Element {
  return (
    <>
      <div className={styles.introduction_container_right}>
        <Zoom triggerOnce={true} duration={1800}>
          <div>
            <img
              src="/foodmate.png"
              alt="title-image"
              className={styles.introduction_image}
            />
          </div>
        </Zoom>

        <main className={styles.introduction_main_right}>
          <span className={styles.introduction_main_number}>01</span>
          <Slide triggerOnce={true} delay={200} direction={'up'} duration={900}>
            <div className={styles.introduction_title_right}>
              <span>내 주변의 배달메이트</span>
            </div>
          </Slide>
          <span className={styles.introduction_main_line}>
            ─────────── * ───────────
          </span>
          <Fade triggerOnce={true} delay={900}>
            <div className={styles.introduction_description_right}>
              <div>마침 배달음식을 시켜먹고 싶은데</div>
              <div>배달비도 최저금액도 함께 나눌 수 있는</div>
              <div>내 주변의 배달메이트를 반띵에서 찾아보세요!</div>
              <div className={styles.introduction_space}>_</div>
              <div>지도상에서 현재 나의 위치를 기반으로</div>
              <div>내 주변의 배달메이트들이 올린</div>
              <div>반띵 게시글들을 확인할 수 있습니다.</div>
            </div>
          </Fade>
        </main>
      </div>

      <div className={styles.introduction_container_right}>
        <Zoom triggerOnce={true} duration={1800}>
          <div>
            <img
              src="/chatting.png"
              alt="title-image"
              className={styles.introduction_image}
            />
          </div>
        </Zoom>

        <main className={styles.introduction_main_right}>
          <span className={styles.introduction_main_number}>02</span>
          <Slide triggerOnce={true} delay={200} direction={'up'} duration={900}>
            <div className={styles.introduction_title_right}>
              <span>댓글을 통한 메뉴선정</span>
            </div>
          </Slide>
          <span className={styles.introduction_main_line}>
            ─────────── * ───────────
          </span>
          <Fade triggerOnce={true} delay={900}>
            <div className={styles.introduction_description_right}>
              <div>어떤 햄버거를 먹을지, 어떤 치킨을 먹을지</div>
              <div>배달메이트가 올린 게시글에 댓글을 달아</div>
              <div>구체적인 메뉴에 대해 상의해보세요.</div>
              <div className={styles.introduction_space}>_</div>
              <div>메뉴・역할・가격 등에 대한 합의가 끝났다면,</div>
              <div>배달메이트와 함께 음식을 주문하고</div>
              <div>맘편히 배달음식을 기다리기만 하면 됩니다!</div>
            </div>
          </Fade>
        </main>
      </div>
    </>
  );
}
