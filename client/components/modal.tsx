import axios from 'axios';
import styles from '../styles/Modal.module.css';
import { useRouter } from 'next/router';

axios.defaults.withCredentials = true;
interface propsType {
  setIsModalOpen: Function;
  setSignUpModal?: Function;
  setLoginMessage?: Function;
  type: string;
}

export default function Modal(prop: propsType) {
  const router = useRouter();

  const handleSignout = () => {
    if (typeof document !== 'undefined') {
      const cookieList = document.cookie.split(' ').filter((cookie) => {
        return cookie.includes('accessToken');
      });
      const accessToken = cookieList[0].split('=')[1].replace(';', '');

      axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          prop.setIsModalOpen(false);
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleKakaoLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/kakaoLogin`);
  };

  const handleModal = () => {
    if (!prop.setSignUpModal) {
      prop.setIsModalOpen(false);
    } else if (prop.setSignUpModal) {
      prop.setIsModalOpen(false);
      prop.setSignUpModal(false);
    }
  };

  const handleSignUpModal = () => {
    if (prop.setLoginMessage) {
      prop.setLoginMessage('');
    }
    if (!prop.setSignUpModal) {
      prop.setIsModalOpen(false);
    } else if (prop.setSignUpModal) {
      prop.setIsModalOpen(false);
      prop.setSignUpModal(false);
    }
  };

  if (prop.type === 'modify') {
    return (
      <>
        <div className={styles.change_password_modal_container}>
          <div className={styles.change_password_modal_body}>
            <div className={styles.change_password_modal_description}>
              <span>비밀번호가 변경되었습니다.</span>
            </div>
            <div className={styles.change_password_modal_button_container}>
              <button
                className={styles.change_password_modal_button}
                onClick={handleModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'mypage_kakao_do_modify') {
    return (
      <>
        <div className={styles.change_password_modal_container}>
          <div className={styles.change_password_modal_body}>
            <div className={styles.change_password_modal_description_kakao}>
              <span>카카오 회원은 마이페이지에서</span>
              <span>비밀번호를 변경할 수 없습니다.</span>
            </div>
            <div className={styles.change_password_modal_button_container}>
              <button
                className={styles.change_password_modal_button}
                onClick={handleModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'signout') {
    return (
      <>
        <div className={styles.signout_modal_container}>
          <div className={styles.signout_modal_body}>
            <div className={styles.signout_modal_description}>
              정말 탈퇴하시겠습니까?
            </div>
            <div className={styles.signout_modal_button_container}>
              <button
                className={styles.signout_modal_no_button}
                onClick={handleModal}
              >
                아뇨, 조금 더 이용해볼래요!
              </button>
              <button
                className={styles.signout_modal_yes_button}
                onClick={handleSignout}
              >
                네, 그만 이용하고 싶어요.
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'kakao_login') {
    return (
      <>
        <div className={styles.kakao_login_modal_container}>
          <div className={styles.kakao_login_modal_body}>
            <span
              className={styles.kakao_login_modal_times}
              onClick={() => prop.setIsModalOpen(false)}
            >
              &times;
            </span>
            <div className={styles.kakao_login_modal_description}>
              <span>카카오 로그인을 이용하실 경우,</span>
              <span>이메일 제공에 반드시 동의해주셔야 합니다.</span>
            </div>
            <div className={styles.kakao_login_modal_button_container}>
              <button
                className={styles.kakao_login_modal_button}
                onClick={handleKakaoLogin}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'signup') {
    return (
      <>
        <div className={styles.signup_modal_container}>
          <div className={styles.signup_modal_body}>
            <div className={styles.signup_modal_description}>
              <span>회원가입이 완료되었습니다!</span>{' '}
              <span>로그인해주세요 :)</span>
            </div>
            <div className={styles.signup_modal_button_container}>
              <button
                className={styles.signup_modal_button}
                onClick={handleSignUpModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
