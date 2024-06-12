import React from 'react'
import { useEffect ,useContext ,useState } from 'react';
import axios from 'axios';
import {productContext} from '../App'
import Nav from './nav';
import './user.css'
import Address from './address'
import Shoppingcartuser from './shoppingcart'
import Favorites from './favorites'
import {useLocation} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Bar from './bar'
import Userdetails from './userdetails';
export default function User() {
  const[userdetail,setuserdetail]=useState(null)
  const[useraddress,setuseraddress]=useState(null)
  const {userid,token,product}=useContext(productContext)
  const [activeComponent, setActiveComponent] = useState("Component2");
  const [selectedFav, setSelectedToFav] = useState(null)
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width:769px)'})
  const handleClick = (component) => {
    setActiveComponent(component);
  };
  useEffect(() => {
    // console.log('token',token)
    axios.get(`http://localhost:8080/user/${userid}?token=${token}`)
    .then(res => {
        // console.log(res.data.address);
        setuserdetail(res.data);
        setuseraddress(res.data.address);
    })
    .catch(err => {
        console.error("Error:", err);
        if (err.response && err.response.data && err.response.data.redirect) {
            window.location.href = err.response.data.redirect;
        }
    });
}, []);
//  useEffect(() => {
//    if (location.state && location.state.results) {
//      setSelectedToFav(location.state.favorites)
//      console.log(location.state.favorites,"location.state.favorites")
//    } else {
//      setSelectedToFav(location.state.favorites)
//      console.log(location.state.favorites,"fromser")
//    }
//  }, [location.state])

 useEffect(() => {
  axios.get(`http://localhost:8080/wishList/${userid}`)
  .then(res => {
    if (res.data && res.data.favorites) {
      setSelectedToFav(res.data.favorites);
      console.log("favorites home", res.data.favorites);
    } else {
      console.log("No favorites found");
    }
  })
  .catch(err => {
    console.error("Error fetching favorites:", err);
  });
}, []);

  return (
    <div>
      <Nav favorites={selectedFav} />
      <Bar selectedFav={selectedFav} product={product} />
     <div className='main'>
          <div className='LEFT'>
            {/* <div className='leftuser'>
                <div className='lef-us'>{userdetail && userdetail.username}</div>
                <div className='lef-us'>{userdetail && userdetail.email}</div>
             </div>   */}
          <div className='LEFTbtt'>
            <div className='lef-it'onClick={() => handleClick('userdetail')}>User Details</div>
             <div className='lef-it'onClick={() => handleClick('Component2')}>shoppingbag</div>
             <div className='lef-it'onClick={() => handleClick('Component3')}>your faverit item</div>
             <div  className='lef-it' onClick={() => handleClick('Component1')}>Address</div>
             <div  className='lef-it'>your Order</div>
             <div  className='lef-it'>your prushes</div>
          </div>
    </div>
    <div className='Right'>
        {activeComponent === "Component1"  && (
        <Address value={useraddress}   />
    )}
      {activeComponent === "Component2"  && (
      <Shoppingcartuser useraddress={useraddress} selectedFav={selectedFav} setSelectedToFav={setSelectedToFav}  />
    )}
      {activeComponent === "Component3"  && (
      <Favorites value={useraddress} selectedFav={selectedFav} setSelectedToFav={setSelectedToFav} />
      )}
      {activeComponent === "userdetail"  && (
        <Userdetails userdetail={userdetail} setuserdetail={setuserdetail} />
    )}
</div>
</div>
    </div>

  )
}