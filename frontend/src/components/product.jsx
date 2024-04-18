import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect } from 'react';
import Nav from './nav';
import './product.css'
import { useLocation } from 'react-router-dom';
export default function Product() {
    const location = useLocation();
    const [product, setproduct] = useState([])
    useEffect(() => {
        if (location.state && location.state.results) {
            if (Array.isArray(location.state.results) && location.state.results.length > 0) {
                setproduct(location.state.results[0]); 
            } else {
                setproduct(location.state.results);
            }
        }
    }, [location.state.results]);
    const [currentImage, setCurrentImage] = useState(0); 
    const handleWheelChange = (event) => {
        const delta = Math.sign(event.deltaY); 
        const newIndex = currentImage + delta;
        if (newIndex >= 0 && newIndex < product.image.length) {
            setCurrentImage(newIndex);
        }
    };
   
  return (
    <div>
        <Nav />
        <div className='maincon'>
           
            <div className='leftcon'>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
            </div>
            <div className='imgcon'onMouseEnter={() => setCurrentImage(0)} onWheel={handleWheelChange}>
            <div className='procon'>
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
                     <h4>{product.brand}:{product.title}</h4>
                     <p>{product.price}</p>
                     <div>
                        <h4>Color :{product.color}</h4>
                        <h4>Lens :{product.lens}</h4>
                     </div>
                </div>
                <div className="rightconbottom">
                    <div>
                        <h4>size :</h4>
                    </div>
                <div className='buttuncon'>
                     {product.size  && product.size.map((size, index) => (
                     <button key={index}>{size}</button>
                        ))}
                 </div>
                </div>
            </div>
        </div>

    </div>
  )
}
