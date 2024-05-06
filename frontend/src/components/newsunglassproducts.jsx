import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { productContext } from '../App'
import { favContext } from './homepage'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { MdFavorite } from "react-icons/md";
export default function Newsunglassproducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {product ,isAuthenticated ,userid } = useContext(productContext);
  const{favorites}=useContext(favContext)
 const [selectedFav, setSelectedToFav] = useState(favorites)
 const [isProcessing, setIsProcessing] = useState(false);
   console.log(favorites,"favorites fromm home")
  useEffect(()=>{
    setSelectedToFav(favorites)
  },[favorites])
  const navigate = useNavigate()
  const hadelnavgaiton=(product)=>{               
    navigate('/product', { state: { results: product } });
  }
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = (productItem) => {
    setSelectedProduct(productItem);
    setShowOffcanvas(true);
  };
  const handleAddToCart = (productId) => {
    const size = "M";
    axios.post(`http://localhost:8080/cart/${userid}`,{productId,size })
    .then(response => {
      console.log(response.data);
      handleCloseOffcanvas ()
    })
    .catch(error => {
      console.log(error.response.data)
    });
};
const handleAddToWishList= (productId)=>{
  if (isProcessing) return;
  setIsProcessing(true);
  if(selectedFav!==null){  
   const findIndex= selectedFav.items.findIndex(item=>item.productId===productId)
   if(findIndex!== -1){
   axios.post(`http://localhost:8080/wishList/removeFromWishList/${userid}`,{productId})
    .then(res =>{
     setSelectedToFav(res.data.favorites)
     console.log(selectedFav)
  })
  .catch(err =>{console.log(err)})
  .finally(() => {
    // Operation completed, set isProcessing to false
    setIsProcessing(false);
  });
 }else{addToWishList(productId)}
}else{
  addToWishList(productId)
}
}
const addToWishList =(productId)=>{
  axios.post(`http://localhost:8080/wishList/${userid}`,{productId})
  .then(res=>{
   setSelectedToFav(res.data.favorites)
   console.log(selectedFav)
  })
  .catch(err =>{
    console.log(err); 
  })
  .finally(() => {
    // Operation completed, set isProcessing to false
    setIsProcessing(false);
  });
}

  return (
    <div>
    <div className='newsunglass' >{product.product  && product.product.slice(0, 4).map(item => (
      <div >
      <div className='newsunglasscon' key={item._id} >
        <img id="img" src={item.image[0]} style={{width:"100%",heigh:"80%"}} onClick={() => hadelnavgaiton(item)} />
        <p>{item.price}</p>
        <h4>{item.title}</h4>
        <div className='butCon'>
        <Button variant="dark" onClick={() => handleShowOffcanvas(item)}>
        <FaShoppingCart />ADD to Cart
        </Button>
        <MdFavorite
    onClick={() => { handleAddToWishList(item._id) }}
    style={{fontSize: '30px',cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
/>
        </div>
      </div>
      </div>
    ))}
    </div>
    <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Product Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedProduct && (
            <>
            <img src={selectedProduct.image[0]} onClick={() => hadelnavgaiton(selectedProduct)} style={{ width: "100%", height: "80%" }} />
              <h5>{selectedProduct.title}</h5>
              <h5>{selectedProduct.discription}</h5>
              <p>{selectedProduct.price}</p>
              <Button variant="primary"  onClick={() => { if( isAuthenticated ) { handleAddToCart(selectedProduct)}}}>
                Add to Cart
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
