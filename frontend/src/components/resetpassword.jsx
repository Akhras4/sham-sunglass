import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './creareaccount.css';
import { motion } from 'framer-motion'
import Nav from './nav';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Signup from './signup';
export default function ResetPassword() {
    const [err, setErr] = useState([]);
    const [iconPassword, setIconPasword] = useState('mdi:eye-off');
    const [iconConfirmPassword, setIconConfirmPasword] = useState('mdi:eye-off');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tokenResetPassword,setTokenResetPassword]=useState('')
    const [userid,setuserId]=useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const passwordInput=useRef()
    const confirmPasswordInput=useRef()
    const iconPasswordInput=useRef()
    console.log("passwordInput.current:",passwordInput.current)
    const handleToggle = (inputRef,iconSetState) => {
        if (inputRef.current.type === 'password'){ 
            inputRef.current.type = 'text'
            iconSetState('mdi:eye')

        } else {
            inputRef.current.type = 'password'
            iconSetState('mdi:eye-off')
        };
    }
    useEffect(()=>{
        document.title = "Reset Password";
    },[])
    const handelSubmit=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            return setErr("passwords do not match")
        }
        axios.post(`http://localhost:8080/${encodeURIComponent(userid)}/Resetpassword?tokenResetPassword=${tokenResetPassword}`,{password,confirmPassword})
        .then(res=>{
            console.log("res :",res)
            if(res.status===200 ){
                setErr("")
                window.location.href=res.data.redirect
            }
        })
        .catch(err=>{
            console.log("err :",err)
            if (err.response && err.response.data.error ) {
                console.log(err.response.data.error)
                setErr(err.response.data.error); 
              } else {
                setErr("Something went wrong. Please try again."); 
              }
        })
    }
    useEffect(()=>{
        let tokenInfo=Cookies.get('tokenResetPassword')
        console.log("tokenResetPassword :",tokenInfo)
        setTokenResetPassword(tokenInfo)
        if (tokenInfo) {
            const decodedToken = jwtDecode(tokenInfo);
            // console.log('Decoded token:', decodedToken);
            const userId = decodedToken.userId;
            console.log("userId :",userId)
            if (decodedToken.exp * 1000 < Date.now()) {
                Cookies.remove('tokenResetPassword', { path: '/ResetPassword' });
                setTokenResetPassword(null); 
                setuserId(null); 
                setIsAuthenticated(false); 
            } else {
                setuserId(userId);
                setIsAuthenticated(true);
            }
        }
    },[tokenResetPassword,userid])

    return (
        <div className='background'>  
            {isAuthenticated ?(
                <>
                <Nav />
            <div className='mainResetPassword'>
                <motion.div
                    initial={{ x: -1500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='rightReset'
                >
                    <img src='https://i.postimg.cc/wB4ZLHTq/Frame-1-2.png' width="100%" height="100%" alt="Logo" />
                </motion.div>
                <div className='leftReset'>
                    <form onSubmit={handelSubmit}>
                            <label htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                  ref={passwordInput}
                                    required
                                    type='password'
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    enterKeyHint="next"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErr(''); }}
                                    className="block w-full pr-10 p-2 border border-gray-300 rounded asd"
                                />
                                <span
                                ref={iconPasswordInput}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={()=>handleToggle(passwordInput,setIconPasword)}
                                >
                                    <Icon icon={iconPassword} size={45} />
                                </span>
                            </div>
                            <label htmlFor="confirmPassword">Password</label>
                            <div className="relative">
                                <input
                                   ref={confirmPasswordInput}
                                    required
                                    type='password'
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete="current-password"
                                    enterKeyHint="next"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setErr(''); }}
                                    className="block w-full pr-10 p-2 border border-gray-300 rounded asd"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={()=>handleToggle(confirmPasswordInput,setIconConfirmPasword)}
                                >
                                    <Icon  icon={iconConfirmPassword} size={45} />
                                </span>
                            </div>
                            {err && <p className="text-red-500 mt-2">{err}</p>}
                            <button type="submit" id="btn" className="btn btn-outline-dark mt-3">Submit</button>
                    </form>
                </div>
            </div>
            </>
        ):( <Signup />)}
        </div>
    )
}
