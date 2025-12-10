

import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
 const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  let navigate = useNavigate();
  const handleSignup = async () => {
    // validation
    if (!username || !email || !password || !fullName) {
      alert("Please fill all fields!");
      return;
    }
    // fetch to  POST request send
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName:fullName,
          username: username,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const result = await response.json(); 
        alert(result.message);
         setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        navigate("/")
      } else {
        const errorText = await response.json();
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
            placeholder='Enter Your fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter Your username'
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
