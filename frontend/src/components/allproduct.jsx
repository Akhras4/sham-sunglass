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
import AllproductEyewear from './allproducteyewear'
import AllproductContact from './allproductcontact'
import ShowmoreDown from './ahowmoredown';
import Showmore from './showmore';
export default function Allproduct() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {product ,isAuthenticated ,userid } = useContext(productContext);
    // const{favorites }=useContext(favContext)
    const [selectedFav, setSelectedToFav] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false);
    const location = useLocation();
    const [products, setproducts] = useState([])
    const [sort,setSort]=useState()
    const navigate = useNavigate()
    const gridAreaNames = [
      'a', 'b',  
      'c', 'd', 'e', 
      'f', 'g', 'h',
      'i', 'j', 'k',
      'l', 'm', 'n',
      'o','p', 'q',
      'r', 's', 't',
      'u', 'v', 'w',
      'x', 'y', 'z',
      'aa', 'ab', 'ac',
      'ad', 'ae','af',
      'ag', 'ah', 'ai',
      'aj', 'ak', 'al',
      'am','an'
  ];
    useEffect(() => {
      if (location.state && location.state.results) {
        setproducts(location.state.results);
        setSelectedToFav(location.state.favorites)
        setSort(location.state.sort)
        console.log(selectedFav,"location.state.favorites")
      } else {
        setproducts(product.product);
        setSelectedToFav(location.state.favorites)
        console.log(location.state.favorites,"location")
      }
    }, [location.state, product]);
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
};
const [itemsToShow, setItemsToShow] = useState(4);
const handleShowMore = () => {
  if (itemsToShow === 4) {
    setItemsToShow(10);
  } else {
    setItemsToShow(itemsToShow + 10 > 29 ? 29 : itemsToShow + 10);
  }
};
const handleShowLess = () => {
  if (itemsToShow <= 10) {
    setItemsToShow(4);
  } else {
    setItemsToShow(itemsToShow - 10);
  }
};
useEffect(() => {
    const video = document.querySelector('.grid-vid');
    if (video) {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;

      // Log to confirm the video element is correctly selected
      console.log('Video element:', video);

      // Check if the video can be played
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
      <Nav favorites={selectedFav}/>
      <div className='allproductcon'> 
      { isAuthenticated ? <Usericon /> : null }
      <div className='continer'>
        <div className='newsunglassAll' >
          {sort == "Man" && (
                <img className="grid-image"  src='http://localhost:8080/public/images/manimggrid.jpeg' />
            )}
          {products  && products.slice(0, 29).map((item, index) => (
            <div key={item._id} style={{ gridArea: gridAreaNames[index % gridAreaNames.length],display: (itemsToShow > index || itemsToShow === 29) ? 'block' : 'none'   }}  >
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
                <Button variant="dark" onClick={() => handleShowOffcanvas(item)} >
                  <FaShoppingCart />ADD to Cart
                </Button>
                <MdFavorite
                    className="hoverEffect"
                    onClick={() => { handleAddToWishList(item._id) }}
                    style={{fontSize: '30px',cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
                />
                </div>
              </div>
            </div> 
      ))}
      {sort == "Man" && (
                <video className="grid-vid"   autoPlay muted loop 
                 style={{ display: (itemsToShow > 25 ) ? 'block' : 'none'   }} >
                  <source src="http://localhost:8080/public/video/rb-hp-hero-icons-d-data.mp4" type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
      )}
      </div>
      </div>
      {29 > 4 && (
        <div className='but-allprouduct-showmore'>
          {itemsToShow < 29 && (
            <ShowmoreDown state={`Show More`} handleShowMore={handleShowMore} />
          )}
          {itemsToShow == 29 && (
            <Showmore />
          )}
          {itemsToShow > 4 && (
            <ShowmoreDown state="Show Less" handleShowMore={handleShowLess} />
          )}
        </div>
      )}
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
        itemsToShow={itemsToShow}
        sort={sort}
        ProductImage={ProductImage}
      />
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
        itemsToShow={itemsToShow}
        sort={sort}
        ProductImage={ProductImage}
      />
      </div>
      <Footer />
      </div>
  )
}
