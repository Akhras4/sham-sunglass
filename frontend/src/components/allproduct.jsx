import React from 'react'
import { productContext } from '../App'
import { useContext,useState } from 'react';
import Nav from './nav';
import './allproduct.css'
export default function Allproduct() {
    const {product} = useContext(productContext);
    const [selectedCart, setSelectedToCard] = useState(null)
    const [selectedFav, setSelectedToFav] = useState(null)
    const hadelnavgaiton=(id)=>{                //waiting to finish 
    }
  return (
    <div> 
      <Nav />
      <div className='continer'>
        <div className='newsunglassAll' >{product.product  && product.product.slice(0, 40).map(item => (
        <div onClick={hadelnavgaiton(item._id)}>
        <div className='newsunglassconAll' key={product._id} >
          <img id="img" src={item.image[0]} style={{width:"100%",heigh:"80%"}} />
          <p>{item.price}</p>
          <h4>{item.title}</h4>
          <div className='butCon'>
          <button className='cart' onClick={() => setSelectedToCard(item._id)}>Card</button>
          <button className='fav' onClick={() => setSelectedToFav(item._id)}>Fav</button>
          </div>
        </div>
        </div>
      ))}
      </div>
      </div>
      </div>
  )
}
