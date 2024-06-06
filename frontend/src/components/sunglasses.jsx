import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { productContext } from '../App'
import { favContext } from './homepage'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios'
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


export default function SunglasesMan() {
  const { product, loading, userid, isAuthenticated } = useContext(productContext);
  const { favorites, getFav } = useContext(favContext);
  const [isVisible, setIsVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFav, setSelectedToFav] = useState(favorites);
  const [isProcessing, setIsProcessing] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:426px)'})
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedToFav(favorites);
    function handleScroll() {
      const threshold = 2600;
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
  }, [favorites]);

  const hadelnavgaiton = (product) => {
    navigate(`/product/${product.sort}?product=${product._id}`, { state: { results: product, favorites: selectedFav } });
  };

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = (productItem) => {
    setSelectedProduct(productItem);
    setShowOffcanvas(true);
  };

  const handleAddToCart = (productId) => {
    const size = "M";
    axios.post(`http://localhost:8080/cart/${userid}`, { productId, size })
      .then(response => {
        console.log(response.data);
        handleCloseOffcanvas();
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const handleAddToWishList = (productId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    if (selectedFav !== null) {
      const findIndex = selectedFav.items.findIndex(item => item.productId === productId);
      if (findIndex !== -1) {
        axios.post(`http://localhost:8080/wishList/removeFromWishList/${userid}`, { productId })
          .then(res => {
            setSelectedToFav(res.data.favorites);
            getFav(userid);
            console.log(selectedFav);
          })
          .catch(err => { console.log(err); })
          .finally(() => {
            setIsProcessing(false);
          });
      } else {
        addToWishList(productId);
      }
    } else {
      addToWishList(productId);
    }
  };

  const addToWishList = (productId) => {
    axios.post(`http://localhost:8080/wishList/${userid}`, { productId })
      .then(res => {
        setSelectedToFav(res.data.favorites);
        getFav(userid);
        console.log(selectedFav);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleMove = (direction) => {
    const container = document.querySelector('.sunglassconSale');
    const scrollStep = container.offsetWidth / 1;
    if (direction === 'left') {
      container.scrollLeft -= scrollStep;
    } else if (direction === 'right') {
      container.scrollLeft += scrollStep;
    }
  };

  const ProductImage = ({ productItem }) => {
    const [imageSrc, setImageSrc] = useState(productItem.image[0]);

    const handleMouseEnterImg = () => {
      if (productItem.image[1]) {
        setImageSrc(productItem.image[1]);
      }
    };

    const handleMouseLeaveImg = () => {
      setImageSrc(productItem.image[0]);
    };
    let fontSizeMobile = isTabletOrMobile ?'23px':'30px'
    return (
      <div className='sunglass'>
        <div className='sunglasscontent' onClick={() => hadelnavgaiton(productItem)}>
          <img
            className='imageflex'
            src={imageSrc}
            style={{ width: "100%", height: "80%" }}
            onMouseEnter={handleMouseEnterImg}
            onMouseLeave={handleMouseLeaveImg}
          />
          <h5>{productItem.title}</h5>
          {productItem.isOnSale ? (
            <>
              <div className='saleinfo'>
                <p>Price:</p>
                <p style={{ textDecoration: 'line-through', color: 'red' }}>{productItem.price}</p>
                <p style={{ backgroundColor: 'yellow' }}>{productItem.salePrice}</p>
              </div>
            </>
          ) : (
            <p>Price: {productItem.price}</p>
          )}
        </div>
        <div id="fav" onClick={() => { handleAddToWishList(productItem._id) }}>
          <MdFavorite
            className="hoverEffect"
            style={{
              fontSize:`${fontSizeMobile}`,
              borderColor: 'black',
              cursor: isProcessing ? "" : 'pointer',
              color: selectedFav && selectedFav.items.some(items => items.productId === productItem._id) ? 'red' : 'white'
            }}
          />
        </div>
        <div className='butCon'>
        {isTabletOrMobile ?(<FontAwesomeIcon icon={faCartShopping} size="68px"   onClick={() => handleShowOffcanvas(productItem)} />):(
          <Button variant="primary" onClick={() => handleShowOffcanvas(productItem)}>
            <FaShoppingCart />ADD to Cart
          </Button>
        )}
        </div>
      </div>
    );
  };

  return (
    <div className='sunglassMainCo'>
      
      <motion.div
        initial={{ x: -1600 }}
        animate={{ x: isVisible ? 0 : -1500 }}
        transition={{ duration: 0.5 }}
      >
        <div className='sunglassconSale'>
        <div className="arrowButtons-left">
        <button onClick={() => handleMove('left')}>{'<'}</button>
      </div>
      <div className="arrowButtons-right">
        <button onClick={() => handleMove('right')}>{'>'}</button>
      </div>
          {!loading && product.product && product.product.filter(sort => sort.sort === "man").map(productItem => (
            <ProductImage key={productItem.id} productItem={productItem} />
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
              <img onClick={() => hadelnavgaiton(selectedProduct)} src={selectedProduct.image[0]} style={{ width: "90%", height: "60%" }} />
              <h5>{selectedProduct.title}</h5>
              <h5>{selectedProduct.color}</h5>
              {selectedProduct.isOnSale ? (
                <>
                  <div className='saleinfo'>
                    <p>Price:</p>
                    <p style={{ textDecoration: 'line-through', color: 'red' }}>{selectedProduct.price}</p>
                    <p style={{ backgroundColor: 'yellow' }}>{selectedProduct.salePrice}</p>
                  </div>
                </>
              ) : (
                <p>Price: {selectedProduct.price}</p>
              )}
              <Button variant="primary" onClick={() => { if (isAuthenticated) { handleAddToCart(selectedProduct._id) } }}>
                Add to Cart
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}


