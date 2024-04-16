import React from 'react'
import Nav from './nav';
import Video from './video';
import Sale from './sale';
import Newsunglassproducts from './newsunglassproducts';
import Sunglasses from './sunglasses';
import Showmore from './showmore';
import '../App.css';
import Usericone from './usericon'
import {useContext} from'react'
import {productContext} from '../App'




export default function Homepage() {
  
 const {isAuthenticated} = useContext(productContext)
 console.log("isAuthenticated",isAuthenticated)
 
  return (
    <div>
    <Nav />
    { isAuthenticated ? <Usericone /> : null }
    <Video />
    <section>
    <Newsunglassproducts />
    <Showmore />
    <Sale baseVelocity={-5}>Sale UP TO 50%</Sale>
    <Sale baseVelocity={5}>Sale UP TO 50%</Sale>
    <Sunglasses  />
    <Showmore />
    </section>

  </div>
   
  )
}
