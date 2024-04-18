import React from 'react'
import { useState ,useEffect } from 'react'
import {motion} from 'framer-motion'
import './text.css'
export default function Text() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        function handleScroll() {
          const threshold = 50;
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
  return (
    <div className='textcon'>
         <motion.div
        initial={{ x: -1500 }}
        animate={{ x: isVisible ? 0 : -1200 }}
        transition={{ duration: 0.5 }}
        className='text-leftcon'
      >
        <div className='text-left'>
            <span className='span1'>SAM</span>
            <span className='span2'>OPTIK</span>
            
        </div>
        </motion.div>
        <p>Explore Trendy Sunglasses Styles</p>
        <motion.div
        initial={{ x: 1500 }}
        animate={{ x: isVisible ? 0 : 1200 }}
        transition={{ duration: 0.5,delay: 0.3 }}
        className='text-right'
      >
        <div className='text-right'>
            <img src="https://i.postimg.cc/nrLTFWGF/Photo-by-Toa-Heftiba-on-Unsplash.jpg" alt='image' />
        </div>
        </motion.div>
    </div>
  )
}
