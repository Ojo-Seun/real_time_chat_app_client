import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Layout.module.css"
import Chatlogo from "./Chatlogo"
import Notification from "./Notification"
import { AnimatePresence, motion } from "framer-motion"
import OpenIcon from "./OpenIcon"
import CloseIcon from "./CloseIcon"
import { Store } from "./StoreProvider"
import ConnectedRooms from "./ConnectedRooms"
import AllRooms from "./AllRooms"
import AllUsers from "./AllUsers"
import OnlineUsers from "./OnlineUsers"

interface Props {
  children: React.ReactNode
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
}

const BarVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 1, delay: 1 },
  },
}

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
}

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
}

const Alert = {
  initial: { x: "1rem", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
}

function Layout({ children }: Props) {
  const [leftToggleBtn, setLeftToggleBtn] = useState({ roomsBox: false, openBtn: true })
  const [rightToggleBtn, setRightToggleBtn] = useState({ usersBox: false, openBtn: true })
  const { state, dispatch } = useContext(Store)
  const { isConnected, userInfo, alert, allRooms, allUsers, roomsConnected, onlineUsers } = state

  const toggleLeftBtn = () => {
    setRightToggleBtn({ usersBox: false, openBtn: true })
    setLeftToggleBtn({ roomsBox: !leftToggleBtn.roomsBox, openBtn: !leftToggleBtn.openBtn })
  }

  const toggleRightBtn = () => {
    setLeftToggleBtn({ roomsBox: false, openBtn: true })
    setRightToggleBtn({ usersBox: !rightToggleBtn.usersBox, openBtn: !rightToggleBtn.openBtn })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "ALERT", payload: { message: "" } })
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch, alert.message])

  return (
    <motion.div className={styles.layout}>
      {/* Desktop  leftSideBar*/}
      <motion.aside variants={BarVariant} initial="initial" animate="animate" className={styles.leftSideBar}>
        <div className={styles.header}>
          <div className={styles.chatlogo}>
            <Chatlogo />
          </div>
        </div>

        <div className={styles.chatInfo}>
          <ConnectedRooms connectedRooms={roomsConnected} />
          <AllRooms allRooms={allRooms} />
        </div>
      </motion.aside>
      {/*Desktop  leftSideBar*/}
      <motion.main variants={MainVariant} initial="initial" animate="animate" className={styles.main}>
        <div className={styles.header}>
          {/* Mobile mobileTopHeader*/}
          <div className={styles.mobileTopHeader}>
            <div className={styles.chatlogo}>
              <Chatlogo />
            </div>

            <div className={styles.isConnected}>
              <span className={`${styles.indicator} ${isConnected ? styles.active : styles.inactive}`}></span>
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>

            <div className={styles.notification}>
              <Notification />
              {alert.message && (
                <motion.span variants={Alert} initial="initial" animate="animate">
                  {alert.message}
                </motion.span>
              )}
            </div>
          </div>
          {/* Mobile mobileTopHeader*/}

          {/* Desktop-> deskTopTopHeader*/}
          <div className={styles.deskTopTopHeader}>
            <img width={40} height={40} style={{ borderRadius: ".5rem" }} src={userInfo.image} alt="Your pics" />
            <div className={styles.isConnected}>
              <span className={`${styles.indicator} ${isConnected ? styles.active : styles.inactive}`}></span>
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
            <span style={{ textTransform: "capitalize" }}>{userInfo.username}</span>
          </div>
          {/* Desktop-> deskTopTopHeader*/}

          {/* Mobile */}
          <div className={styles.toggleWrapper}>
            <button onClick={toggleLeftBtn} className={styles.toggleBtn}>
              {leftToggleBtn.openBtn ? <OpenIcon /> : <CloseIcon />}
            </button>
            <AnimatePresence>
              {leftToggleBtn.roomsBox && (
                <motion.div variants={RoomsBoxVariant} initial="initial" animate="animate" exit="exit" className={styles.roomsBox}>
                  <ConnectedRooms connectedRooms={roomsConnected} />
                  <AllRooms allRooms={allRooms} />
                  <button type="button" className={styles.createRoomBtn}>
                    Create New Room
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div id={styles.userInfo}>
              <img width={40} height={40} style={{ borderRadius: "50%" }} src={userInfo.image} alt="Your pics" />
              <span style={{ textTransform: "capitalize" }}>{userInfo.username}</span>
            </div>
            <button onClick={toggleRightBtn} className={styles.toggleBtn}>
              {rightToggleBtn.openBtn ? <OpenIcon /> : <CloseIcon />}
            </button>
            <AnimatePresence>
              {rightToggleBtn.usersBox && (
                <motion.div variants={UsersBoxVariant} initial="initial" animate="animate" exit="exit" className={styles.usersBox}>
                  <OnlineUsers onlineUsers={onlineUsers} />
                  <AllUsers allUsers={allUsers} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Mobile */}
        </div>
        <div className={styles.chatWrapper}>{children}</div>
      </motion.main>
      {/* Desktop rightSideBar*/}
      <motion.aside variants={BarVariant} initial="initial" animate="animate" className={styles.rightSideBar}>
        <div className={styles.header}>
          <div className={styles.notification}>
            <Notification />
            {alert.message && (
              <motion.span initial={{ y: 20 }} animate={{ y: 0 }}>
                {alert.message}
              </motion.span>
            )}
          </div>
        </div>
        <div className={styles.users}>
          <OnlineUsers onlineUsers={onlineUsers} />
          <AllUsers allUsers={allUsers} />
        </div>
      </motion.aside>
      {/* Desktop rightSideBar*/}
    </motion.div>
  )
}

export default Layout
