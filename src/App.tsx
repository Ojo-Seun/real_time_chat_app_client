import React, { useEffect, useState, Suspense, lazy, useContext } from "react";
import socket from "./utils/socket";
import "./styles//App.css";
import { RouteVariant } from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Store } from "./components/StoreProvider";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));

function App() {
  const [message, setMessage] = useState("Initial message");
  const location = useLocation();
  const { state, dispatch } = useContext(Store);
  const { isConnected, userInfo } = state;

  // const send = () => {
  //   socket.emit("message", { sender: "", createdAt: 0, to: "", userId: "", content: "Message" });
  // };

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
  );
}

export default App;
