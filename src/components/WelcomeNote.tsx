import { motion, AnimatePresence } from "framer-motion"
import styles from "../styles/WelcomeNotes.module.css"

const RootDivVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

function WelcomeNote() {
  return (
    <AnimatePresence>
      <motion.div className={styles.welcome_notes} variants={RootDivVariant} initial="initial" animate="animate" exit="exit">
        <h3 style={{ textAlign: "center" }}>Hello</h3>
        <motion.h4 initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 5, transition: { duration: 1, delay: 1 } }}>
          welcome to <i>FreeChat</i>, a real time chat application.
        </motion.h4>
        <motion.p initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 5, transition: { duration: 1, delay: 2 } }}>
          Join a room, Create a room and Chat with people all over the world for free
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomeNote
