import React from 'react'
import './usericon.css'
import {productContext} from '../App'
import { useNavigate } from 'react-router-dom';
export default function Usericon() {
    const navgat =useNavigate()
    const{userid}=React.useContext(productContext)
    const userId=userid
    const handelclick=()=>{
      navgat('/user',{state:userId})
    }
  return (
    <div>
        <div className='usericoncon' onClick={()=>{handelclick()}}>
            <img className='imageuser' src='https://i.postimg.cc/T3kCPZSw/user.png' alt='ggg'  />
        </div>
    </div>
  )
}
