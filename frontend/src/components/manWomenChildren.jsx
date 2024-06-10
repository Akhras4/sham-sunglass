import React from 'react'
import { useState ,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import './manWomanChild.css'
import { favContext } from './homepage'

export default function ManWomenChild({titel,
  discrishion,
  sunglasses,
  glasses,
  lens,
  imgSrc,
  background,
  product,
  sort,
  SectionRef,
  
}) {
    const [scrollY, setScrollY] = useState(0);
    const{favorites}=useContext(favContext)|| []
    const navigate =useNavigate()
    const [selectedFav, setSelectedToFav] = useState(favorites)
    let cat=''
    useEffect(()=>{
        setSelectedToFav(favorites)
    },[favorites])
  
      const handleNavigation=(cat)=>{
        const productcat=Object.values(product).flat().filter(product=>product.category===cat);
        console.log(productcat)      
        navigate(`/products/${sort}/${cat}`, { state: { results: productcat,
          favorites:selectedFav,
          sort:sort } });
      }
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const handleScroll = () => {
          const sectionRect = SectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
    
          if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [SectionRef]);
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
            <button type="submit" className="man-woman-child-mt-3"
            onClick={()=>{ handleNavigation(cat="Sunglass")}}>
            <div>
              <div className="man-woman-child-highlight-bg"></div>
              <div className="man-woman-child-button-text">
                {sunglasses}
              </div>
            </div>
            </button>
            <button type="submit" className="man-woman-child-mt-3"
            onClick={()=>{ handleNavigation(cat="Eyewear")}}>
            <div>
              <div className="man-woman-child-highlight-bg"></div>
              <div className="man-woman-child-button-text">
                {glasses}
              </div>
            </div>
            </button>
            {lens ? (
            <button type="submit" className="man-woman-child-mt-3"
            id="man-woman-child-mt-3-lens"
            onClick={()=>{ handleNavigation(cat="contactlens")}}>
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
