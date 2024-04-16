import React from 'react'
import axios from 'axios'
import { useState,useContext, } from 'react';
import './address.css'
import {productContext} from '../App'

export default function Test() {
    const {token ,userid}=useContext(productContext)
    console.log(userid)
    console.log(token)
    const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [ country, setCountry] = useState('');
  const [err,setErr]=useState('')

 

    const handleSubmitinfo = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        axios.post( `http://localhost:8080/${userid}?token=${token}`, {
            name: name,
            street: streetAddress,
            postalCode: postalCode,
            city: city,
            country: country
        })
        .then(response => {
            console.log(response);
            window.location.href = response.data.redirect;
        })
        .catch(errors => {
            const Errors = errors.response.data.errors;
            setErr(Errors);
            console.log(Errors);
        });
    };
    return (
        <div>
            <h1>Your Address:</h1>
           
                <div>
                    <p>No Address</p>
                
                        <form onSubmit={handleSubmitinfo} >
                            <form>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        required
                                        type="text"
    
                                        name="name"
                                      
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="street-address">Street address</label>
                                    <input
                                        type="text"

                                        name="street-address"
                                 
                                        value={streetAddress}
                                        onChange={(e) => { setStreetAddress(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="postal-code">ZIP or postal code (optional)</label>
                                    <input
                                        className="postal-code"

                                        name="postal-code"
     
                                        value={postalCode}
                                        onChange={(e) => { setPostalCode(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input
                                
                                        type="text"
  
                                        name="city"
    
                                        value={city}
                                        onChange={(e) => { setCity(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country">country</label>
                                    <input
  
                                        type="text"

                                        name="country"
   
                                        value={country}
                                        onChange={(e) => { setCountry(e.target.value) }}
                                    />
                                </div>
                                <button type="submit" >Save</button>
                            </form>

                            {err && <p>{err}</p>}
                        </form>
                </div>
        </div>
)}