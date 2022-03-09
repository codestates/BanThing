import { Dispatch, SetStateAction } from 'react';
import styles from '../../../styles/main/Rate.module.css';
import buttonStyle from '../button.module.css';

interface makeRoomState {
  setIsLogIn: Dispatch<SetStateAction<boolean>>;
}

export default function PleaseLogIn({ setIsLogIn }: makeRoomState) {
  // 확인 버튼 클릭시 모달이 닫히게 하는 기능
  const onClick = () => {
    setIsLogIn(true);
  };
  return (
    <section className={styles.makeRoomModal__section} id="makeModal">
      <form className={styles.rate_modal}>
        <section className={styles.rate_title}>
          <img
            className={styles.isLogin_image}
            src="/image/yellow_light_bulb.png"
            alt=""
          />
          <h1 className={styles.rate_h1}>로그인 해주세요</h1>
        </section>

        <section className={buttonStyle.button_container}>
          <button className={buttonStyle.button} onClick={onClick}>
            확인
          </button>
        </section>
      </form>
    </section>
  );
}
