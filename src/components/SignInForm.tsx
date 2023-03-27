import React, { useContext, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import validateInput from "../utils/validateInput"
import styles from "../styles/SignIn.module.css"
import { errMessage } from "../utils/errMessages"
import { Store } from "./StoreProvider"
import openPwd from "../icons/openPwd.svg"
import closePwd from "../icons/closePwd.svg"

interface Props {
  setShowSignUpPage: (e: boolean) => void
}

function SignInForm({ setShowSignUpPage }: Props) {
  const [err, setErr] = useState({ showErr: false, message: "" })
  const [showPwd, setShowPwd] = useState(false)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({ password: "", email: "" })
  const { dispatch } = useContext(Store)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    for (let key in inputs) {
      const valid = validateInput(key, inputs[key])

      if (!valid) {
        setErr({ showErr: true, message: errMessage.get("all") as string })
        return
      }
    }

    const { email, password } = inputs
    axios
      .post("http://localhost:5000/api/sign_in", { email, password })
      .then((res) => {
        dispatch({ type: "SIGNIN", payload: { ...res.data } })
      })
      .catch((err) => {
        const Err = err.response ? err.response.data.message : err.message
        setErr({ showErr: true, message: Err })
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setInputs((prev) => ({ ...prev, [name]: value }))
    const valid = validateInput(name, value)
    if (!valid) {
      setErr({ showErr: true, message: errMessage.get(name) as string })
      return
    }

    setErr({ showErr: false, message: "" })
  }
  return (
    <form onSubmit={handleSubmit} className={styles.sign_in_form}>
      {err.showErr && (
        <motion.pre style={{ color: "red", textAlign: "center", fontSize: 10 }} animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }} initial={{ opacity: 0 }}>
          {err.message}
        </motion.pre>
      )}
      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email</label>
        <input id={styles.email} pattern="^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$" onChange={handleChange} type="email" value={inputs.email} name="email" required />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="password">Password</label>
        <div>
          <input
            id={styles.password}
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
      <p>
        <span>No Account Yet Sign Up</span>
        <button type="button" className={styles.btn} onClick={() => setShowSignUpPage(true)}>
          Sign Up
        </button>
      </p>
      <div className={styles.inputWrapper}>
        <button className={styles.btn} type="submit">
          Sign In
        </button>
      </div>
    </form>
  )
}

export default SignInForm
