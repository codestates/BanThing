import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import styles from '../styles/SignUp.module.css';
import Modal from './modal';

axios.defaults.withCredentials = true;

interface propsType {
  signUpModal: boolean;
  setSignUpModal: Function;
  setIsLogin?: Function;
}

export default function SignUp(prop: propsType) {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;
  const isRightNickname = /^[가-힣a-zA-Z0-9]{3,8}$/;

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [correctUserId, setCorrectUserId] = useState(true);
  const [correctNickname, setCorrectNickname] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [correctCheckPassword, setCorrectCheckPassword] = useState(true);

  const [doubleCheckUserId, setDoubleCheckUserId] = useState(false);
  const [doubleCheckNickname, setDoubleCheckNickname] = useState(false);

  const [idMessage, setIdMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectUserId(true);
    setDoubleCheckUserId(false);
    setUserId(event.target.value);
  };

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectNickname(true);
    setDoubleCheckNickname(false);
    setNickname(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectPassword(true);
    setPassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectCheckPassword(true);
    setCheckPassword(event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'id') {
      if (!value) {
        setIdMessage('필수 정보입니다.');
        setCorrectUserId(false);
        setDoubleCheckUserId(false);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setIdMessage('4~10자 영어 소문자, 숫자를 사용하세요.');
        setCorrectUserId(false);
        setDoubleCheckUserId(false);
      } else {
        setCorrectUserId(true);
      }
    }

    if (type === 'nickname') {
      if (!value) {
        setNicknameMessage('필수 정보입니다.');
        setCorrectNickname(false);
        setDoubleCheckNickname(false);
      } else if (!isRightNickname.test(value)) {
        setNicknameMessage('3~8자 한글, 영문, 숫자를 사용하세요.');
        setCorrectNickname(false);
        setDoubleCheckNickname(false);
      } else {
        setCorrectNickname(true);
      }
    }

    if (type === 'password') {
      if (!value) {
        setPasswordMessage('필수 정보입니다.');
        setCorrectPassword(false);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setPasswordMessage('4~10자 영어 소문자, 숫자를 사용하세요.');
        setCorrectPassword(false);
      } else {
        setCorrectPassword(true);
      }
    }

    if (type === 'check_password') {
      if (!value) {
        setCheckPasswordMessage('필수 정보입니다.');
        setCorrectCheckPassword(false);
      } else if (password !== checkPassword) {
        if (password === '' || !correctPassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCheckPasswordMessage('비밀번호가 일치하지 않습니다.');
          setCorrectCheckPassword(false);
        }
      } else if (password === checkPassword) {
        if (!correctPassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCorrectCheckPassword(true);
        }
      }
    }
  };

  const handleCheckId = () => {
    if (userId === '') {
      setIdMessage('필수 정보입니다.');
      setCorrectUserId(false);
    } else if (userId !== '' && correctUserId) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signup/id`,
          { user_id: userId },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          setDoubleCheckUserId(true);
        })
        .catch((error) => {
          setIdMessage('이미 존재하는 아이디입니다.');
          setDoubleCheckUserId(false);
          setCorrectUserId(false);
        });
    }
  };

  const handleCheckNickname = () => {
    if (nickname === '') {
      setNicknameMessage('필수 정보입니다.');
      setCorrectNickname(false);
    } else if (nickname !== '' && correctNickname) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signup/nickname`,
          { nickname: nickname },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          setDoubleCheckNickname(true);
        })
        .catch((error) => {
          setNicknameMessage('이미 존재하는 닉네임입니다.');
          setDoubleCheckNickname(false);
          setCorrectNickname(false);
        });
    }
  };

  const handleSignUp = () => {
    if (
      userId === '' ||
      nickname === '' ||
      password === '' ||
      checkPassword === ''
    ) {
      if (userId === '') {
        setIdMessage('필수 정보입니다.');
        setCorrectUserId(false);
      }
      if (nickname === '') {
        setNicknameMessage('필수 정보입니다.');
        setCorrectNickname(false);
      }
      if (password === '') {
        setPasswordMessage('필수 정보입니다.');
        setCorrectPassword(false);
      }
      if (checkPassword === '') {
        setCheckPasswordMessage('필수 정보입니다.');
        setCorrectCheckPassword(false);
      }
    } else if (
      correctUserId &&
      correctNickname &&
      correctPassword &&
      correctCheckPassword
    ) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signup`,
          { user_id: userId, password: password, nickname: nickname },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className={styles.signup_modal}>
        <span
          className={styles.signup_times}
          onClick={() => prop.setSignUpModal(false)}
        >
          &times;
        </span>
        <div className={styles.signup_title}>
          <img
            className={styles.signup_title_logo}
            src="/banthing.png"
            alt="BanThing Logo"
          />
        </div>
        <div className={styles.signup_id_name_container}>
          <input
            id="id"
            className={styles.signup_input_box_1}
            placeholder="아이디"
            onChange={handleUserId}
            onBlur={handleBlur}
          />
          <button
            className={styles.signup_double_check_button}
            onClick={handleCheckId}
          >
            중복확인
          </button>
        </div>
        {correctUserId ? (
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{idMessage}</span>
        )}
        {doubleCheckUserId ? (
          <span className={styles.signup_solved_id}>
            사용가능한 아이디입니다.
          </span>
        ) : (
          <></>
        )}
        <div className={styles.signup_id_name_container}>
          <input
            id="nickname"
            className={styles.signup_input_box_1}
            placeholder="닉네임"
            onChange={handleNickname}
            onBlur={handleBlur}
          />
          <button
            className={styles.signup_double_check_button}
            onClick={handleCheckNickname}
          >
            중복확인
          </button>
        </div>
        {correctNickname ? (
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{nicknameMessage}</span>
        )}
        {doubleCheckNickname ? (
          <span className={styles.signup_solved_nickname}>
            사용가능한 닉네임입니다.
          </span>
        ) : (
          <></>
        )}
        <input
          id="password"
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 입력"
          onChange={handlePassword}
          onBlur={handleBlur}
        />
        {correctPassword ? (
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{passwordMessage}</span>
        )}
        <input
          id="check_password"
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 확인"
          onChange={handleCheckPassword}
          onBlur={handleBlur}
        />
        {correctCheckPassword ? (
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{checkPasswordMessage}</span>
        )}
        <button className={styles.signup_button} onClick={handleSignUp}>
          <img
            src="/signup.png"
            alt="signup-icon"
            className={styles.signup_icon}
          />
          <span>회원가입</span>
        </button>
      </div>

      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setSignUpModal={prop.setSignUpModal}
          type="signup"
        />
      ) : (
        <></>
      )}
    </>
  );
}
