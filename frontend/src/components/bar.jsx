import React from 'react'
import './bar.css'
import { useNavigate } from 'react-router-dom';
export default function Bar({product,selectedFav}) {
    const navigate =useNavigate()
    const handleNavigation=(productMan,sort)=>{  
        console.log(product)
        console.log(productMan,"productMan")
          console.log(sort)
        navigate(`/products/${sort}`, { state: { results: productMan,favorites:selectedFav,sort:sort } });
      } 
  return (
    <div className='nav-sort'>
        <div onClick={()=>{ handleNavigation(product.product.filter(product=>product.sort=="man"),"Man")}} >Man</div>
        <div onClick={()=>{ handleNavigation(product.product.filter(product=>product.sort=="women"),"Woman")}}>Woman</div>
        <div onClick={()=>{ handleNavigation(product.product.filter(product=>product.sort=="kids"),"Kids")}}>Kids</div>
    </div>
  )
}
