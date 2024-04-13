import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import { productContext } from '../App'


export default function Sunglasses( ) {
  const { product, loading } = useContext(productContext);
  console.log(product)
  console.log(loading)
  const [selectedCart, setSelectedToCard] = useState(null)
  const [selectedFav, setSelectedToFav] = useState(null)
  const [isVisible, setIsVisible] = useState(false);
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
  const hadelnavgaiton=(id)=>{                //waiting to finish
      
  }
  return (
    <div className='sunglassMainCo'>
    <motion.div
    initial={{ x: -1500 }}
    animate={{ x: isVisible ? 0 : -1500 }}
    transition={{ duration: 0.5 }}
  >
        <div className='sunglasscon'>
            {!loading && product.product && product.product.map(product => (
                <div key={product.id} onClick={() => hadelnavgaiton(product.id)}>
                    <form>
                        <div className='sunglass'>
                            <h5>{product.title}</h5>
                            <p>{product.price}</p>
                            <div className='butCon'>
                                <button className='cart' onClick={() => setSelectedToCard(product.id)}>Card</button>
                                <button className='fav' onClick={() => setSelectedToFav(product.id)}>Fav</button>
                            </div>
                        </div>
                    </form>
                </div>
            ))}
        </div>
        </motion.div>
    </div>

);
}

