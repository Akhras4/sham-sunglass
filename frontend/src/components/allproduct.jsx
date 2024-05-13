import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect } from 'react';
import Nav from './nav';
import './allproduct.css'
import { useLocation,useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
 import { favContext } from './homepage';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Usericon from './usericon';
import { MdFavorite } from "react-icons/md";
import Footer from './footer'
export default function Allproduct() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {product ,isAuthenticated ,userid } = useContext(productContext);
    // const{favorites }=useContext(favContext)
    const [selectedFav, setSelectedToFav] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false);
    const location = useLocation();
    const [products, setproducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
      if (location.state && location.state.results) {
        setproducts(location.state.results);
        setSelectedToFav(location.state.favorites)
        console.log(selectedFav,"location.state.favorites")
      } else {
        setproducts(product.product);
        setSelectedToFav(location.state.favorites)
        console.log(location.state.favorites,"location")
      }
    }, [location.state, product]);
    // useEffect(()=>{
    //   setSelectedToFav(favorites)
    //   console.log('favorites from product',favorites)
    // },[favorites])
  const hadelnavgaiton=(product)=>{               
    navigate('/product', { state: { results: product ,favorites:selectedFav } });
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
    <div > 
    
      <Nav favorites={selectedFav}/>
      <div className='allproductcon'> 
      { isAuthenticated ? <Usericon /> : null }
      <div className='continer'>
        <div className='newsunglassAll' >{products  && products.slice(0, 40).map(item => (
            <div className='newsunglassconAll' key={product._id} >
              <img id="img" src={item.image[0]} style={{ width: "100%", heigh: "80%" }} onClick={()=>hadelnavgaiton(item)} />
              {item.isOnSale ? (
                <>
                  <div className='saleinfo'><p>Price:</p><p style={{ textDecoration: 'line-through', color: 'red' }}> {item.price}</p>
                    <p style={{ backgroundColor: 'yellow' }}> {item.salePrice}</p></div>
                </>
              ) : (
                <p>Price: {item.price}</p>
              )}
              <h4>{item.title}</h4>
              <div className='butCon'>
                <Button variant="dark" onClick={() => handleShowOffcanvas(item)} >
                  <FaShoppingCart />ADD to Cart
                </Button>
                <MdFavorite
                    onClick={() => { handleAddToWishList(item._id) }}
                    style={{fontSize: '30px',cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
                />
              </div>
            </div>
      ))}
      </div>
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
      <Footer />
      </div>
  )
}
