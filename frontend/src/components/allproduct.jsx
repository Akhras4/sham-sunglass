import React from 'react'
import { productContext } from '../App'
import { useContext, useState, useEffect ,useRef } from 'react';
import Nav from './nav';
import './allproduct.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import Usericon from './usericon';
import { MdFavorite } from "react-icons/md";
import Footer from './footer'
import AllproductEyewear from './allproducteyewear'
import AllproductContact from './allproductcontact'
import ShowmoreDown from './ahowmoredown';
import Showmore from './showmore';
import TopButton from './topbutton'
import Bar from './bar'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
export default function Allproduct() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { product, isAuthenticated, userid } = useContext(productContext);
  // const{favorites }=useContext(favContext)
  const [selectedFav, setSelectedToFav] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const [products, setproducts] = useState([])
  const [sort, setSort] = useState()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:666px)'})
  const isMobile = useMediaQuery({ query: '(max-width:426px)'})
  let fontSizeMobile = isMobile ?'20px':'30px'
  let size = isMobile ?('20px'):(isTabletOrMobile ? ('30px') : ('20px'))


  const gridAreaNames = [
    'a', 'b',
    'c', 'd', 'e',
    'f', 'g', 'h',
    'i', 'j', 'k',
    'l', 'm', 'n',
    'o', 'p', 'q',
    'r', 's', 't',
    'u', 'v', 'w',
    'x', 'y', 'z',
    'aa', 'ab', 'ac',
    'ad', 'ae', 'af',
    'ag', 'ah', 'ai',
    'aj', 'ak', 'al',
    'am', 'an'
  ];
  const Section1Ref = useRef(null);
  const Section2Ref = useRef(null);
  const [currentSection, setCurrentSection] = useState('Eyewear');
  useEffect(() => {
    if (location.state && location.state.results) {
      setproducts(location.state.results);
      setSelectedToFav(location.state.favorites)
      setSort(location.state.sort)
      console.log(selectedFav, "location.state.favorites")
    } else {
      setproducts(product.product);
      setSelectedToFav(location.state.favorites)
      console.log(location.state.favorites, "location")
    }
  }, [location.state, product]);
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
        console.log(selectedFav)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  const [itemsToShowSunglass, setItemsToShowSunglass] = useState(4);
  const [itemsToShowEyewear, setItemsToShowEyewear] = useState(4);
  const [itemsToShowContactlens, setItemsToShowContactlens] = useState(4);
  const handleShowMore = (itemsToShow, setItemsToShow) => {
    setItemsToShow(prevItems => (prevItems === 4 ? 10 : Math.min(prevItems + 10, 29)));
  };

  const handleShowLess = (itemsToShow, setItemsToShow) => {
    setItemsToShow(prevItems => (prevItems <= 10 ? 4 : prevItems - 10));
  };
  useEffect(() => {
    const video = document.querySelector('.grid-vid');
    if (video) {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      console.log('Video element:', video);
      video.play().catch(error => {
        console.error('Error trying to play the video:', error);
      });
    }
  }, []);
  const ProductImage = ({ item }) => {
    const [imageSrc, setImageSrc] = useState(item.image[0]);

    const handleMouseEnterImg = () => {
      if (item.image[1]) {
        setImageSrc(item.image[1]);
      }
    };

    const handleMouseLeaveImg = () => {
      setImageSrc(item.image[0]);
    };
  useEffect(() => {
    const handleScroll = () => {
    const EyewearSectionRect = Section1Ref.current.getBoundingClientRect();
    const ContactLensSectionRect = Section2Ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (EyewearSectionRect.top >= 0 && EyewearSectionRect.bottom <= windowHeight) {
          setCurrentSection('Eyewear');
    }
    else if (ContactLensSectionRect.top >= 0 && ContactLensSectionRect.bottom <= windowHeight) {
          setCurrentSection('ContactLens');
    }
    };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);   
    return (
      <img
        id="img"
        src={imageSrc}
        style={{ width: "100%", height: "80%" }}
        onClick={() => hadelnavgaiton(item)}
        onMouseEnter={handleMouseEnterImg}
        onMouseLeave={handleMouseLeaveImg}
      />
    );
  };
  return (
    <div>
      <Bar
      product={product}
      selectedFav={selectedFav}
       />
      <Nav favorites={selectedFav} />
      <div className='allproductcon'>
        {isAuthenticated ? <Usericon /> : null}
        <div className='continer'>
          <div className='newsunglassAll' >
            {sort === "Man" && (
              <img className="grid-image" src='http://localhost:8080/public/images/manimggrid.jpeg' />
            )}
            {products && products.slice(0, 29).filter(product=>product.category==="Sunglass").map((item, index) => (
              <div key={item._id} style={{ gridArea: gridAreaNames[index % gridAreaNames.length], display: (itemsToShowSunglass > index || itemsToShowSunglass === 29) ? 'block' : 'none' }}  >
                <div className='newsunglassconAll'>
                  <ProductImage item={item} />
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
                  {isTabletOrMobile ?(<FontAwesomeIcon icon={faCartShopping} style={{ fontSize: size }}    onClick={() => handleShowOffcanvas(item)} />): (
                    <Button variant="dark" onClick={() => handleShowOffcanvas(item)} >
                      <FaShoppingCart />ADD to Cart
                    </Button>
                  )}
                  </div>
                  <div id="fav" onClick={() => { handleAddToWishList(item._id) }}>
                  <MdFavorite
                      className="hoverEffect"
                      style={{ fontSize:`${fontSizeMobile}`, cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
                    />
                    </div>
                </div>
              </div>
            ))}
            {sort === "Man" && (
              <video className="grid-vid" autoPlay muted loop
                style={{ display: (itemsToShowSunglass > 25) ? 'block' : 'none' }} >
                <source src="http://localhost:8080/public/video/rb-hp-hero-icons-d-data.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
        {29 > 4 && (
          <div className='but-allprouduct-showmore'>
            {itemsToShowSunglass < 29 && (
              <ShowmoreDown state={`Show More`} handleShowMore={() => {handleShowMore(itemsToShowSunglass,setItemsToShowSunglass)}} />
            )}
            {itemsToShowSunglass === 29 && (
              <Showmore />
            )}
            {itemsToShowSunglass > 4 && (
              <ShowmoreDown state="Show Less" handleShowMore={() => {handleShowLess(itemsToShowSunglass,setItemsToShowSunglass)}} />
            )}
          </div >
        )}
        <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Product Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {selectedProduct && (
              <>
                <img src={selectedProduct.image[0]} onClick={() => hadelnavgaiton(selectedProduct)} style={{ width: "100%", height: "80%" }} alt='image' />
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
        <div ref={Section1Ref}>Eyewear Section</div>
        <AllproductEyewear
          products={products}
          handleShowOffcanvas={handleShowOffcanvas}
          handleAddToCart={handleAddToCart}
          handleAddToWishList={handleAddToWishList}
          hadelnavgaiton={hadelnavgaiton}
          isProcessing={isProcessing}
          selectedFav={selectedFav}
          isAuthenticated={isAuthenticated}
          handleShowMore={handleShowMore}
          handleShowLess={handleShowLess}
          gridAreaNames={gridAreaNames}
          itemsToShowEyewear={itemsToShowEyewear}
          setItemsToShowEyewear={setItemsToShowEyewear}
          sort={sort}
          ProductImage={ProductImage}
          size={size}
          fontSizeMobile={fontSizeMobile}
          isTabletOrMobile={isTabletOrMobile}
          isMobile={isMobile}
          
        />
        <div ref={Section2Ref}>ContactLens Section</div>
        <AllproductContact
          products={products}
          handleShowOffcanvas={handleShowOffcanvas}
          handleAddToCart={handleAddToCart}
          handleAddToWishList={handleAddToWishList}
          hadelnavgaiton={hadelnavgaiton}
          isProcessing={isProcessing}
          selectedFav={selectedFav}
          isAuthenticated={isAuthenticated}
          handleShowMore={handleShowMore}
          handleShowLess={handleShowLess}
          gridAreaNames={gridAreaNames}
          itemsToShowContactlens={itemsToShowContactlens}
          setItemsToShowContactlens={setItemsToShowContactlens}
          sort={sort}
          ProductImage={ProductImage} 
          size={size}
          fontSizeMobile={fontSizeMobile}
          isTabletOrMobile={isTabletOrMobile}
          isMobile={isMobile}
        />
      </div>
      <TopButton setCurrentSection={setCurrentSection} currentSection={currentSection} Section1Ref={Section1Ref}/>
      <Footer  />
    </div>
  )
}
