import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect } from 'react';
import Nav from './nav';
import './allproduct.css'
import { useLocation,useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
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
      } else {
        setproducts(product.product);
      }
    }, [location.state, product]);
  const hadelnavgaiton=(product)=>{               
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
          {item.isOnSale ? ( 
                  <>
                    <div className='saleinfo'><p style={{ textDecoration: 'line-through', color: 'red' }}> {item.price}</p>
                    <p style={{  backgroundColor:'yellow'}}> {item.salePrice}</p></div>
                  </>
                ) : (
                  <p>Price: {item.price}</p>
                )}
          <h4>{item.title}</h4>
          <div className='butCon'>
                <Button variant="dark" >
              <FaShoppingCart />ADD to Cart
              </Button>
          </div>
        </div>
        </div>
      ))}
      </div>
      </div>
      </div>
  )
}
