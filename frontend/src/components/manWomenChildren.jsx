import React from 'react'
import { useState ,useEffect } from 'react'
import {motion} from 'framer-motion'
import './manWomanChild.css'
export default function ManWomenChild({titel,discrishion,sunglasses,glasses,lens,imgSrc,background}) {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        function handleScroll() {
         const threshold = 3300; 
          const currentScrollY = window.scrollY;
          // console.log('Scroll Y:', currentScrollY);
          setScrollY(currentScrollY); // Update scroll position
          if (currentScrollY > threshold) {
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
  return (
    <div className='man-woman-child-textcon'style={{backgroundColor:background}}>
      
         <motion.div
        initial={{ x: -1500 }}
        animate={{ x: isVisible ? 0 : -1200 }}
        transition={{ duration: 0.5 }}
        className='man-woman-child-text-leftcon'
      >
        <div className='man-woman-child-text-left'>
            <h1 >{titel}</h1>
            {/* <span className='span2'><img src='https://i.postimg.cc/D03CmyDG/Untitled-1.png'/></span> */}
            <p >{discrishion}</p>
            <div className="man-woman-child-button-Flex">
            <button type="submit" className="man-woman-child-mt-3">
            <div>
              <div className="man-woman-child-highlight-bg"></div>
              <div className="man-woman-child-button-text">
                {sunglasses}
              </div>
            </div>
            </button>
            <button type="submit" className="man-woman-child-mt-3">
            <div>
              <div className="man-woman-child-highlight-bg"></div>
              <div className="man-woman-child-button-text">
                {glasses}
              </div>
            </div>
            </button>
            {lens ? (
            <button type="submit" className="man-woman-child-mt-3">
            <div>
              <div className="man-woman-child-highlight-bg"></div>
              <div className="man-woman-child-button-text">
                {lens}
              </div>
            </div> 
            </button>
            ):(null)}
            </div>
        </div>
        </motion.div>
        <motion.div
        initial={{ x: 1500 }}
        animate={{ x: isVisible ? 0 : 1200 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='man-woman-child-text-right'
      >
        <div className='text-right'>
            <img src={imgSrc} alt='image' />
        </div>
        </motion.div>
    </div>
  )
}
