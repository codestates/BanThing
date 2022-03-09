import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Admin.module.css';

axios.defaults.withCredentials = true;

const Admin: NextPage = () => {
  const router = useRouter();
  const { isAdmin } = router.query;
  const [userlist, setUserlist] = useState([]);

  const handleDelete = (e: any) => {
    const nicknameToDelete = e.target.parentNode.lastChild.textContent;
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin/${nicknameToDelete}`,
      )
      .then(() => handleRefresh())
      .catch(console.log);
  };

  const handleRefresh = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`)
      .then((data) => {
        setUserlist(() => data.data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.container_container}>
          {isAdmin ? (
            <>
              <div className={styles.container_title}>가입한 유저 목록</div>
              <ul className={styles.container_ul}>
                {userlist.map((el) => {
                  const { nickname, auth, isAdmin } = el;
                  if (isAdmin) return; // 어드민 계정은 렌더링하지 않음
                  return (
                    <li key={nickname} className={styles.container_li}>
                      <div
                        onClick={handleDelete}
                        className={styles.container_button}
                      >
                        BAN
                      </div>
                      <img
                        className={styles.container_image}
                        src={auth === 'kakao' ? '/kakaoicon.png' : '/icon.ico'}
                        alt="auth"
                      />
                      <div className={styles.container_nickname}>
                        {nickname}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <img
                className={styles.question}
                src="/image/question_mark.png"
                alt="unauthorized"
              />
              <span className={styles.span}>잘못된 접근입니다.</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
