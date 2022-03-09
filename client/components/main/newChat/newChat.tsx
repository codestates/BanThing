import axios from 'axios';
import styles from './newChat.module.css';
import { useState } from 'react';

interface newChatType {
  roomsId: number;
  onCreated: (chat: string) => void;
}

const NewChat = ({ roomsId, onCreated }: newChatType) => {
  const [chat, setChat] = useState('');
  // 방의 아이디와 덧글을 포함하여 post합니다.
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (chat !== '') {
      let cookie: any;
      let cookieToken: any;
      let cookieList: any;
      if (typeof window !== 'undefined') {
        cookie = document.cookie;
        if (cookie.includes(';') && cookie.includes('accessToken')) {
          cookieList = cookie.split(';');
          const findAccessToken = cookieList.filter((cookie: string) => {
            return cookie.includes('accessToken');
          });
          cookieToken = findAccessToken[0].split('=')[1];
        } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
          cookieToken = cookie.split('=')[1];
        }
        if (cookieToken) {
          const headers = {
            Authorization: `Bearer ${cookieToken}`,
          };
          axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply`,
            {
              post_id: roomsId,
              reply: chat,
            },
            {
              headers,
              withCredentials: true,
            },
          );
        }
      }
      // chats에 입력한 값을 전해줍니다.
      onCreated(chat);
    }
    // input의 값을 초기화 합니다.
    setChat('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };
  return (
    <>
      <form className={styles.reply__column} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          onChange={onChange}
          value={chat}
        />
        <button className={styles.input_button}>Enter</button>
      </form>
    </>
  );
};

export default NewChat;
