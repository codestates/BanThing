import { useEffect, useState } from 'react';
import styles from './chat.module.css';

export interface chatType {
  chats: string;
  owner: boolean;
  nickname: string;
  time: string;
}

const Chat = ({ nickname, owner, chats, time }: chatType) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const clock = new Date(Date.parse(time));

  // 덧글을 입력할 떄 입력한 시간을 반영해줍니다.
  useEffect(() => {
    setMinute(String(clock.getMinutes()));
    setHour(String(clock.getHours()));

    if (clock.getMinutes() < 10) {
      setMinute('0' + minute);
    } else if (clock.getHours() < 10) {
      setHour('0' + hour);
    }
  }, [clock.getMinutes(), clock.getHours()]);

  return (
    <ul className={styles.chatting_list}>
      {!owner ? (
        <li className={styles.chatting_list__li}>
          <img
            className={styles.image}
            src="https://cdn.discordapp.com/attachments/934007459763326976/944397124114722826/unknown.png"
            alt=""
          />
          <div>
            <span className={styles.message__author}>{nickname}</span>
            <div className={styles.message__info}>
              <span className={styles.message__bubble}>{chats}</span>
              <span>
                {hour}:{minute}
              </span>
            </div>
          </div>
        </li>
      ) : (
        <li className={styles.sent}>
          <div className="message-row--own message-row__content message__info">
            <span>
              {hour}:{minute}
            </span>
            <span className={styles.message__bubble__user}>{chats}</span>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Chat;
