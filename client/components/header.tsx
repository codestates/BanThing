import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Login from './login';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
interface propsType {
  isLogin: boolean;
  setIsLogin: Function;
}

export default function Header(prop: propsType) {
  const [loginModal, setLoginModal] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  const openLoginModal = () => {
    setHamburger(false);
    setLoginModal(true);
  };

  const handleLogout = () => {
    setHamburger(false);

    if (typeof document !== 'undefined') {
      const cookieList = document.cookie.split(' ').filter((cookie) => {
        return cookie.includes('accessToken');
      });
      const accessToken = cookieList[0].split('=')[1].replace(';', '');

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          prop.setIsLogin(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {prop.isLogin ? (
        <>
          <div className={styles.header}>
            <Link href="/">
              <a className={styles.logo}>
                <img src="/banthing.png" alt="BanThing Logo" />
              </a>
            </Link>

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

            <nav className={styles.nav}>
              <Link href="/">
                <a
                  className={styles.nav_menu}
                  onClick={() => setHamburger(false)}
                >
                  HOME
                </a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <Link href="/main">
                <a
                  className={styles.nav_menu}
                  onClick={() => setHamburger(false)}
                >
                  MAIN
                </a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <Link href="/">
                <a className={styles.nav_menu} onClick={handleLogout}>
                  LOGOUT
                </a>
              </Link>
            </nav>
            <div className={styles.nav_user_image_container}>
              <Link href="/mypage">
                <img
                  src="/user.png"
                  alt="user-image"
                  className={styles.nav_user_image}
                />
              </Link>
            </div>
          </div>

          {hamburger ? (
            <div className={styles.hamburger_nav_container}>
              <nav className={styles.hamburger_nav_login_true}>
                <Link href="/">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={() => setHamburger(false)}
                  >
                    HOME
                  </a>
                </Link>
                <Link href="/main">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={() => setHamburger(false)}
                  >
                    MAIN
                  </a>
                </Link>
                <Link href="/">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </a>
                </Link>
                <Link href="/mypage">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={() => setHamburger(false)}
                  >
                    MY PAGE
                  </a>
                </Link>
              </nav>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        // ----------- ▲ 로그인이 되어있는 경우 -----------
        // --------- ▼ 로그인이 되어있지 않은 경우 ---------
        <>
          <div className={styles.header}>
            <Link href="/">
              <a className={styles.logo}>
                <img src="/banthing.png" alt="BanThing Logo" />
              </a>
            </Link>

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

            <nav className={styles.nav}>
              <Link href="/">
                <a className={styles.nav_menu}>HOME</a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <Link href="/main">
                <a className={styles.nav_menu}>MAIN</a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <a className={styles.nav_menu} onClick={openLoginModal}>
                LOGIN
              </a>
            </nav>
          </div>

          {loginModal ? (
            <Login
              loginModal={loginModal}
              setLoginModal={setLoginModal}
              setIsLogin={prop.setIsLogin}
            />
          ) : (
            <></>
          )}

          {hamburger ? (
            <div className={styles.hamburger_nav_container}>
              <nav className={styles.hamburger_nav_login_false}>
                <Link href="/">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={() => setHamburger(false)}
                  >
                    HOME
                  </a>
                </Link>
                <Link href="/main">
                  <a
                    className={styles.hamburger_nav_menu}
                    onClick={() => setHamburger(false)}
                  >
                    MAIN
                  </a>
                </Link>
                <a
                  className={styles.hamburger_nav_menu}
                  onClick={openLoginModal}
                >
                  LOGIN
                </a>
              </nav>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
