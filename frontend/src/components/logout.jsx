import React from 'react'
import axios from 'axios'
import {productContext} from '../App'
import { useContext  } from 'react';

function deleteCookie(name) {
  document.cookie = name + "=; expires=" + new Date(0).toUTCString() + "; path=/;";
}
export default function Logout() {
    const {token}=useContext(productContext)
    axios.get(`http://localhost:8080/logout?token=${token}`)
    .then(response => {
      deleteCookie('token')
      window.location.href = response.data.redirect;
      
    })
    .catch(errors => {
    });
  return (
    <div></div>
  )
}
