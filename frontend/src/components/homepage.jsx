import React from 'react'
import Nav from './nav';
import Video from './video';
import Sale from './sale';
import Newsunglassproducts from './newsunglassproducts';
import Sunglasses from './sunglasses';
import Showmore from './showmore';
import '../App.css';
import Usericone from './usericon'




export default function Homepage() {
 
 
  return (
    <div>
    <Nav />
    <Usericone />
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
