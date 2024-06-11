import React from 'react'
import axios from 'axios'
import { useState, useRef,useContext ,useEffect } from 'react';
import './address.css'
import {productContext} from '../App'
import validateAddress from './validateAddress'
import CloseButton from 'react-bootstrap/CloseButton';
export default function Address(value) {
    const {token,userid}= useContext(productContext)
    const [address,setaddress]=useState([value])
    console.log("address",address)
    const dialogRef = useRef(null);
    const [name, setName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [ country, setCountry] = useState('');
    const [err,setErr]=useState('')
    useEffect(() => {
        if (value) {
            setaddress(value);
            // console.log(value)   
        }
    }, [value]);

    const showDialog = () => {
        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        setErr('')
        dialogRef.current.close();
    };
    const handleSubmitinfo = (e) => {
        e.preventDefault(); 
        const fullAddress = `${streetAddress}, ${city}, ${postalCode}, ${country}`;
        console.log("fullAddress",fullAddress)
        validateAddress(userid,fullAddress)
        .then(({ isValid, errorMessage }) => {
            if (!isValid) {
              setErr(errorMessage);
              return;
            }
           
        axios.post( `http://localhost:8080/${userid}?token=${token}`, {
            name: name,
            street: streetAddress,
            postalCode: postalCode,
            city: city,
            country: country
        })
        .then(response => {
            console.log(response);
            setaddress(response.data.address);
            closeDialog();
            
        })
        .catch(errors => {
            const Errors = errors.response.data.errors;
            setErr(Errors);
        });
    }).catch((err) =>{
        setErr(err);         
    })
    
    };
    return (
        <div className='addressCon'>
        <h1>Your Address:</h1>
        {(address && address.value && address.value.length > 0) || (address && address.length > 0) ? (
    <>
        {address && address.length > 0 ? (
            address.map(addressItem => (
                <div key={addressItem._id} className='addressDetail'>
                    <p>Name: {addressItem.name}</p>
                    <p>Street: {addressItem.street}</p>
                    <p>Postal Code: {addressItem.postalCode}</p>
                    <p>City: {addressItem.city}</p>
                    <p>Country: {addressItem.country}</p>
                </div>
            ))
        ) : (
            address.value.map(addressItem => (
                <div key={addressItem._id} className='addressDetail'>
                    <p>Name: {addressItem.name}</p>
                    <p>Street: {addressItem.street}</p>
                    <p>City: {addressItem.city}</p>
                    <p>Postal Code: {addressItem.postalCode}</p>
                    <p>Country: {addressItem.country}</p>
                </div>
            ))  
        )}
            <button id="buttonAdress" type="button" onClick={() => showDialog()} className="btn btn-primary">update your address</button>
        </>
         ) : (
                <div>
                    <p>No Address</p>
                    <button id="buttonAdress" type="button" onClick={() => showDialog()} className="btn btn-primary" >Add Address</button>
                    </div>
            )}
                    <dialog ref={dialogRef} >
                    <div className='dialogFlex' >
                    <CloseButton onClick={()=>{closeDialog()}} className='closeBtn' />
                    <div id="dilo">
                        <form onSubmit={handleSubmitinfo} >
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        enterKeyHint="next"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="street-address">Street address</label>
                                    <input
                                        type="text"
                                        id="street-address"
                                        name="street-address"
                                        autoComplete="street-address"
                                        required
                                        enterKeyHint="next"
                                        value={streetAddress}
                                        onChange={(e) => { setStreetAddress(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="postal-code">ZIP or postal code (optional)</label>
                                    <input
                                        className="postal-code"
                                        id="postal-code"
                                        name="postal-code"
                                        autoComplete="postal-code"
                                        enterKeyHint="next"
                                        value={postalCode}
                                        onChange={(e) => { setPostalCode(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input
                                        required
                                        type="text"
                                        id="city"
                                        name="city"
                                        autoComplete="address-level2"
                                        enterKeyHint="next"
                                        value={city}
                                        onChange={(e) => { setCity(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country">country</label>
                                    <input
                                        required
                                        type="text"
                                        id="country"
                                        name="country"
                                        autoComplete="address-level2"
                                        enterKeyHint="next"
                                        value={country}
                                        onChange={(e) => { setCountry(e.target.value) }}
                                    />
                                </div>
                                {err && <p>{err}</p>}
                                <button type="submit" class="btn btn-outline-danger">Save</button>
                            
                        </form>
                        </div>
                        </div>
                    </dialog>
        </div>
)}
