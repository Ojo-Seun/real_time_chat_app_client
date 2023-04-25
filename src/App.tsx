import React, { Suspense, lazy } from "react"
import "./styles//App.css"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

const Home = lazy(() => import("./pages/Home"))
const Chat = lazy(() => import("./pages/Chat"))

export const RouteVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
  },
}

function App() {
  const location = useLocation()

  return (
    <motion.div variants={RouteVariant} initial="initial" animate="animate" exit="exit" className="App">
      <Suspense fallback={<div>Loading</div>}>
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route index element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </motion.div>
  )
}

export default App
