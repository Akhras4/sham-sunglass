import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {motion} from 'framer-motion'
import { productContext } from '../App'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios'
import { FaShoppingCart } from 'react-icons/fa';


export default function Sunglasses( ) {
  const { product, loading, userid } = useContext(productContext);
  const [isVisible, setIsVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    function handleScroll() {
      const threshold = 1600;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const hadelnavgaiton=(product)=>{                //waiting to finish
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
    })
    .catch(error => {
      console.log(error.response.data)
    });
};
 
    return (
      <div className='sunglassMainCo'>
      <motion.div
        initial={{ x: -1500 }}
        animate={{ x: isVisible ? 0 : -1500 }}
        transition={{ duration: 0.5 }}
      >
        <div className='sunglasscon'>
          {!loading && product.product && product.product.map(productItem => (
            <div key={productItem.id}>
              <div className='sunglass'onClick={() =>  hadelnavgaiton(productItem)}>
                <img src={productItem.image[0]} style={{ width: "100%", height: "80%" }} />
                <h5>{productItem.title}</h5>
                <p>{productItem.price}</p>
              </div>
              <Button variant="primary" onClick={() => handleShowOffcanvas(productItem)}>
              <FaShoppingCart />ADD to Cart
                </Button>
            </div>
          ))}
        </div>
      </motion.div>
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Product Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {selectedProduct && (
          <>
              <img onClick={() => hadelnavgaiton(selectedProduct)} src={selectedProduct.image[0]} style={{ width: "100%", height: "80%" }} />
            <h5>{selectedProduct.title}</h5>
            <h5>{selectedProduct.color}</h5>
            <Button variant="primary" onClick={() => {handleAddToCart(selectedProduct);handleCloseOffcanvas()}} >
              Add to Cart
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  </div>
);
}

