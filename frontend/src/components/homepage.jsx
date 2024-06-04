import React from 'react'
import Nav from './nav';
import Video from './video';
import Sale from './sale';
import Newsunglassproducts from './newsunglassproducts';
import SunglassesMan from './sunglasses';
import Showmore from './showmore';
import '../App.css';
import Usericone from './usericon'
import {useContext,useEffect,createContext,useState, useRef} from'react'
import {productContext} from '../App'
import Text from './text'
import axios from 'axios'
import Footer from './footer'
import SunglasesWomen from './womenbar'
import ManWomanChild from './manWomenChildren'
import TopButton from './topbutton'

export  const favContext = createContext()

export default function Homepage() {
 const {isAuthenticated,userid,product} = useContext(productContext)
 const[favorites,setFavorites]=useState(null)
 const womanSectionRef = useRef(null);
 const manSectionRef = useRef(null);
 const kidsSectionRef = useRef(null);
 const [currentSection, setCurrentSection] = useState('woman');

 useEffect(()=>{
  getFav(userid)
 },[userid  ])
 const getFav=(userid)=>{
  axios.get(`http://localhost:8080/wishList/${userid}`)
  .then(res => {
    if (res.data && res.data.favorites) {
      setFavorites(res.data.favorites);
      console.log("favorites home", res.data.favorites);
    } else {
      console.log("No favorites found");
    }
  })
  .catch(err => {
    console.error("Error fetching favorites:", err);
  });
};
useEffect(() => {
  const handleScroll = () => {
    const womanSectionRect = womanSectionRef.current.getBoundingClientRect();
    const kidsSectionRect = kidsSectionRef.current.getBoundingClientRect();
    const manSectionRect = manSectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (womanSectionRect.top >= 0 && womanSectionRect.bottom <= windowHeight) {
      setCurrentSection('woman');
    }
    if (manSectionRect.top >= 0 && manSectionRect.bottom <= windowHeight) {
      setCurrentSection('man');
    }
    else if (kidsSectionRect.top >= 0 && kidsSectionRect.bottom <= windowHeight) {
      setCurrentSection('kids');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
let y=0


  return (
    <div>
    <favContext.Provider value={{favorites,getFav }} >
    <Nav />
    { isAuthenticated ? <Usericone /> : null }
    <Video />
    <section>
      <Text />
      </section>
      <section>
      <Sale baseVelocity={5}>
      <span style={{ color: 'black', }}>ALL NEW</span>
      </Sale>
      <Sale baseVelocity={-5}>
        <span style={{ color: 'black',marginBottom:'40px' }}>SAM OPTIK</span>
      </Sale>
      </section>
      <section>
      <Newsunglassproducts />
      <Showmore />
      </section>
      <section>
      <Sale baseVelocity={-5}>Sale UP TO 50%</Sale>
      <Sale baseVelocity={5}>Sale UP TO 50%</Sale>
      <SunglassesMan  />
      <Showmore product={Object.values(product).flat().filter(product=>product.sort==="man")} sort={"Man"} />
    </section>
    
    <section >
    <div ref={womanSectionRef}>Woman Section</div>
    <ManWomanChild 
      titel={'WOMAN'} 
      discrishion={'Wide skies, soft sand and warm air: we have captured the Sicilian summer for you in a limited edition sunglasses collection. Discover three of our favourite sunnies in a fresh and unique colourway.'} 
      sunglasses={'Sunglass'} 
      glasses={'EYEWEAR'} 
      lens={'CONTACT LENSES'} 
      imgSrc={'http://localhost:8080/public/images/womanbar.jpeg'} 
      background={'#ddbbb9'}
      product={Object.values(product).flat().filter(product=>product.sort==="women")}
      sort="woman"
    />
    <Sale baseVelocity={5}>
      <span style={{ color: 'pink' }}>WOMAN : SUNGLASSES OPTIC LENSS</span>
    </Sale>
    <SunglasesWomen />
    <Showmore product={Object.values(product).flat().filter(product=>product.sort==="women")} sort={"Woman"} />
    </section>
    <section  >
    <div ref={manSectionRef}>man Section</div>
    <ManWomanChild 
      titel={'MAN'} 
      discrishion={'Wide skies, soft sand and warm air: we have captured the Sicilian summer for you in a limited edition sunglasses collection. Discover three of our favourite sunnies in a fresh and unique colourway.'} 
      sunglasses={'SUNGLASSES'} 
      glasses={'EYEWEAR'} 
      lens={'CONTACT LENSES'} 
      imgSrc={'http://localhost:8080/public/images/manbar.jpeg'} 
      background={'#8bb9d1'}
      product={Object.values(product).flat().filter(product=>product.sort==="man")}
      sort="man"
    />
    <Sale baseVelocity={5}>
      <span style={{ color: '#95a8b2' }}>MAN : SUNGLASSES OPTIC LENSS</span>
    </Sale>
    <SunglassesMan  />
    <Showmore product={Object.values(product).flat().filter(product=>product.sort==="man")} sort={"Man"} />
    </section>
    <section  >
    <div ref={kidsSectionRef}>Kids Section</div>
    <ManWomanChild 
      titel={'KIDS'} 
      discrishion={'Wide skies, soft sand and warm air: we have captured the Sicilian summer for you in a limited edition sunglasses collection. Discover three of our favourite sunnies in a fresh and unique colourway.'} 
      sunglasses={'SUNGLASSES'} 
      glasses={'EYEWEAR'}  
      imgSrc={'http://localhost:8080/public/images/kidsbar.jpeg'} 
      background={'#f4c770'}
      product={Object.values(product).flat().filter(product=>product.sort==="kids")}
      sort="kids"
    />
    <Sale baseVelocity={5}>
    <span >
      <span style={{ color: '#f2d7a4' }}>KIDS</span>
      <span style={{ color: '#e5d1e2' }}>:</span>
      <span style={{ color: '#fdc0c8' }}>SUNGLASSES</span>
      <span style={{ color: '#eded9a' }}>OPTIC</span>
    </span>
    </Sale>
    <SunglasesWomen />
    <Showmore product={Object.values(product).flat().filter(product=>product.sort==="man")} sort={"Man"} />
    </section> 
    <TopButton
     setCurrentSection={setCurrentSection}
     currentSection={currentSection}
      Section1Ref={womanSectionRef}
      Section2Ref={manSectionRef}/>
    <Footer />
    </favContext.Provider>
  </div>
   
  )
}
