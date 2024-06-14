import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import './signup.css'
import Nav from './nav'
import axios from 'axios'
import CloseButton from 'react-bootstrap/CloseButton';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import EmailRedirect from '../custom hook/emailredirect'
export default function Signup() {
  const dialogRef = useRef(null);
  const dialogRefForgetPassword = useRef(null);
  const dialogRefSemdingEmail = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState([]);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('mdi:eye-off');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailProviderURL, setEmailProviderURL] = useState('');
  const location = useLocation();

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIcon('mdi:eye');
    } else {
      setType('password');
      setIcon('mdi:eye-off');
    };
  }
  useEffect(() => {
    // console.log("Location state:", location.state);
    if (location.state && location.state.dialogRef) {
      // console.log("Location state:", location.state);
      showDialog(dialogRef);
    }
  }, [location.state]);

  const showDialog = (dialog, currentdialog) => {
    currentdialog && closeDialog(currentdialog);
    setErr('')
    dialog.current.showModal();
  }

  const closeDialog = (dialog) => {
    console.log(dialog)
    dialog.current.close();
    setErr('')
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', {
      email: email,
      Password: password,
      rememberMe:rememberMe
    })
      .then(response => {
        const token = response.data.token;
        console.log(token)
        if (token) {
          localStorage.setItem('token', token);
        }
        window.location.href = response.data.redirect;
      })
      .catch(errors => {
        const Errors = errors.response.data.errors;
        setErr(Errors)
      });
  };
  const handleForgetPasswordSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/ForgetPassword', {
      email: email,
    })
      .then(response => {
        console.log(response)
        if (response && response.status === 200){
        showDialog(dialogRefSemdingEmail,dialogRefForgetPassword)
        }
      })
      .catch(error => {
        if (error.response && error.response.data.errors && error.response.data.errors.message) {
          setErr(error.response.data.errors.message); 
        } else {
          setErr("Something went wrong. Please try again."); 
        }
      });
  };

  const handleEmailProviderURL = (url) => {
    setEmailProviderURL(url);
  };
  return (
    <div>
      <Nav />
      <div className="con-main">
        <motion.div
          initial={{ x: -1500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className='con-left'
        >
          <img src='https://i.postimg.cc/wB4ZLHTq/Frame-1-2.png' width="100%" height="100%" alt="Logo" />
        </motion.div>
        <div className="con-right">
          <div className="con-signup">
            <h3 >Join today.</h3>
            <Link className="but-acc" to="#">
              <img src="https://i.postimg.cc/YCXc9mwN/2993685-brand-brands-google-logo-logos-icon.png" width="30px" height="30px" alt="Google Logo" />
              Sign up with Google
            </Link>
            <Link className="but-acc" to="#">
              <img src="https://i.postimg.cc/Zq0GyKTG/104490-apple-icon.png" width="30px" height="30px" alt="Apple Logo" />
              Sign up with Apple
            </Link>
            <div className="line">
              <div className="line-bo"></div>
              <p className="ps">or</p>
              <div className="line-bo"></div>
            </div>
            <Link
              className="but-acc"
              id="but-acc"
              to="/creataccount"
              onClick=''>
              Create account
            </Link>
            <p>By signing up, you agree to the <Link id="link-t" to="#">Terms of Service</Link> and <Link to="" id="link-t">Privacy Policy</Link>, including<Link to="" id="link-t"> Cookie Use.</Link></p>
            <h3>Already have an account?</h3>
            <button className="but-acc" id="but-acc1" onClick={() => showDialog(dialogRef)}>Sign in</button>
          </div>
        </div>
        <dialog id="dialog-co" ref={dialogRef} >
          <div className='dialogFlex' >
            <CloseButton variant="black" onClick={() => { closeDialog(dialogRef) }} />
            <div className="dilo">
              <form onSubmit={handleSubmit}>
                <div className='dialogFlexContent'>
                  <h1>Login</h1>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      enterKeyHint="next"
                      placeholder='email@rw.com'
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErr(''); }}
                      className="block w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                      <input
                        required
                        type={type}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        enterKeyHint="next"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErr(''); }}
                        className="block w-full pr-10 p-2 border border-gray-300 rounded"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={handleToggle}
                      >
                        <Icon icon={icon} size={45} />
                      </span>
                    </div>
                  </div>
                  <div className='remForget'>
                    <div id='rememberMe' >
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <div onClick={() => { showDialog(dialogRefForgetPassword, dialogRef) }}><p>Forget Your Password ?</p></div>
                  </div>
                  {err && <p className="text-red-500 mt-2">{err}</p>}
                  <button type="submit" id="btn" className="btn btn-outline-danger mt-3">Login</button>
                </div>
              </form>

            </div>
          </div>
        </dialog>
        <dialog id="dialog-co" ref={dialogRefForgetPassword} >
          <div className='dialogFlex' >
            <BsArrowLeft variant="black" onClick={() => { showDialog(dialogRef, dialogRefForgetPassword) }} />
            <div className="dilo">
              <form onSubmit={handleForgetPasswordSubmit}>
                <div className='dialogFlexContent'>
                  <h1>Forget Your Password ?</h1>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      enterKeyHint="next"
                      placeholder='email@rw.com'
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErr(''); }}
                      className="block w-full mb-3 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  {err && <p className="text-red-500 mt-2">{err}</p>}
                  <button type="submit" id="btn" className="btn btn-outline-danger mt-3" >Next</button>
                </div>
              </form>
            </div>
            <CloseButton variant="black" onClick={() => { closeDialog(dialogRefForgetPassword) }} />
          </div>
        </dialog>
        <dialog id="dialog-co" ref={dialogRefSemdingEmail} >
          <div className='dialogFlex' >
            <BsArrowLeft variant="black" onClick={() => { showDialog(dialogRefForgetPassword, dialogRefSemdingEmail) }} />
            <div className="dilo">
              <div className='dialogFlexContent'>
                <h1>Forget Your Password ?</h1>
                <div className='videoco'style={{ width: '60%', maxWidth: '600px', margin: 'auto' }}>
                  <video id="myVideo" autoPlay muted loop style={{ width: '100%', height: 'auto' }}>
                    <source src="http://localhost:8080/public/video/sendedemail.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Link to={emailProviderURL}  target="_blank">Go to Gmail</Link>
                </div>
                {err && <p className="text-red-500 mt-2">{err}</p>}
                <button id="btn" className="btn btn-outline-danger mt-3" onClick={() => { closeDialog(dialogRefSemdingEmail) }}>Ok</button>
              </div>
            </div>
            <CloseButton variant="black" onClick={() => { closeDialog(dialogRefSemdingEmail) }} />
          </div>
        </dialog>
      </div>
      <EmailRedirect email={email} onEmailProviderURL={handleEmailProviderURL} />
    </div>
  );
};
