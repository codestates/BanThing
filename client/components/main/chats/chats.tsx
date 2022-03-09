import { useEffect, useState } from 'react';
import styles from './chats.module.css';
import Chat from '../chat/chat';
import NewChat from '../newChat/newChat';

interface usersChats {
  data: {
    replyLog: [
      {
        id: number;
        nickname: string;
        post_id: number;
        reply: string;
        time: string;
      },
    ];
  };
}
interface ChatsType {
  addable: boolean;
  roomsId: number;
  usersChats: usersChats | undefined;
  usernickname: string;
}

const Chats = ({ usersChats, roomsId, addable, usernickname }: ChatsType) => {
  const [userchat, setChat] = useState<string[]>([]);

  // joinRoom에서 받아온 방의 채팅과 유저가 보는 채팅을 push해줍니다.
  const onCreated = (chat: string) => {
    usersChats?.data.replyLog.push({
      id: usersChats?.data.replyLog.length + 1,
      nickname: usernickname,
      post_id: 1,
      reply: chat,
      time: String(new Date()),
    });
    setChat((chats) => [...chats, chat]);
  };

  // 최신 덧글을 포커스 하기 위한 useEffect입니다.
  useEffect(() => {
    const chatContainer = document.querySelector(
      '#chat-Container',
    )! as HTMLElement;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, [userchat.length]);

  return (
    <>
      <section className={styles.chat_container} id={'chat-Container'}>
        {usersChats?.data.replyLog ? (
          usersChats?.data.replyLog.map((chat) => (
            <Chat
              key={chat.id}
              owner={usernickname === chat.nickname}
              chats={chat.reply}
              nickname={chat.nickname}
              time={chat.time}
            />
          ))
        ) : (
          <></>
        )}
      </section>
      <div className={styles.div}>
        {addable && <NewChat onCreated={onCreated} roomsId={roomsId} />}
      </div>
    </>
  );
};

export default Chats;
