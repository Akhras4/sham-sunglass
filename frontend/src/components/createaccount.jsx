import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './nav';
import './creareaccount.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [err, seterr] = useState([])
  const [dialog, setDialog] = useState(null)
  const navgat = useNavigate()
  const handelNavigate = () => {
    navgat('/signup', { state: { dialogRef: dialog } })
  }
  useEffect(() => {
    setDialog("dialogRef");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/signup', {
      UserName: username,
      email: email,
      Password: password,
      phoneNumber: phoneNumber
    })
      .then(response => {
        window.location.href = response.data.redirect;
      })
      .catch(errors => {
        const validationErrors = errors.response.data.errors;
        const errorArray = Object.entries(validationErrors).map(([key, value]) => ({ field: key, message: value }));
        seterr(errorArray)
      });
  };

  return (
    <div className='background'>
      <Nav />
      <div className="maincreatcon">
        <motion.div
          initial={{ x: -1500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className='rightcreatcon'
        >
          <img src='https://i.postimg.cc/wB4ZLHTq/Frame-1-2.png' width="100%" height="100%" alt="Logo" />
        </motion.div>
        <div className='leftcreatcon'>
          <form onSubmit={handleSubmit}>
            <label for="username">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} class="asd" />
            <label for="email">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} class="asd" />
            <label for="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} class="asd" />
            <label for="phoneNumber">Phone Number</label>
            <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} class="asd" />
            <input id="btn" type="submit" value="Register Now" class="mainbox"></input>
            <p onClick={() => { handelNavigate() }}>already have account</p>
          </form>
          <ul>
            {err && err.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}