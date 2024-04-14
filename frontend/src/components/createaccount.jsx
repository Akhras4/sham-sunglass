import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [err,seterr]=useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signup', {
        UserName:username,
        email:email,
        Password:password,
        phoneNumber:phoneNumber
    })
    .then(response => {
      window.location.href = response.data.redirect;
    })
    .catch(errors => {
        const validationErrors = errors.response.data.errors;
        console.error('Validation errors:', validationErrors);
        seterr(validationErrors)
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button type="submit">Create Account</button>
      </form>
      <ul>
      {err && err.map((err,index) =>{<li key={index}>{err}</li>})}
      </ul>
    </div>
  );
}