import React from 'react'
import Nav from './nav';
import Video from './video';
import Sale from './sale';
import Newsunglassproducts from './newsunglassproducts';
import SunglassesMan from './sunglasses';
import Showmore from './showmore';
import '../App.css';
import Usericone from './usericon'
import {useContext,useEffect,createContext,useState} from'react'
import {productContext} from '../App'
import Text from './text'
import axios from 'axios'
import App from '../App'
import Footer from './footer'
import SunglasesWomen from './womenbar'



export  const favContext = createContext()

export default function Homepage() {
 const {isAuthenticated,userid} = useContext(productContext)
 const[favorites,setFavorites]=useState(null)
 useEffect(()=>{
  getFav(userid)
 },[userid  ])
 const getFav=(userid)=>{
  axios.get(`http://localhost:8080/wishList/${userid}`)
  .then(res => {
    if (res.data && res.data.favorites) {
      setFavorites(res.data.favorites);
      console.log("favorites home", res.data.favorites);
    } else {
      console.log("No favorites found");
    }
  })
  .catch(err => {
    console.error("Error fetching favorites:", err);
  });
};
 

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
      <SunglassesMan  />
      <Showmore />
    </section>
    <section>
    <SunglasesWomen />
    </section>
    <Footer />
    </favContext.Provider>
  </div>
   
  )
}
