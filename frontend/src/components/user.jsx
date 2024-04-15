import React from 'react'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
export default function User() {
    useEffect(() => {
        const token = Cookies.get('token');
        console.log('Token:', token);
    }, []);
  return (
    <div>welcom</div>
  )
}
