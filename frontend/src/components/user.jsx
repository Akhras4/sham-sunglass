import React from 'react'
import { useEffect ,useContext ,useState } from 'react';
import axios from 'axios';
import {productContext} from '../App'
import Nav from './nav';
import './user.css'
import Address from './address'
export default function User() {
  const[userinfo,setuserinfo]=useState([])
  const {userid,token}=useContext(productContext)
  const [activeComponent, setActiveComponent] = useState('Component1');
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${userid}?token=${token}`)
    .then(res => {
        console.log(res.data);
        setuserinfo(res.data);
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
                <div className='lef-us'>{userinfo && userinfo.username}</div>
                <div className='lef-us'>{userinfo && userinfo.email}</div>
             </div>  
          <div className='LEFTbtt'>
             <div className='lef-it'onClick={() => handleClick('Component1')}>shoppingbag</div>
             <div className='lef-it'>your faverit item</div>
             <div  className='lef-it' onClick={() => handleClick('Component2')}>Address</div>
            <div  className='lef-it'>your prushes</div>
          </div>
    </div>
    <div className='Right'>
    <div>
    {activeComponent === "Component1"  && (
  <Address val={userinfo} userid={userid} />
)}
</div>
    </div>

  </div>
      
    </div>

  )
}