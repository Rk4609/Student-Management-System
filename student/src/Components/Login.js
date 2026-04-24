import React, { useState } from "react"
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Login() {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        },
      )

      const data = await response.data
        localStorage.setItem("accessToken", data.data.accessToken)
        localStorage.setItem(
          "studentauth",
          JSON.stringify(data.data.studentauth),
        )
        navigate("/students")
      
    } catch (error) {
      if (error.response) {
        alert("Error: " + error.response.data.message)
      } else {
        alert("Server not responding!")
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Welcome back!</h2>
        <p>Enter your credentials to access your account</p>

        <form onSubmit={handleLogin}>
          <label>Email </label>
          <input type="email" placeholder="Enter your email"value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <button className={styles["signup-btn"]} type="submit">
            Login
          </button>
        </form>

        <p className={styles.signin}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>Sign Up</span>
        </p>
      </div>

      <div className={styles.right}>
        <img src="SMS.jpg" alt="leaf" />
      </div>
    </div>
  )
}

export default Login


 