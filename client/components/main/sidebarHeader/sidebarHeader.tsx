import { useState } from 'react';
import styles from './sideBarHeader.module.css';

type SidebarHeaderType = {
  children: string;
  containerName: string;
  isHost?: boolean;
};

const SidebarHeader = ({
  containerName,
  children,
  isHost,
}: SidebarHeaderType) => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  // 삭제하기 버튼 클릭시 모달을 띄어 줍니다.
  const onClick = () => {
    setHamburger(false);
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;
    removeModal.style.display = 'flex';
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    if (button.value === 'gotoJoinRoom') {
      joinRoom.style.display = 'flex';
      chatRoom.style.display = 'none';
    } else if (button.value === 'gotoCreateRoom') {
      createElement.style.display = 'flex';
      makeRoom.style.display = 'none';
    }
  };
  return (
    <div className={styles.container}>
      {isHost ? (
        <>
          <button
            className={styles.container_button}
            onClick={handleClick}
            value={containerName}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div className={styles.container_container}>
            <h2 className={styles.container_container_h1}>{children}</h2>
          </div>
          {hamburger ? (
            <div className={styles.hamburger_container}>
              <div
                className={styles.hamburger_box}
                onClick={() => setHamburger(false)}
              >
                <span className={styles.hamburger_line1}></span>
                <span className={styles.hamburger_line2}></span>
                <span className={styles.hamburger_line3}></span>
              </div>
            </div>
          ) : (
            <div className={styles.hamburger_container}>
              <div
                className={styles.hamburger_box}
                onClick={() => setHamburger(true)}
              >
                <span className={styles.hamburger_line}></span>
                <span className={styles.hamburger_line}></span>
                <span className={styles.hamburger_line}></span>
              </div>
            </div>
          )}
          {hamburger ? (
            <div className={styles.hamburger_nav_container}>
              <nav className={styles.hamburger_nav_login_true}>
                <button className={styles.hamburger_nav_menu} onClick={onClick}>
                  삭제하기
                </button>
              </nav>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <button
            className={styles.container_button}
            onClick={handleClick}
            value={containerName}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div className={styles.container_container}>
            <h2 className={styles.container_container_h1}>{children}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarHeader;
