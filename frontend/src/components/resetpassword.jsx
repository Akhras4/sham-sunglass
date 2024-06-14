import React, { useState, useEffect } from 'react';
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
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('mdi:eye-off');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token,setToken]=useState('')
    const [userid,setuserId]=useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleToggle = () => {
        if (type === 'password') {
            setType('text');
            setIcon('mdi:eye');
        } else {
            setType('password');
            setIcon('mdi:eye-off');
        };
    }
    useEffect(()=>{
        document.title = "Reset Password";
    },[])
    const handelSubmit=()=>{
        if(password!==confirmPassword){
        }
            axios.post('http://localhost:8080/Resetpassword',{password})
    }
    useEffect(()=>{
        console.log('Initial token:', token);
        console.log('All Cookies:', Cookies.get());
        let tokenInfo=Cookies.get('tokenResetPassword')
        console.log("tokenResetPassword :",tokenInfo)
        if (tokenInfo) {
            const decodedToken = jwtDecode(tokenInfo);
            // console.log('Decoded token:', decodedToken);
            const userId = decodedToken.userId;
            console.log("userId :",userId)
            if (decodedToken.exp * 1000 < Date.now()) {
                Cookies.remove('tokenResetPassword', { path: '/ResetPassword' });
                setToken(null); 
                setuserId(null); 
                setIsAuthenticated(false); 
            } else {
                setuserId(userId);
                setIsAuthenticated(true);
            }
        }
    },[token,userid])

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
                    <form onSubmit={(e)=>handelSubmit()}>
                            <label htmlFor="password">Password</label>
                            <div className="">
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
                                    className="block w-full pr-10 p-2 border border-gray-300 rounded asd"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={handleToggle}
                                >
                                    <Icon icon={icon} size={45} />
                                </span>
                            </div>
                            <label htmlFor="confirmPassword">Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type={type}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete="current-password"
                                    enterKeyHint="next"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => { setPassword(e.target.value); setErr(''); }}
                                    className="block w-full pr-10 p-2 border border-gray-300 rounded asd"
                                />
                                <span
                                    // className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={handleToggle}
                                >
                                    <Icon icon={icon} size={45} />
                                </span>
                            </div>
                    </form>
                </div>
            </div>
            </>
        ):( <Signup />)}
        </div>
    )
}
