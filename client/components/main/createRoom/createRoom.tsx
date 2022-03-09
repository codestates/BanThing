import buttonStyles from '../button.module.css';
import styles from './createRoom.module.css';

const CreateRoom = () => {
  // CreateRoom component를 끄고 makeRoom component를 flex시킵니다.
  const onClick = () => {
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    createElement.style.display = 'none';
    makeRoom.style.display = 'flex';
  };
  return (
    <section id="CreateRoom" className={styles.createRoom}>
      <img
        src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
        alt=""
        className={styles.image}
      />
      <p className={styles.p}>원하는 마크를 선택하거나 방을 만들어주세요.</p>
      <div className={buttonStyles.button_container}>
        <button className={buttonStyles.button} onClick={onClick}>
          방 만들기
        </button>
      </div>
    </section>
  );
};

export default CreateRoom;
