import { AnimatePresence, motion } from "framer-motion"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"
import { Store } from "../components/StoreProvider"
import styles from "../styles/Home.module.css"

const FormVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: { opacity: 0 },
}

export const RouteVariant = {
  initial: {
    y: "2vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: {
    y: "2vh",
    opacity: 0,
  },
}

function Home() {
  const navigate = useNavigate()
  const [showSignUpPage, setShowSignUpPAge] = useState(false)
  const [image, setImage] = useState("")
  const {
    state: { userInfo },
  } = useContext(Store)

  useLayoutEffect(() => {
    if (userInfo.token) {
      navigate("/chat")
    }
  }, [userInfo.token, navigate])

  return (
    <motion.div variants={RouteVariant} initial="initial" animate="animate" exit="exit" className={styles.homePage}>
      <div className={styles.leftGrid}></div>
      <div className={styles.rightGrid}>
        {showSignUpPage ? (
          <div className={styles.sign_up_wrapper}>
            <motion.p className={styles.title}>
              <span>Sign Up To Start Chating</span>
              {image && <img src={image} style={{ borderRadius: "50%" }} alt="Your Pics" width={50} height={50} />}
            </motion.p>
            <SignUpForm image={image} setImage={setImage} setShowSignUpPage={setShowSignUpPAge} />
          </div>
        ) : (
          <div className={styles.sign_in_wrapper}>
            <motion.p className={styles.title}>Sign In To Start Chating</motion.p>
            <SignInForm setShowSignUpPage={setShowSignUpPAge} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Home
