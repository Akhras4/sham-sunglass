import axios from 'axios'
import React, { useState ,useEffect ,useContext} from 'react'
import {productContext } from '../App'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { MdRemoveShoppingCart } from "react-icons/md";

export default function Shoppingcartuser() {
  const { userid, product } = useContext(productContext);
  const [shoppingcart, setShoppingCart] = useState([]);
  const [productShoppingCart, setProductShoppingCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:8080/cart/${userid}`)
      .then(res => {
         setShoppingCart(res.data.shoppingCart.items);
        // console.log(res.data.shoppingCart)
        let productIds = res.data.shoppingCart.items.map(item => item.productId);
        getProductDetails(productIds);
          console.log(productIds,"productIds")
      })
      .catch(err => {
        console.log(err);
      });
  }, [userid]);
  const getProductDetails = (productIds) => {
    const productCounts = {};
    let totalPrice = 0;
    productIds.forEach(productId => {
      productCounts[productId] = (productCounts[productId] || 0) + 1 ;
      console.log(productCounts ,"productCounts");
    });
    const productDetailsArray = productIds.reduce((acc, productId) => {
      const productItem = product.product.find(product => product._id === productId);
      if (productItem) {
        const existingProductIndex = acc.findIndex(item => item._id === productId);
        if (existingProductIndex !== -1) {
          acc[existingProductIndex].count = productCounts[productId];
        } else {
          acc.push({ ...productItem, count: productCounts[productId] });
        }
        const itemPrice = productItem.isOnSale ? Number(productItem.salePrice) : Number(productItem.price)
        console.log(itemPrice,"itemPrice")
        totalPrice += itemPrice ; 
        setTotal(totalPrice);
      }
      return acc;
    }, []);
    setProductShoppingCart(productDetailsArray);
    console.log(productDetailsArray);
  }
  const removeFromCart =(productId) =>{
      axios.post(`http://localhost:8080/removeFromCart/${userid}`,{productId})
      .then(res => {
        setShoppingCart(res.data.shoppingCart.items);
        console.log(res.data.shoppingCart)
       let productIdsRef = res.data.shoppingCart.items.map(item => item.productId);
       getProductDetails(productIdsRef);
       if (res.data.shoppingCart.items.length === 0) {
        setTotal(0); 
    }
     })
     .catch(err => {
       console.log(err);
     });
    }
  const hadelnavgaiton=(product)=>{                //waiting to finish
    navigate('/product', { state: { results: product} });
  }

  return (
  <div >
    <div className='shopping-Con'>
    <div className='maincosh'>
    <h1>Shopping Cart</h1>
    {productShoppingCart.map(product => (
      <div key={product._id} className='maincoshitem'>
        <div  >
        <div className='title'>
        <h4>{product.title}</h4>
        </div>
        <div className='content'>
        <div className='mahesh' onClick={() =>  hadelnavgaiton(product)}>
        <img src={product.image[0]} alt={product.title} style={{width:'150px',height:'150px'}}/>
        </div> 
        <div className='det'>
        <p>Category: {product.category}</p>
        {product.isOnSale ? ( 
                  <>
                    <div className='saleinfo'><p style={{ textDecoration: 'line-through', color: 'red' }}> {product.price}</p>
                    <p style={{  backgroundColor:'yellow'}}> {product.salePrice}</p></div>
                  </>
                ) : (
                  <p>Price: {product.price}</p>
        )}
        <p>Lens: {product.lens}</p>
        <p>Count: {product.count}</p>
        </div>
        <div>
        <MdRemoveShoppingCart  style={{color:'red',fontSize: '30px',marginLeft:'40px'}} onClick={()=> removeFromCart(product._id)}/>
          </div>
        </div>
        </div>
        
      </div>
    ))}
    </div>
    <div className='order-Detail'>
    <h1>Order Detail</h1>
    <div className='order-Detail-content'>
    <h4>total </h4>
    <p>Subtotal : { total }</p>
    <p> Delivery : { total }</p>
    <p>Total (VAT included) : { total }</p>
    <Button variant="primary" >
              Go To Checkout 
      </Button>
    </div>
    </div>
    </div>
  </div>
  );
}