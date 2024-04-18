import React from 'react'
import { useEffect ,useContext ,useState } from 'react';
import axios from 'axios';
import {productContext} from '../App'
import Nav from './nav';
import './user.css'
import Address from './address'
import Shoppingcartuser from './shoppingcart'
export default function User() {
  const[userdetail,setuserdetail]=useState(null)
  const[useraddress,setuseraddress]=useState(null)
  const {userid,token}=useContext(productContext)
  const [activeComponent, setActiveComponent] = useState();
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${userid}?token=${token}`)
    .then(res => {
        console.log(res.data.address);
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

  return (
    <div>
      <Nav />
     <div className='main'>
          <div className='LEFT'>
            <div className='leftuser'>
                <div className='lef-us'>{userdetail && userdetail.username}</div>
                <div className='lef-us'>{userdetail && userdetail.email}</div>
             </div>  
          <div className='LEFTbtt'>
             <div className='lef-it'onClick={() => handleClick('Component2')}>shoppingbag</div>
             <div className='lef-it'>your faverit item</div>
             <div  className='lef-it' onClick={() => handleClick('Component1')}>Address</div>
            <div  className='lef-it'>your prushes</div>
          </div>
    </div>
    <div className='Right'>
    <div>
    {activeComponent === "Component1"  && (
  <Address value={useraddress}  />
)}

   {activeComponent === "Component2"  && (
  <Shoppingcartuser value={useraddress}  />
)}

</div>
    </div>

  </div>
      
    </div>

  )
}