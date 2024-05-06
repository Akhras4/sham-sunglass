import { useEffect ,useState,useContext } from 'react'
import {productContext } from '../App'
import React  from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';

export default function Favorites() {
    const { userid, product } = useContext(productContext);
    // const [selectedFav, setSelectedToFav] = useState(null)
    const [productFav, setProductFav] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
    axios.get(`http://localhost:8080/wishList/${userid}`)
    .then((res)=>{
        setProductFav(res.data.favorites.items)
        let productIds = res.data.favorites.items.map(item => item.productId);
        getProductDetails(productIds);
    })
    .catch(err =>{
        console.log(err.message)
    })
    },[userid])
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
        setProductFav(productDetailsArray);
        console.log(productDetailsArray,"productDetailsArray");
      }
      const hadelnavgaiton=(product)=>{                //waiting to finish
        navigate('/product', { state: { results: product } });
      }
      const removeFromWishList=(productId) =>{
        axios.post(`http://localhost:8080/wishList/removeFromWishList/${userid}`,{productId})
        .then(res =>{
            console.log(res,"res")
            setProductFav(res.data.favorites)
            let productIdsRef = res.data.favorites.items.map(item => item.productId);
            getProductDetails(productIdsRef);
            console.log(productFav)
      })
      .catch(err =>{
        console.log(err)
      })
      }
      const handleAddToCart = (productId) => {
        const size = "M";
        axios.post(`http://localhost:8080/cart/${userid}`,{productId,size })
        .then(response => {
            removeFromWishList(productId)
        })
        .catch(error => {
          console.log(error.response.data)
        });
    };
  return (
    <div>
        <h1>Favorites</h1>
    { <div className='maincosh'>
    {productFav && productFav.map(product => (
      <div key={product._id} className='maincosh'>
        <div  onClick={() =>  hadelnavgaiton(product)}>
        <div className='title'>
        <h2>{product.title}</h2>
        </div>
        <div className='mahesh'>
        <img src={product.image[0]} alt={product.title} style={{width:'80px',height:'80px'}}/>
        </div> 
        <div className='det'>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Lens: {product.lens}</p>
        <p>Count: {product.count}</p>
        </div>
        </div>
        <Button variant="danger" onClick={()=> removeFromWishList(product._id)} >
              del
       </Button>
       <Button variant="primary" onClick={()=> handleAddToCart(product._id)} >
       <FaShoppingCart />ADD to Cart
       </Button>
      </div>
    ))}
    </div> }
  </div>
  )
}
