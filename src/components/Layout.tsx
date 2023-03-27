import React, { useContext, useState } from "react";
import styles from "../styles/Layout.module.css";
import Chatlogo from "./Chatlogo";
import Notification from "./Notification";
import { AnimatePresence, motion } from "framer-motion";
import OpenIcon from "./OpenIcon";
import CloseIcon from "./CloseIcon";
import { Store } from "./StoreProvider";

interface Props {
  children: React.ReactNode;
}

// Animation Variants Definations
const MainVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1, delay: 2 },
  },
};

const BarVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1, delay: 1 },
  },
};

const RoomsBoxVariant = {
  initial: {
    opacity: 0,
    x: "-10vw",
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    x: "-10vw",
  },
};

const UsersBoxVariant = {
  initial: {
    opacity: 0,
    x: "10vw",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    x: "10vw",
  },
};

function Layout({ children }: Props) {
  const [leftToggleBtn, setLeftToggleBtn] = useState({ roomsBox: false, openBtn: true });
  const [rightToggleBtn, setRightToggleBtn] = useState({ usersBox: false, openBtn: true });
  const { state } = useContext(Store);
  const { isConnected, userInfo, alert } = state;

  const leftBtn = () => {
    setRightToggleBtn({ usersBox: false, openBtn: true });
    setLeftToggleBtn({ roomsBox: !leftToggleBtn.roomsBox, openBtn: !leftToggleBtn.openBtn });
  };

  const rightBtn = () => {
    setLeftToggleBtn({ roomsBox: false, openBtn: true });
    setRightToggleBtn({ usersBox: !rightToggleBtn.usersBox, openBtn: !rightToggleBtn.openBtn });
  };

  return (
    <motion.div className={styles.layout}>
      <motion.aside variants={BarVariant} initial="initial" animate="animate" className={styles.leftSideBar}>
        <div className={styles.header}>
          <div className={styles.chatlogo}>
            <Chatlogo />
          </div>
        </div>
        <div className={styles.chatInfo}>
          <div className={styles.rooms}>Rooms</div>
        </div>
      </motion.aside>
      <motion.main variants={MainVariant} initial="initial" animate="animate" className={styles.main}>
        <div className={styles.header}>
          <div className={styles.topHeader}>
            <div className={styles.chatlogo}>
              <Chatlogo />
            </div>
            <div className={styles.isConnected}>
              <span className={`${styles.indicator} ${isConnected ? styles.active : styles.inactive}`}></span>
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>

            <div className={styles.notification}>
              <Notification />
              {alert.message && <span>{alert.message}</span>}
            </div>
          </div>
          <div className={styles.toggleWrapper}>
            <motion.button onClick={leftBtn} className={styles.toggleBtn}>
              {leftToggleBtn.openBtn ? <OpenIcon /> : <CloseIcon />}
            </motion.button>
            <AnimatePresence>
              {leftToggleBtn.roomsBox && (
                <motion.div variants={RoomsBoxVariant} initial="initial" animate="animate" exit="exit" className={styles.roomsBox}>
                  <div className={styles.title}>Rooms</div>
                  <div className={styles.roomsWrapper}>All Rooms</div>
                  <div className={styles.btnWrapper}>
                    <button type="button" className={styles.createRoomBtn}>
                      Create New Room
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div id={styles.userInfo}>
              <img width={40} height={40} style={{ borderRadius: "50%" }} src={userInfo.image} alt="Your pics" />
              <span style={{ textTransform: "capitalize" }}>{userInfo.username}</span>
            </div>
            <motion.button onClick={rightBtn} className={styles.toggleBtn}>
              {rightToggleBtn.openBtn ? <OpenIcon /> : <CloseIcon />}
            </motion.button>
            <AnimatePresence>
              {rightToggleBtn.usersBox && (
                <motion.div variants={UsersBoxVariant} initial="initial" animate="animate" exit="exit" className={styles.usersBox}>
                  <div className={styles.title}>Users</div>
                  <div className={styles.usersWrapper}>Room Users</div>
                  <div className={styles.btnWrapper}>
                    <button type="button" className={styles.leaveRoomBtn}>
                      Leave Room
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.chatWrapper}>{children}</div>
      </motion.main>
      <motion.aside variants={BarVariant} initial="initial" animate="animate" className={styles.rightSideBar}>
        <div className={styles.header}>
          <div className={styles.notification}>
            <Notification />
            {alert.message && <span>{alert.message}</span>}
          </div>
        </div>
        <div className={styles.online_users}>ONLINE USERS</div>
      </motion.aside>
    </motion.div>
  );
}

export default Layout;
