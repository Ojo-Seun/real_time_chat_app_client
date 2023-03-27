import React from "react"
import styles from "../styles/Chatlogo.module.css"

function Chatlogo() {
  return (
    <i className={styles.chatlogo}>
      <svg width="137" height="32" viewBox="0 0 137 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 16C0 7.16344 7.16344 0 16 0H30C31.1046 0 32 0.895431 32 2V16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="url(#paint0_linear_2_289)" />
        <circle cx="16" cy="16" r="8" fill="white" fillOpacity="0.4" />
        <circle cx="16" cy="16" r="6" fill="white" fillOpacity="0.28" />
        <circle cx="16" cy="16" r="4" fill="white" fillOpacity="0.73" />
        <text x="40" y="15" fill="#5E647C">
          Free Chat
        </text>
        <defs>
          <linearGradient id="paint0_linear_2_289" x1="0" y1="0" x2="35.3107" y2="4.20609" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285F4" />
            <stop offset="1" stopColor="#186EFC" />
          </linearGradient>
        </defs>
      </svg>
    </i>
  )
}

export default Chatlogo
