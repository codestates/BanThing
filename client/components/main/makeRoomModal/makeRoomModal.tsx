import { Dispatch, SetStateAction } from 'react';
import styles from '../../../styles/main/Rate.module.css';
import buttonStyle from '../button.module.css';

interface makeRoomState {
  setMakeRoomModal: Dispatch<SetStateAction<boolean>>;
}

export default function MakeRoomModal({ setMakeRoomModal }: makeRoomState) {
  // 확인 버튼 클릭시 모달이 닫히게 하는 기능
  const onClick = () => {
    setMakeRoomModal(false);
  };
  return (
    <section className={styles.makeRoomModal__section} id="makeModal">
      <form className={styles.rate_modal}>
        <section className={styles.rate_title}>
          <img
            className={styles.makeRoom_image}
            src="/image/please_write.png"
            alt="please_write"
          />
          <h1 className={styles.rate_h1}>내용을 모두 입력해주세요</h1>
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
