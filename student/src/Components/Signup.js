import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Signup.module.css'
import axios from "axios"
// import { ApiError } from "../../../backend/utills/ApiError"

function Signup() {

    const[fullName,setFullName]= useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password) {
        alert("Please fill all fields")
    }

    try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      {
        fullName: fullName,
        email: email,
        password: password
      }
    );

    // success case
    alert(response.data.message);
    setFullName("");
    setEmail("");
    setPassword("");
    navigate("/login"); 
  } catch (error) {
    if (error.response) {
      alert("Error: " + error.response.data.message);
    } else {
      console.error("Error:", error);
      alert("Failed to connect with backend!");
    }
  }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Get Started Now</h2>

        <form onSubmit={handleSignup}>
          <label>FullName</label>
          <input type="FullName" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

          <label>Email </label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="Enter password"value={password} onChange={(e)=>setPassword(e.target.value)}required />

          <div className={styles.checkbox}>
            <input type="checkbox" required />
            <span>I agree to the terms & policy</span>
          </div>

          <button className={styles["signup-btn"]} type="submit">
            Signup
          </button>
        </form>

        <p className={styles.signin}>
          Already have account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>

      <div className={styles.right}>
        <img src="SMS.jpg" alt="leaf" />
      </div>
    </div>
  )
}

export default Signup
