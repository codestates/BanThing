import SidebarHeader from '../sidebarHeader/sidebarHeader';
import buttonStyle from '../button.module.css';
import styles from './makeRoom.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MakeRoomModal from '../makeRoomModal/makeRoomModal';
import PleaseLogIn from '../pleaseLogIn/pleaseLogIn';

interface locationType {
  location: number[];
  setMakeRoom_MapRoomId: (value: number) => void;
}

const MakeRoom = ({ location, setMakeRoom_MapRoomId }: locationType) => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('');
  const [textarea, setTextarea] = useState('');
  const [radio, setRadio] = useState('');
  const [makeRoomId, setMakeRoomId] = useState(0);
  const [makeRoomModal, setMakeRoomModal] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  useEffect(() => {
    if (makeRoomId !== 0) {
      setMakeRoom_MapRoomId(makeRoomId);
    }
  }, [makeRoomId]);
  // 카테고리를 선택합니다.
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSelect(value);
  };

  // 제목을 입력하는 함수
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  // 내용을 입력하는 함수
  const textareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setTextarea(event.target.value);
  };

  // 음식을 고르는 카테고리
  const radioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setRadio(event.target.value);
  };

  const data = [
    title,
    select,
    textarea,
    Number(radio),
    String(location[0]),
    String(location[1]),
  ];

  // 방을 만드는 요청
  const axiosPost = () => {
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
        // 토큰이 있을 경우 요청을 보냅니다.
        const headers = {
          Authorization: `Bearer ${cookieToken}`,
        };
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post`,
            {
              title: data[0],
              category: data[1],
              content: data[2],
              host_role: data[3],
              location_latitude: data[4],
              location_longitude: data[5],
            },
            {
              headers,
              withCredentials: true,
            },
          )
          .then((res) => {
            setMakeRoomId(res.data.data.post_id);
          });

        // 방만들기의 값들을 초기화
        setSelect('');
        setTitle('');
        setTextarea('');
        setRadio('');
        const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
        const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
        makeRoom.style.display = 'none';
        joinRoom.style.display = 'flex';
      } else {
        setIsLogIn(false);
      }
    }
  };

  // 클릭시 방을 만드는 요청을 보내는 함수
  const onClick = () => {
    if (
      title === '' ||
      select === '' ||
      textarea === '' ||
      Number(radio) === 0 ||
      String(location[0]) === '0' ||
      String(location[1]) === '0'
    ) {
      // 유효성 검사를 통과 못할 경우 makeRoomModal이 켜집니다.
      setMakeRoomModal(true);
    } else {
      axiosPost();
    }
  };

  return (
    <section id="MakeRoom" className={styles.MakeRoom}>
      <SidebarHeader containerName={'gotoCreateRoom'}>방 만들기</SidebarHeader>
      <main className={styles.main}>
        <section className={styles.section_flex}>
          <h1 className={styles.h1}>제목</h1>
          <input
            type="text"
            onChange={inputChange}
            value={title}
            className={styles.section_flex_input}
          />
        </section>
        <section className={styles.section_flex}>
          <h1 className={styles.h1}>카테고리</h1>
          <select
            id="choise-foods"
            onChange={selectChange}
            value={select}
            className={styles.section_flex_select}
          >
            <option value=""></option>
            <option value="치킨">치킨</option>
            <option value="햄버거">햄버거</option>
            <option value="피자">피자</option>
            <option value="자장면">자장면</option>
            <option value="커피*디저트">커피*디저트</option>
            <option value="도시락">도시락</option>
            <option value="한식">한식</option>
            <option value="일식">일식</option>
            <option value="분식">분식</option>
          </select>
        </section>
        <section className={styles.host_roll}>
          <h1 className={styles.h1}>역할</h1>
          <select
            id="choise-foods"
            className={styles.host_roll_select}
            onChange={(event) => radioChange(event)}
            value={radio}
          >
            <option value=""></option>
            <option value="1">받는 사람</option>
            <option value="2">가지러 가는 사람</option>
          </select>
        </section>
        <section className={styles.section_content}>
          <h1 className={styles.h1}>내용</h1>
          <textarea
            className={styles.content_textarea}
            onChange={textareaChange}
            value={textarea}
          />
        </section>
      </main>
      <section className={buttonStyle.button_container}>
        <button className={buttonStyle.button} onClick={onClick}>
          만들기
        </button>
      </section>
      {isLogIn ? <></> : <PleaseLogIn setIsLogIn={setIsLogIn} />}
      {makeRoomModal ? (
        <MakeRoomModal setMakeRoomModal={setMakeRoomModal} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default MakeRoom;
