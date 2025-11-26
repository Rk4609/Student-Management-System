

import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  // ✅ State banai har input ke liye
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Signup button click hone par ye chalega

  let navigate = useNavigate();
  const handleSignup = async () => {
    // validation
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }
    // fetch to  POST request send
    try {
      const response = await fetch("http://localhost:5093/api/Auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const result = await response.text(); // backend se "Signup successful!" aayega
        alert(result);
        // fields clear
        setUsername('');
        setEmail('');
        setPassword('');
        navigate("/")
      } else {
        const errorText = await response.text();
        alert("Error: " + errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect with backend!");
    }
  };

  return (
    <div className={styles.loginsignup}>
      <div className={styles["loginsignup-container"]}>
        <h1>Sign Up</h1>
        <div className={styles["loginsignup-field"]}>
          <input
            type='text'
            placeholder='Enter Your Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignup}>Continue</button>
        </div>

        <p className={styles["loginsignup-login"]}>
          Already have an account? <span>Login here</span>
        </p>

        <div className={styles["loginsignup-agree"]}>
          <input type='checkbox' />
          <p>
            By continuing, I agree to the Terms of Use & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
