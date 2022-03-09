import styles from '../styles/Login.module.css';
import SignUp from './signup';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from './modal';

axios.defaults.withCredentials = true;
interface propsType {
  loginModal: boolean;
  setLoginModal: Function;
  setIsLogin: Function;
}

export default function Login(prop: propsType) {
  const router = useRouter();

  const [signUpModal, setSignUpModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const [kakaoModal, setKakaoModal] = useState(false);

  const openSignUpModal = () => {
    setSignUpModal(true);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginByKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (userId === '' || password === '') {
      setLoginMessage('아이디와 비밀번호를 모두 입력해주세요.');
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/login`, {
          user_id: userId,
          password: password,
        })
        .then((response) => {
          prop.setIsLogin(true);
          prop.setLoginModal(false);
        })
        .catch((error) => {
          if (error)
            setLoginMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
        });
    }
  };

  const handleKakaoModal = () => {
    let inner;
    const cookie = document.cookie;
    if (cookie.includes('inner')) {
      if (cookie.includes(';')) {
        const cookieList = cookie.split(';');
        const findInner = cookieList.filter((cookie: any) => {
          return cookie.includes('inner');
        });
        inner = findInner[0].split('=')[1];
      } else {
        inner = cookie.split('=')[1];
      }
    } else {
      inner = '';
    }

    if (inner === 'true') {
      router.push(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/kakaoLogin`,
      );
    } else {
      setKakaoModal(true);
    }
  };

  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_modal}>
          <span
            className={styles.login_times}
            onClick={() => prop.setLoginModal(false)}
          >
            &times;
          </span>
          <div className={styles.login_title}>
            <img
              className={styles.login_title_logo}
              src="/banthing.png"
              alt="BanThing Logo"
            />
          </div>
          <input
            className={styles.login_input_box}
            placeholder="아이디"
            onChange={handleUserId}
            onKeyUp={handleLoginByKey}
          ></input>
          <input
            className={styles.login_input_box}
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
            onKeyUp={handleLoginByKey}
          ></input>
          <span className={styles.login_error}>{loginMessage}</span>
          <button className={styles.login_button} onClick={handleLogin}>
            <img
              src="/login.png"
              alt="login-icon"
              className={styles.login_icon}
            />
            <span>로그인</span>
          </button>

          <button
            className={styles.login_kakao_button}
            onClick={handleKakaoModal}
          >
            <div>
              <img
                src="/kakao.png"
                alt="kakao-logo"
                className={styles.login_kakao_logo}
              />
              <span>로그인</span>
            </div>
          </button>

          <div className={styles.login_description}>
            계정이 없으신가요?{' '}
            <span
              className={styles.login_signup}
              onClick={() => openSignUpModal()}
            >
              회원가입 하기
            </span>
          </div>
        </div>

        <div
          className={styles.login_background}
          onClick={() => prop.setLoginModal(false)}
        ></div>

        {signUpModal ? (
          <>
            <SignUp
              signUpModal={signUpModal}
              setSignUpModal={setSignUpModal}
              setIsLogin={prop.setIsLogin}
            />
          </>
        ) : (
          <></>
        )}

        {kakaoModal ? (
          <Modal setIsModalOpen={setKakaoModal} type={'kakao_login'} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
