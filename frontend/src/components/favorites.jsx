import { useEffect ,useState,useContext } from 'react'
import {productContext } from '../App'
import React  from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';
import './user.css'
import { MdRemoveShoppingCart } from "react-icons/md";
export default function Favorites({selectedFav,setSelectedToFav}) {
    const { userid, product } = useContext(productContext);
    //  const [selectedFav, setSelectedToFav] = useState(null)
    const [productFav, setProductFav] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
    axios.get(`http://localhost:8080/wishList/${userid}`)
    .then((res)=>{
        setProductFav(res.data.favorites.items)
        setSelectedToFav(res.data.favorites)
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
        navigate(`/product/${product.sort}?product=${product._id}`, { state: { results: product, favorites: selectedFav } });
      }
      const removeFromWishList=(productId) =>{
        axios.post(`http://localhost:8080/wishList/removeFromWishList/${userid}`,{productId})
        .then(res =>{
            // console.log(res,"res")
            setProductFav(res.data.favorites)
            setSelectedToFav(res.data.favorites);
            let productIdsRef = res.data.favorites.items.map(item => item.productId);
            getProductDetails(productIdsRef);
            // console.log(productFav,'productFav')
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
      <div className='fav-Con'>
      <h1>Favorites</h1>
        <div className='mainFavco'>
          {productFav && productFav.map(product => (
            <div key={product._id} className='maincofavitem'>
                 <div className='title'>
                  <h4>{product.title}</h4>
                 </div>
                <div className='content' onClick={() => hadelnavgaiton(product)}>
                  <div className='mahefav' >
                    <img src={product.image[0]} alt={product.title} style={{width:'150px',height:'150px'}} />
                  </div>
                  <div className='det'>
                    <p>Category: {product.category}</p>
                    <p>Lens: {product.lens}</p>
                    {product.isOnSale ? ( 
                  <>
                    <div className='saleinfo'>
                    <p>Price:</p>
                    <p style={{ textDecoration: 'line-through', color: 'red' }}> {product.price}</p>
                    <p style={{  backgroundColor:'yellow'}}> {product.salePrice}</p></div>
                  </>
                ) : (
                  <p>Price: {product.price}</p>
                  )}
                  <p>Delever At: {product.deleveryAt}</p>
                  </div>
                </div>

                <Button variant="primary" onClick={() => handleAddToCart(product._id)} className="addBtn" >
                  <FaShoppingCart />ADD to Cart
                </Button>
                <div className='delet-fav'>
                  <MdRemoveShoppingCart style={{ color: 'red', fontSize: '30px', marginLeft: '30px' }} onClick={() => removeFromWishList(product._id)} />
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
