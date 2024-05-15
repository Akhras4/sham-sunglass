import React from 'react'
import './usericon.css'
import {productContext} from '../App'
import { useNavigate } from 'react-router-dom';
import { favContext } from './homepage'
import {useContext,useEffect,useState} from 'react'
export default function Usericon() {
  const{favorites}=useContext(favContext) || {}
  const [Fav,setFav]=useState(favorites)
  useEffect(()=>{
    console.log("Favorites from context:", favorites); // Log context value for debugging
    if (favorites) {
        setFav(favorites); // Update state when favorites change
    }
  },[])
  console.log("navfav", favorites);
console.log("navfav", Fav);
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
