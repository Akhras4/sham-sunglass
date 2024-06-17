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
import Orders from './orders'
export default function User() {
  const[userdetail,setuserdetail]=useState(null)
  const[useraddress,setuseraddress]=useState(null)
  const {userid,token,product}=useContext(productContext)
  const [activeComponent, setActiveComponent] = useState('shoppingbag');
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
            <div className='lef-it'onClick={() => handleClick('Details')}>User Details</div>
             <div className='lef-it'onClick={() => handleClick('shoppingbag')}>shoppingbag</div>
             <div className='lef-it'onClick={() => handleClick('faverit')}>your faverit item</div>
             <div  className='lef-it' onClick={() => handleClick('Address')}>Address</div>
             <div  className='lef-it'onClick={() => handleClick('Orders')}>your Order</div>
             <div  className='lef-it'>your prushes</div>
          </div>
    </div>
    <div className='Right'>
        {activeComponent === "Address"  && (
        <Address useraddress={useraddress}  setuseraddress={setuseraddress}  />
    )}
      {activeComponent === "shoppingbag"  && (
      <Shoppingcartuser useraddress={useraddress} selectedFav={selectedFav} setSelectedToFav={setSelectedToFav}  />
    )}
      {activeComponent === "faverit"  && (
      <Favorites value={useraddress.address} selectedFav={selectedFav} setSelectedToFav={setSelectedToFav} />
      )}
      {activeComponent === "Details"  && (
        <Userdetails userdetail={userdetail} setuserdetail={setuserdetail} />
    )}
     {activeComponent === "Orders"  && (
        <Orders userid={userid} token={token} product={product} selectedFav={selectedFav} setSelectedToFav={setSelectedToFav} />
    )}
</div>
</div>
    </div>

  )
}