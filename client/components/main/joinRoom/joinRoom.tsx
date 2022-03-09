import styles from './joinRoom.module.css';
import buttonStyle from '../button.module.css';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import PleaseLogIn from '../pleaseLogIn/pleaseLogIn';
axios.defaults.withCredentials = true;

interface roomData {
  data: {
    post: {
      category: string;
      content: string;
      host_nickname: string;
      host_role: number;
      id: number;
      title: string;
    };
  };
}
interface roomsIdType {
  roomsId: number;
  setroomTitle: Dispatch<SetStateAction<string>>;
  setUsersChats: Dispatch<SetStateAction<usersChats | undefined>>;
  setroomHostNickName: Dispatch<SetStateAction<string>>;
}
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
const JoinRoom = ({
  setUsersChats,
  roomsId,
  setroomTitle,
  setroomHostNickName,
}: roomsIdType) => {
  const [data, setData] = useState<roomData>();
  const [chats, setChats] = useState<usersChats>();
  const [isLogIn, setIsLogIn] = useState(true);

  // 글에 대한 정보를 불러와 JoinRoom에 반영합니다.
  useEffect(() => {
    const getPosts = async () => {
      try {
        if (roomsId !== 0) {
          axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/main`, {
              id: roomsId,
            })
            .then((response) => {
              setData(response.data);
            });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [roomsId]);

  // 유저의 채팅과 글의 제목, 방을 만든 사람의 닉네임을 반영합니다.
  useEffect(() => {
    // 채팅이 있을 경우 부모 컴포넌트에 채팅들을 전해줍니다.
    if (chats) {
      setUsersChats(chats);
    }

    // 데이터가 있을 경우 부모 컴포넌트에 title과 hostName을 전해줍니다.
    if (data) {
      setroomTitle(data.data.post.title);
      setroomHostNickName(data.data.post.host_nickname);
    }
  }, [chats, data]);

  // 방 참가 버튼 클릭시 해당 post.id에 대한 덧글들을 불러옵니다.
  const onClick = () => {
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    let cookie: any;
    let cookieToken: any;
    if (typeof window !== 'undefined' && data) {
      cookie = document.cookie;
      if (cookie.includes(';') && cookie.includes('accessToken')) {
        const cookieList = cookie.split(';');
        const findAccessToken = cookieList.filter((cookie: string) => {
          return cookie.includes('accessToken');
        });
        cookieToken = findAccessToken[0].split('=')[1];
      } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
        cookieToken = cookie.split('=')[1];
      }
      if (cookieToken) {
        const getPosts = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${cookieToken}`,
            };
            const response: AxiosResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply/${data.data.post.id}`,
              {
                headers,
              },
            );
            setChats(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        getPosts();
        joinRoom.style.display = 'none';
        chatRoom.style.display = 'flex';
      } else {
        setIsLogIn(false);
      }
    }
  };

  // map.tsx에서 받아온 정보중 카테고리만 불러와 이미지를 렌더링 합니다.
  const rendering = () => {
    if (data) {
      const { category } = data.data.post;
      if (category === '피자') {
        return <img src="/image/pizza.png" alt="" className={styles.image} />;
      } else if (category === '치킨') {
        return <img src="/image/chicken.png" alt="" className={styles.image} />;
      } else if (category === '햄버거') {
        return (
          <img src="/image/hamburger.png" alt="" className={styles.image} />
        );
      } else if (category === '한식') {
        return <img src="/image/rice.png" alt="" className={styles.image} />;
      } else if (category === '자장면') {
        return (
          <img src="/image/chNoodles.png" alt="" className={styles.image} />
        );
      } else if (category === '커피*디저트') {
        return <img src="/image/coffee.png" alt="" className={styles.image} />;
      } else if (category === '도시락') {
        return (
          <img src="/image/lunchBox.png" alt="" className={styles.image} />
        );
      } else if (category === '일식') {
        return <img src="/image/sushi.png" alt="" className={styles.image} />;
      } else if (category === '분식') {
        return (
          <img src="/image/tteokbokki.png" alt="" className={styles.image} />
        );
      }
    }
  };

  return (
    <section id="JoinRoom" className={styles.JoinRoom}>
      {data ? (
        <>
          <section className={styles.joinRoom_profile}>
            {rendering()}
            <h1 className={styles.h1}>{data.data.post.host_nickname}</h1>
          </section>
          <article className={styles.article}>
            <section className={styles.JoinRoom_title}>
              <div className={styles.div}>
                <h3 className={styles.h3}>제목</h3>
                <h3 className={styles.h3}>카테고리</h3>
                <h3 className={styles.h3}>역할</h3>
                <h3 className={styles.h3}>내용</h3>
              </div>
              <div className={styles.div}>
                <p className={styles.p}>{data.data.post.title}</p>
                <p className={styles.p}>{data.data.post.category}</p>
                {data.data.post.host_role === 1 ? (
                  <p className={styles.p}>받는 사람</p>
                ) : (
                  <p className={styles.p}>가지러 가는 사람</p>
                )}
                <p> </p>
              </div>
            </section>
            <section>
              <p className={styles.joinRoom_content_p}>
                {data.data.post.content}
              </p>
            </section>
          </article>
          <section className={buttonStyle.button_container}>
            <button className={buttonStyle.button} onClick={onClick}>
              참여하기
            </button>
          </section>
          {isLogIn ? <></> : <PleaseLogIn setIsLogIn={setIsLogIn} />}
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default JoinRoom;
