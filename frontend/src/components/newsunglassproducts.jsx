import React from 'react'
import { useState,useContext } from 'react'
import { productContext } from '../App'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';


export default function Newsunglassproducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {product ,isAuthenticated ,userid} = useContext(productContext);
  const [selectedCart, setSelectedToCard] = useState(null)
  const [selectedFav, setSelectedToFav] = useState(null)
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
