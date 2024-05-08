import React from 'react'
import { useState ,useEffect } from 'react'
import {motion} from 'framer-motion'
import './text.css'
import Vertically from './verticallybar';
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
            {/* <span className='span2'><img src='https://i.postimg.cc/D03CmyDG/Untitled-1.png'/></span> */}
            <span className='span3'>OPTIK</span>
            
        </div>
        </motion.div>
        <p>Explore Trendy Sunglasses Styles</p>
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
        <Vertically baseVelocity={-5}>
         <img src="https://i.postimg.cc/ydYVdgdg/image-54-2.png" />
         <img src="https://i.postimg.cc/hvnbCDNc/image-54-8.png" />
         <img src="https://i.postimg.cc/P5fLSpxS/image-54-9.png" />
         <img src="https://i.postimg.cc/7647hV8H/image-54-6.png" />
         <img src="https://i.postimg.cc/d17M788f/image-54-3.png" />
         <img src="https://i.postimg.cc/MHQ8LyHB/image-54-7.png" />
         <img src="https://i.postimg.cc/7647hV8H/image-54-6.png" />
         </Vertically>
        {/* <Vertically baseVelocity={5}>Sale UP TO 50%</Vertically> */}
    </div>
  )
}
