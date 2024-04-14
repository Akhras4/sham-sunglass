import React from 'react'
import { useState,useContext } from 'react'
import { productContext } from '../App'
import { useNavigate } from "react-router-dom";

export default function Newsunglassproducts() {
  const {product} = useContext(productContext);
  const [selectedCart, setSelectedToCard] = useState(null)
  const [selectedFav, setSelectedToFav] = useState(null)
  const navigate = useNavigate()
  const hadelnavgaiton=(product)=>{               
    navigate('/product', { state: { results: product } });
  }

  return (
    <div>
    <div className='newsunglass' >{product.product  && product.product.slice(0, 4).map(item => (
      <div onClick={() => hadelnavgaiton(item)}>
      <div className='newsunglasscon' key={item._id} >
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
  )
}
