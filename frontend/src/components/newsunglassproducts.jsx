import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { productContext } from '../App'
import { favContext } from './homepage'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { MdFavorite } from "react-icons/md";
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
export default function Newsunglassproducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { product, isAuthenticated, userid } = useContext(productContext);
  const { favorites, getFav } = useContext(favContext) || { favorites: null }
  const [selectedFav, setSelectedToFav] = useState(favorites)
  const [isProcessing, setIsProcessing] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:426px)'})
  console.log(favorites, "favorites fromm home")
  useEffect(() => {
    setSelectedToFav(favorites)
  }, [favorites])
  const navigate = useNavigate()
  const hadelnavgaiton = (product) => {
    navigate(`/product/${product.sort}?product=${product._id}`, { state: { results: product, favorites: selectedFav } });
  }
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
        handleCloseOffcanvas()
      })
      .catch(error => {
        console.log(error.response.data)
      });
  };
  const handleAddToWishList = (productId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    if (selectedFav !== null) {
      const findIndex = selectedFav.items.findIndex(item => item.productId === productId)
      if (findIndex !== -1) {
        axios.post(`http://localhost:8080/wishList/removeFromWishList/${userid}`, { productId })
          .then(res => {
            setSelectedToFav(res.data.favorites)
            getFav(userid)
            console.log(selectedFav)
          })
          .catch(err => { console.log(err) })
          .finally(() => {
            setIsProcessing(false);
          });
      } else { addToWishList(productId) }
    } else {
      addToWishList(productId)
    }
  }
  const addToWishList = (productId) => {
    axios.post(`http://localhost:8080/wishList/${userid}`, { productId })
      .then(res => {
        setSelectedToFav(res.data.favorites)
        getFav(userid)
        console.log(selectedFav)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }
  const ProductImage = ({ item }) => {
    const [imageSrc, setImageSrc] = useState(item.image[0]);

    const handleMouseEnter = () => {
      if (item.image[1]) {
        setImageSrc(item.image[1]);
      }
    };

    const handleMouseLeave = () => {
      setImageSrc(item.image[0]);
    };
    let fontSizeMobile = isTabletOrMobile ?'20px':'30px'
    return (
      <div className='newsunglasscon' key={item._id} >
        <img id="img" style={{ width: "100%", heigh: "80%" }}
          src={imageSrc}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => hadelnavgaiton(item)} />
        <p>{item.price}</p>
        <h4>{item.title}</h4>
        <div className='butCon'>
        {isTabletOrMobile ?(<FontAwesomeIcon icon={faCartShopping} size="68px"   onClick={() => handleShowOffcanvas(item)} />): (
          <Button variant="dark" onClick={() => handleShowOffcanvas(item)}>
            <FaShoppingCart />ADD to Cart
          </Button>
        )}
        </div>
        <div id="fav" onClick={() => { handleAddToWishList(item._id) }}>
          <MdFavorite
            className="hoverEffect"
            style={{
              fontSize:`${fontSizeMobile}`,
              cursor: isProcessing ? "" : 'pointer',
              color: selectedFav && selectedFav.items && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'white'
            }}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='newsunglass' >{product.product && product.product.slice(0, 6).map(item => (
        <div >
          <ProductImage key={item.id} item={item} />
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
              <Button variant="primary" onClick={() => { if (isAuthenticated) { handleAddToCart(selectedProduct) } }}>
                Add to Cart
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
