import axios from 'axios';
import styles from '../../../styles/main/Rate.module.css';
import buttonStyle from '../button.module.css';

interface removeRoomId {
  removeRoomId: number;
}

export default function RemoveModal({ removeRoomId }: removeRoomId) {
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  // 삭제요청
  const onClick = () => {
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;

    chatRoom.style.display = 'none';
    removeModal.style.display = 'none';
    createElement.style.display = 'flex';

    let cookie: any;
    let cookieToken: any;
    let cookieList: any;
    if (typeof window !== 'undefined') {
      cookie = document.cookie;
      if (cookie.includes(';') && cookie.includes('accessToken')) {
        cookieList = cookie.split(';');
        const findAccessToken = cookieList.filter((cookie: any) => {
          return cookie.includes('accessToken');
        });
        cookieToken = findAccessToken[0].split('=')[1];
      } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
        cookieToken = cookie.split('=')[1];
      }
      const headers = {
        Authorization: `Bearer ${cookieToken}`,
      };
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/deletePost/${removeRoomId}`,
          {
            headers,
          },
        )
        .then(() => {
          location.reload();
        });
    }
  };
  // 뒤로가기 클릭
  const backClick = () => {
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;

    removeModal.style.display = 'none';
  };
  return (
    <>
      <section className={styles.removeModal__section} id="removeModal">
        <form className={styles.rate_modal} onSubmit={onSubmit}>
          <section className={styles.rate_title}>
            <img
              className={styles.remove_image}
              src="/image/question_mark.png"
              alt=""
            />
            <h1>정말 삭제하시겠습니까?</h1>
          </section>
          <section className={buttonStyle.button_removeModal_container}>
            <button
              className={buttonStyle.button_removeModal}
              onClick={onClick}
            >
              삭제하기
            </button>
            <button
              className={buttonStyle.button_removeModal}
              onClick={backClick}
            >
              뒤로가기
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
