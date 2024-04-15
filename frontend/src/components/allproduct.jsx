import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect } from 'react';
import Nav from './nav';
import './allproduct.css'
import { useLocation,useNavigate } from 'react-router-dom';
export default function Allproduct() {
    const {product} = useContext(productContext);
    const location = useLocation();
    const [selectedCart, setSelectedToCard] = useState(null)
    const [selectedFav, setSelectedToFav] = useState(null)
    const [products, setproducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
      if (location.state && location.state.results) {
        setproducts(location.state.results);
        console.log(location.state.results)
      } else {
        setproducts(product.product);
      }
    }, [location.state, product]);
   
  console.log(location.state)
  const hadelnavgaiton=(product)=>{ 
    console.log(product)              
    navigate('/product', { state: { results: product } });
  }
  return (
    <div> 
      <Nav />
      <div className='continer'>
        <div className='newsunglassAll' >{products  && products.slice(0, 40).map(item => (
        <div onClick={()=>hadelnavgaiton(item)}>
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
