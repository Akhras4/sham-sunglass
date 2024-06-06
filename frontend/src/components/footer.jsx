import React, { useState }  from 'react'
import './footer.css'
import { IoIosTabletPortrait, IoMdHelpCircleOutline } from "react-icons/io";
import { CiDeliveryTruck,CiLocationOn } from "react-icons/ci";
import { MdOutlinePayment,MdContactMail  } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BiSolidContact  } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import { useMediaQuery } from 'react-responsive'

export default function Footer() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width:576px)'})
    const [menuOpen, setMenuOpen] = useState(false);
    const imgSize=isTabletOrMobile ?"30px":"50px";

    const handleToggle = (isOpen) => {
      setMenuOpen(isOpen);
    };
  return (
    <div>
<div className={`footerCon ${menuOpen ? 'menu-open' : ''}`}>
      <>
        {isTabletOrMobile ? (
          <>
            <Dropdown drop="down" onToggle={handleToggle}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '100vw', height: 'fit-content' }}>
                Help & Contact
              </Dropdown.Toggle>
              <Dropdown.Menu className="fixed-dropdown-menu" style={{ width: '100vw' }}
              >
                <Dropdown.Item href="#/action-1">See all help topics</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Refunds</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Returns</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Delivery</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Subscribe to newsletter</Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown drop="down">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '100vw', height: 'max-content',textAlign:'left' }}>
                    Our partners
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="fixed-dropdown-menu" style={{ width: '100vw' }}>
                  <div className="dropdown-row">
                    <Dropdown.Item href="#/action-1">
                      <img src="http://localhost:8080/public/images/postnl-3.svg" alt="postnl" width="30px" height="30px" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <img src="http://localhost:8080/public/images/dhl-1.svg" alt="dhl" width="30px" height="30px" />
                    </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown drop="down">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '100vw',textAlign:'left' }}>
                    Our payment methods
                  </Dropdown.Toggle>
                  <Dropdown.Menu  style={{ width: '100vw' }}>
                  <div className="dropdown-row">
                    <Dropdown.Item href="#/action-1">
                      <img src="http://localhost:8080/public/images/ideal.svg" alt="ideal" width="30px" height="30px" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <img src="http://localhost:8080/public/images/mastercard-4.svg" alt="mastercard" width="30px" height="30px" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      <img src="http://localhost:8080/public/images/paypal-3.svg" alt="paypal" width="30px" height="30px" />
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4">
                      <img src="http://localhost:8080/public/images/visa-4.svg" alt="visa" width="30px" height="30px" />
                    </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown drop="down">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '100vw',textAlign:'left' }}>
                    Contact Us
                  </Dropdown.Toggle>
                  <Dropdown.Menu  style={{ width: '100vw' }}>
                    <Dropdown.Item href="#/action-1">Turkey:</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Germany:</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Netherlands:</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">Mail</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
        <div className='footerConMain'>
        <div>
            <h3><IoMdHelpCircleOutline />Help & Contact</h3>
            <p>See all help topics</p>
            <p>Refunds</p>
            <p>Returns</p>
            <p>Delivery</p>
            <p>Subscribe to newsletter</p>
        </div>
        <div >
            <h3><CiDeliveryTruck />Our partners</h3>
            <div className='img-con-footer'>
            <img src="http://localhost:8080/public/images/postnl-3.svg" alt="postnl" width={'50px'} height={'50px'} />
            <img src="http://localhost:8080/public/images/dhl-1.svg" alt="dhl" width={'50px'} height={'50px'} />
            </div>
        </div>
        <div ></div>
        <div>
            <h3><MdOutlinePayment />Our payment methods</h3>
            <div className='img-con-footer'>
            <img src="http://localhost:8080/public/images/ideal.svg" alt="ideal" width={'50px'} height={'50px'} />
            <img src="http://localhost:8080/public/images/mastercard-4.svg" alt="mastercard" width={'50px'} height={'50px'} />
            <img src="http://localhost:8080/public/images/paypal-3.svg" alt="paypal" width={'50px'} height={'50px'} />
            <img src="http://localhost:8080/public/images/visa-4.svg" alt="visa" width={'50px'} height={'50px'} />
            <p></p>
            </div>
        </div>
        <div  >
            <h3><CiLocationOn  />Our Branch</h3>
        </div>
        <div>
            <h3><BiSolidContact />Contact Us</h3>
            <h4> <FaWhatsapp />whats up</h4>
            <h5>Turkey:</h5>
            <h5>Germany:</h5>
            <h5>Netherlands:</h5>
            <h4><MdContactMail />Mail</h4>
            <h4></h4>
        </div>
        </div>
        )}
        </>
        
        <div className='Privacy'>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <div>
              <p>Follow us on</p>
                 <div className='img-con-footer'>
                 <img src="http://localhost:8080/public/images/facebook-4.svg" alt="facebook" width={`${imgSize}`} height={'50px'} />
                 <img src="http://localhost:8080/public/images/instagram-2016-5.svg" alt="instagram" width={`${imgSize}`}height={'50px'} />
                 </div>
            </div>
            <p>Copyright © 2022 </p>
        </div>
        </div>
   
    </div>
  )
}
