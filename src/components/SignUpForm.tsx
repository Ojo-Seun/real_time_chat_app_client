import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/SignUp.module.css";
import validateInput from "../utils/validateInput";
import { errMessage } from "../utils/errMessages";
import { Store } from "./StoreProvider";
import axios from "axios";
import imageCompressor from "browser-image-compression";
import openPwd from "../icons/openPwd.svg";
import closePwd from "../icons/closePwd.svg";
import { useNavigate } from "react-router-dom";

const InputsVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1 },
  },
  exit: { opacity: 0 },
};

interface Props {
  setShowSignUpPage: (e: boolean) => void;
  image: string;
  setImage: (e: string) => void;
}

function SignUpForm({ setShowSignUpPage, image, setImage }: Props) {
  const [err, setErr] = useState({ showErr: false, message: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({ username: "", email: "", password: "", confirmPassword: "" });
  const { dispatch } = useContext(Store);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [name]: value }));
    const valid = validateInput(name, value);
    if (!valid) {
      setErr({ showErr: true, message: errMessage.get(name) as string });
      return;
    }
    setErr({ showErr: false, message: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      setErr({ showErr: true, message: errMessage.get("confirmPassword") as string });
      return;
    }

    for (let key in inputs) {
      const valid = validateInput(key, inputs[key]);

      if (!valid) {
        setErr({ showErr: true, message: errMessage.get("all") as string });
        return;
      }
    }

    const { confirmPassword, ...rest } = inputs;
    const userInfo = { ...rest, image };
    axios
      .post("http://localhost:5000/api/sign_up", { userInfo })
      .then((res) => {
        dispatch({ type: "SIGNIN", payload: { ...res.data } });
      })
      .catch((err) => {
        const Err = err.response ? err.response.data.message : err.message;
        setErr({ showErr: true, message: Err });
      });
  };

  const readImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file && validateInput("image", file.name)) {
      setErr({ showErr: false, message: "" });

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };

      // Compress image
      imageCompressor(file!, options).then((compressedImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedImage);
        reader.addEventListener("load", (e) => {
          const result = e.target?.result;
          setImage(result as string);
        });
      });
    } else {
      setErr({ showErr: true, message: errMessage.get("image") as string });
      return;
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className={styles.sign_up_form} layout>
      {err.showErr && (
        <motion.pre style={{ color: "red", textAlign: "center", fontSize: 10 }} animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }} initial={{ opacity: 0 }}>
          {err.message}
        </motion.pre>
      )}
      <div className={styles.inputWrapper}>
        <label htmlFor="username">User Name</label>
        <input pattern="^[A-Za-z0-9]{3,20}$" id={styles.text} placeholder="Alphabet Only" onChange={handleChange} type="text" value={inputs.username} name="username" required />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email</label>
        <input
          id={styles.email}
          pattern="^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$"
          placeholder="user@gmail.com"
          onChange={handleChange}
          type="email"
          value={inputs.email}
          name="email"
          required
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Password</label>
        <div>
          <input
            className={styles.password}
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$#&@_!^=]).{8,20}"
            onChange={handleChange}
            type={showPwd ? "text" : "password"}
            value={inputs.password}
            name="password"
            required
          />

          <i onClick={() => setShowPwd(!showPwd)}>{showPwd ? <img width={20} height={20} src={openPwd} alt="Password Icon" /> : <img width={20} height={20} src={closePwd} alt="Password Icon" />}</i>
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div>
          <input
            onChange={handleChange}
            className={styles.password}
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$#&@_!=^]).{8,20}"
            type={showPwd ? "text" : "password"}
            value={inputs.confirmPassword}
            name="confirmPassword"
            required
          />
          <i onClick={() => setShowPwd(!showPwd)}>{showPwd ? <img width={20} height={20} src={openPwd} alt="Password Icon" /> : <img width={20} height={20} src={closePwd} alt="Password Icon" />}</i>
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="image" id={styles.imageLabel}>
          Upload A Photo
        </label>
        <input type="file" id="image" style={{ display: "none" }} onChange={(e) => readImage(e)} accept=".jpg, .png, .jpeg, .svg" name="image" />
      </div>

      <p>
        <span>Have An Account Already?</span>
        <button className={styles.btn} onClick={() => setShowSignUpPage(false)} type="button">
          Sign In
        </button>
      </p>
      <div className={styles.inputWrapper}>
        <button className={styles.btn} type="submit">
          Sign UP
        </button>
      </div>
    </motion.form>
  );
}

export default SignUpForm;
