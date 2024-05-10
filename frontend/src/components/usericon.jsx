import React from 'react'
import './usericon.css'
import {productContext} from '../App'
import { useNavigate } from 'react-router-dom';
import { favContext } from './homepage'
import {useContext,useEffect,useState} from 'react'
export default function Usericon() {
  const{favorites}=useContext(favContext)||[]
  const [Fav,setFav]=useState(favorites)
  useEffect(()=>{
    setFav(favorites)
    console.log("userfav",favorites)
  },[favorites])
  console.log("userfav",favorites)
    const navgat =useNavigate()
    const{userid}=React.useContext(productContext)
    const userId=userid
    const handelclick=()=>{
      navgat('/user',{state:{results:userId, favorites:Fav}})
    }
  return (
    <div>
        <div className='usericoncon' onClick={()=>{handelclick()}}>
            <img className='imageuser' src='https://i.postimg.cc/T3kCPZSw/user.png' alt='ggg'  />
        </div>
    </div>
  )
}
