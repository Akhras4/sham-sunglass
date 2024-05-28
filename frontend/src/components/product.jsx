import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect,useRef  } from 'react';
import Nav from './nav';
import './product.css'
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios'
import Usericon from './usericon';
import { BsBookmark } from "react-icons/bs";
import Footer from './footer'
export default function Product() {
    const { userid,token, isAuthenticated }=useContext(productContext)
    const [selectedFav, setSelectedToFav] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false);
    const location = useLocation();
    const [product, setproduct] = useState([])
    useEffect(() => {
        if (location.state && location.state.results) {
            if (Array.isArray(location.state.results) && location.state.results.length > 0) {
                setproduct(location.state.results[0]);
                setSelectedToFav(location.state.favorites)
                 console.log(selectedFav)
            } else {
                setproduct(location.state.results);
                setSelectedToFav(location.state.favorites)
                console.log(selectedFav)
            }
        }
    }, [location.state.results]);
    const [currentImage, setCurrentImage] = useState(0);
    const imgContainerRef = useRef(null);
    const handleWheelChange = (event) => {
      event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const newIndex = currentImage + delta;
        const imgContainer = imgContainerRef.current;
        if (imgContainer && imgContainer.contains(event.target)) {
            event.preventDefault(); 
            if (newIndex >= 0 && newIndex < product.image.length) {
                setCurrentImage(newIndex);
            }
        }
    };
    const handleMouseEnter = () => {
      document.body.style.overflow = 'hidden';
  };
    const handleMouseLeave = () => {
      document.body.style['overflow-y'] = 'auto'
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
    }
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
        <Nav favorites={selectedFav} />
        { isAuthenticated ? <Usericon /> : null }
        <div className='maincon'>
            <div className='leftcon'>
                <h5>{product.title}</h5>
                <p>{product.description}</p>
            </div>
            <div className='imgcon'>
            <div className='procon'ref={imgContainerRef}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                onWheel={handleWheelChange}>
                <div className='bigimage'>
                {product.image && product.image[currentImage] && (
                    <img src={product.image[currentImage]} id="bigimage" />
                )}
                </div>
                <div className='smallimg-container'>
                <div className='smallimg' >
                   {product.image && product.image.map((image, index) => (
                 <img src={image} key={index} onMouseOver={() => setCurrentImage(index)}/>
                     ))}
                </div>
                </div>
            </div>
        </div>
            <div className='rightcon'>
                <div className="rightcontop">
                     <h5>{product.brand}:{product.title}</h5>
                     {product.isOnSale ? (
                      <>
                        <div className='saleinfo'>
                          <p>Price:</p>
                          <p style={{ textDecoration: 'line-through', color: 'red' }}>{product.price}</p>
                          <p style={{ backgroundColor: 'yellow' }}>{product.salePrice}</p>
                        </div>
                      </>
                    ) : (
                      <p>Price: {product.price}</p>
                    )}
                     <div>
                        <h5>Color :{product.color}</h5>
                        <h5>Lens :{product.lens}</h5>
                        {<div className="favicon">
                <BsBookmark 
                     onClick={() => { handleAddToWishList(product._id) }}
                    style={{fontSize: '30px',cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === product._id) ? 'red' : 'black' }}
                />
                </div> }
                     </div>
                </div>
                <div className="rightconbottom">
                    <div>
                        <h5>size :</h5>
                    </div>
                <div className='buttuncon'>
                     {product.size  && product.size.map((size, index) => (
                     <button key={index}>{size}</button>
                        ))}
                 </div>
                </div>
                <Button variant="dark" onClick={() => handleAddToCart(product)}>
        <FaShoppingCart />ADD to Cart
        </Button>
               
            </div>
        </div>
        <Footer />
    </div>
  )
}
