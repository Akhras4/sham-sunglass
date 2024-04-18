import axios from 'axios'
import React, { useState ,useEffect ,useContext} from 'react'
import {productContext } from '../App'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
export default function Shoppingcartuser() {
  const { userid, product } = useContext(productContext);
  const [shoppingcart, setShoppingCart] = useState([]);
  const [productShoppingCart, setProductShoppingCart] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8080/cart/${userid}`)
      .then(res => {
         setShoppingCart(res.data.shoppingCart.items);
        // console.log(res.data.shoppingCart)
        const productIds = res.data.shoppingCart.items.map(item => item.productId);
        getProductDetails(productIds);
        //  console.log(getProductDetails,"productIds")
      })
      .catch(err => {
        console.log(err);
      });
  }, [userid]);

  const getProductDetails = (productIds) => {
    const productCounts = {};
    productIds.forEach(productId => {
      productCounts[productId] = (productCounts[productId] || 0) + 1;
    });
    const productDetailsArray = productIds.reduce((acc, productId) => {
      const productItem = product.product.find(product => product._id === productId);
      if (productItem) {
        const existingProduct = acc.find(item => item._id === productId);
        if (existingProduct) {
          existingProduct.count += 1;
        } else {
          acc.push({ ...productItem, count: productCounts[productId] });
        }
      }
      return acc;
    }, []);
    setProductShoppingCart(productDetailsArray);
    console.log(productDetailsArray);
  };
  const hadelnavgaiton=(product)=>{                //waiting to finish
    navigate('/product', { state: { results: product } });
  }
  return (
  <div >
    <h1>Shopping Cart</h1>
    <div className='maincosh'>
    {productShoppingCart.map(product => (
      
      <div key={product._id} className='maincosh' onClick={() =>  hadelnavgaiton(product)}>
        <div className='title'>
        <h2>{product.title}</h2>
        </div>
        <div className='mahesh'>
        <img src={product.image[0]} alt={product.title} style={{width:'50px',height:'50px'}}/>
        </div>
        <div className='det'>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Lens: {product.lens}</p>
        <p>Count: {product.count}</p>
        </div>
      </div>
    ))}
    <Button variant="primary" >
              pay
      </Button>
    </div>
    
  </div>
  );
}