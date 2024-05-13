import React from 'react'
import Nav from './nav';
import Video from './video';
import Sale from './sale';
import Newsunglassproducts from './newsunglassproducts';
import Sunglasses from './sunglasses';
import Showmore from './showmore';
import '../App.css';
import Usericone from './usericon'
import {useContext,useEffect,createContext,useState} from'react'
import {productContext} from '../App'
import Text from './text'
import axios from 'axios'
import App from '../App'
import Footer from './footer'



export  const favContext = createContext()

export default function Homepage() {
 const {isAuthenticated,userid} = useContext(productContext)
 const[favorites,setFavorites]=useState(null)
 useEffect(()=>{
  getFav(userid)
 },[userid  ])
 const getFav=(userid)=>{
  axios.get(`http://localhost:8080/wishList/${userid}`)
  .then(res =>{
    setFavorites(res.data.favorites)
    console.log("favorites home",res.data.favorites)
  })
  .catch(err =>{
    console.log(err)
  })
 }

  return (
    <div>
    <favContext.Provider value={{favorites,getFav }} >
    <Nav />
    { isAuthenticated ? <Usericone /> : null }
    <Video />
    <section>
      <Text />
      <Sale baseVelocity={5}>
      <span style={{ color: 'black' }}>ALL THE NEW</span>
      </Sale>
      <Sale baseVelocity={-5}>
        <span style={{ color: 'black',marginBottom:'40px' }}>SAM OPTIK</span>
      </Sale>
      <Newsunglassproducts />
      <Showmore />
      <Sale baseVelocity={-5}>Sale UP TO 50%</Sale>
      <Sale baseVelocity={5}>Sale UP TO 50%</Sale>
      <Sunglasses  />
      <Showmore />
    </section>
    <Footer />
    </favContext.Provider>
  </div>
   
  )
}
