import axios from 'axios'
import React, { useState ,useEffect ,useContext} from 'react'
import {productContext} from '../App'
import {motion} from 'framer-motion'
export default function Shoppingcartuser() {
  const { userid, product } = useContext(productContext);
  const [shoppingcart, setShoppingCart] = useState([]);
  const [productShoppingCart, setProductShoppingCart] = useState([]);

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
  return (
  <div>
 {productShoppingCart.map(product => (
      <div key={product._id}>
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Lens: {product.lens}</p>
        <p>Count: {product.count}</p>
      </div>
    ))}
  </div>
  );
}