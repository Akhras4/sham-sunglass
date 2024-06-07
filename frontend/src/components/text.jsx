import React from 'react'
import { productContext } from '../App'
import { useContext,useState,useEffect,useRef } from 'react';
import {motion} from 'framer-motion'
import './text.css'
import Vertically from './verticallybar';
import { useNavigate } from 'react-router-dom';
import { favContext } from './homepage'
import { useMediaQuery } from 'react-responsive'
import useScrollPosition from '../custom hook/scrollposition';
export default function Text(
  {isVisible,
  setIsVisible,}
) {
  const {product ,isAuthenticated ,userid } = useContext(productContext);
    // const [isVisible, setIsVisible] = useState(false);
    const{favorites}=useContext(favContext)|| []
    const navigate =useNavigate()
    const [selectedFav, setSelectedToFav] = useState(favorites)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width:769px)'})

    const containerRef = useRef(null);
    useEffect(()=>{
        setSelectedToFav(favorites)
    },[favorites])
    const handleNavigation=(productMan,sort)=>{             
      navigate(`/products/${sort}`, { state: { results: productMan,favorites:selectedFav,sort:sort } });
    } 
    useEffect(() => {
      const handleScroll = () => {
        const SectionRect=containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (SectionRect.top >= 0) {
          setIsVisible(true) 
        } else if( SectionRect.bottom <= 20) {
          setIsVisible(false);
        }
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isVisible]);

      const initialX = isTabletOrMobile ? -1000 : -1500;
  return (
    <div className='textcon'ref={containerRef}  >
         <motion.div
        initial={{ x: initialX  }}
        animate={{ x: isVisible ? 0 : -1200 }}
        transition={{ duration: 0.5 }}
        className='text-leftcon'
      >
        <div className='text-left'>
            <span className='span1'>SAM</span>
            {/* <span className='span2'><img src='https://i.postimg.cc/D03CmyDG/Untitled-1.png'/></span> */}
            <span className='span3'>OPTIK</span>
            <div className="button-Flex">
            <button type="submit" className="mt-3" onClick={()=>{ console.log(product);handleNavigation(product.product.filter(product=>product.sort=="man"),"Man")}}>
            <div>
              <div className="highlight-bg"></div>
              <div className="button-text">
                Man
              </div>
            </div>
            </button>
            <button type="submit" className="mt-3"onClick={()=>{ handleNavigation(product.product.filter(product=>product.sort=="women"),"Woman")}}>
            <div>
              <div className="highlight-bg"></div>
              <div className="button-text">
                WOMEN
              </div>
            </div>
            </button>
            <button type="submit" className="mt-3"onClick={()=>{ console.log(product);handleNavigation(product.product.filter(product=>product.sort=="man"),"kids")}}>
            <div>
              <div className="highlight-bg"></div>
              <div className="button-text">
                CHILDREN
              </div>
            </div> 
            </button>
            </div>
        </div>
        </motion.div>
        <p>Explore Trendy Sunglasses Styles</p>
        {isTabletOrMobile ?(null):(
        <motion.div
        initial={{ x: 1500 }}
        animate={{ x: isVisible ? 0 : 1200 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-right'
      >
        <div className='text-right'>
            <img src="https://i.postimg.cc/nrLTFWGF/Photo-by-Toa-Heftiba-on-Unsplash.jpg" alt='image' />
        </div>
        </motion.div>
        )}
        {/* <Vertically baseVelocity={-5}>
         <img src="https://i.postimg.cc/ydYVdgdg/image-54-2.png" />
         <img src="https://i.postimg.cc/hvnbCDNc/image-54-8.png" />
         <img src="https://i.postimg.cc/P5fLSpxS/image-54-9.png" />
         <img src="https://i.postimg.cc/7647hV8H/image-54-6.png" />
         <img src="https://i.postimg.cc/d17M788f/image-54-3.png" />
         <img src="https://i.postimg.cc/MHQ8LyHB/image-54-7.png" />
         <img src="https://i.postimg.cc/7647hV8H/image-54-6.png" />
         </Vertically> */}
        {/* <Vertically baseVelocity={5}>Sale UP TO 50%</Vertically> */}
    </div>
  )
}
