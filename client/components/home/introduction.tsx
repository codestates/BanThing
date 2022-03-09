import styles from '../../styles/Home.module.css';
import { Zoom, Fade, Slide } from 'react-awesome-reveal';

interface propsType {
  imagePosition: string;
  image: string;
  title: string;
  description: Array<string>;
}

export default function Introduction(props: propsType): JSX.Element {
  if (props.imagePosition === 'left') {
    return (
      <>
        <div className={styles.introduction_container_right}>
          <Zoom triggerOnce={true} duration={1800}>
            <div>
              <img
                src={props.image}
                alt="title-image"
                className={styles.introduction_image}
              />
            </div>
          </Zoom>

          <main className={styles.introduction_main_right}>
            <span className={styles.introduction_main_number}>01</span>
            <Slide
              triggerOnce={true}
              delay={200}
              direction={'up'}
              duration={900}
            >
              <div className={styles.introduction_title_right}>
                <span>{props.title}</span>
              </div>
            </Slide>
            <span className={styles.introduction_main_line}>
              ─────────── * ───────────
            </span>
            <Fade triggerOnce={true} delay={900}>
              <div className={styles.introduction_description_right}>
                {props.description.map((list, index) => {
                  if (list === ' ') {
                    return (
                      <div key={index} className={styles.introduction_space}>
                        _
                      </div>
                    );
                  } else {
                    return <div key={index}>{list}</div>;
                  }
                })}
              </div>
            </Fade>
          </main>
        </div>
      </>
    );
  } else if (props.imagePosition === 'right') {
    return (
      <>
        <div className={styles.introduction_container_left}>
          <main className={styles.introduction_main_left}>
            <span className={styles.introduction_main_number}>02</span>
            <Slide
              triggerOnce={true}
              delay={200}
              direction={'up'}
              duration={900}
            >
              <div className={styles.introduction_title_left}>
                <span>{props.title}</span>
              </div>
            </Slide>
            <span className={styles.introduction_main_line}>
              ─────────── * ───────────
            </span>
            <Fade triggerOnce={true} delay={900}>
              <div className={styles.introduction_description_left}>
                {props.description.map((list, index) => {
                  if (list === ' ') {
                    return (
                      <div key={index} className={styles.introduction_space}>
                        _
                      </div>
                    );
                  } else {
                    return <div key={index}>{list}</div>;
                  }
                })}
              </div>
            </Fade>
          </main>

          <Zoom triggerOnce={true} duration={1800}>
            <div>
              <img
                src={props.image}
                alt="title-image"
                className={styles.introduction_image}
              />
            </div>
          </Zoom>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
