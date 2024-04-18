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
import Text from './text'




export default function Homepage() {
  
 const {isAuthenticated} = useContext(productContext)

 
  return (
    <div>
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

  </div>
   
  )
}
