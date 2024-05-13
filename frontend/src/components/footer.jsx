import React from 'react'
import './footer.css'
import { IoMdHelpCircleOutline } from "react-icons/io";
import { CiDeliveryTruck,CiLocationOn } from "react-icons/ci";
import { MdOutlinePayment,MdContactMail  } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BiSolidContact  } from "react-icons/bi";
export default function Footer() {
  return (
    <div className="footerCon">
        <div className='footerConMain'>
        <div>
            <h3><IoMdHelpCircleOutline />Help & Contact</h3>
            <p>See all help topics</p>
            <p>Refunds</p>
            <p>Returns</p>
            <p>Delivery</p>
            <p>Paying by invoice</p>
            <p>Subscribe to newsletter</p>
        </div>
        <div >
            <h3><CiDeliveryTruck />Our partners</h3>
            <div className='img-con-footer'>
            <img src="http://localhost:8080/public/images/postnl-3.svg" alt="postnl" width={'50px'} height={'50px'} />
            <img src="http://localhost:8080/public/images/dhl-1.svg" alt="dhl" width={'50px'} height={'50px'} />
            <p></p>
            <p></p>
            <p></p>
            <p></p>
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
        <div className='Privacy'>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <div>
              <p>Follow us on</p>
                 <div className='img-con-footer'>
                 <img src="http://localhost:8080/public/images/facebook-4.svg" alt="facebook" width={'50px'} height={'50px'} />
                 <img src="http://localhost:8080/public/images/instagram-2016-5.svg" alt="instagram" width={'50px'} height={'50px'} />
                 </div>
            </div>
            <p>Copyright © 2022 </p>
        </div>
    </div>
  )
}
