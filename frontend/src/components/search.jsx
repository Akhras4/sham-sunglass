import React from "react";
import {useState,useContext,useEffect } from "react";
import { productContext } from '../App'
import './nav.css'
import { useNavigate } from 'react-router-dom';
import { favContext } from './homepage'

export default function Search({ favoritesch }) {
  const[input,setInput]=useState([])
  const[results,setResults]=useState([])
  const[error,setError] = useState(false)
  const[worning,setWorning] = useState('Search')
  const {product} = useContext(productContext);
  const{favorites}=useContext(favContext)||[]
  const[Fav,setFav]=useState(favorites)
  const navigate = useNavigate();
  // console.log("favoritesch",favoritesch)
  useEffect(()=>{
    if(favoritesch){
      setFav(favoritesch)
      console.log("Fav",Fav)
    }else{
      setFav(favorites)
      console.log("favorites",favorites)
    }
  },[favoritesch,favorites])

  const handelSubmit = (e) => {
    e.preventDefault();
    if (input =="") {
      return setWorning("Please enter a product name");
    } else {
      const searchTermSubmit = input.toLowerCase();
      const specificProduct = product.product.filter((item) => item && item.title && item.title.toLowerCase() === searchTermSubmit);
      const specificProductObject = specificProduct ? specificProduct : {};
      if (specificProduct.length === 0) {
        const relatedProduct = product.product.filter((item) => {
          return Object.values(item).some((value) => {
          return typeof value === 'string' && value.toLowerCase().includes(searchTermSubmit);
          });
        });
        console.log("fav from serch",Fav)
        navigate('/products', { state: { results: relatedProduct ,favorites:Fav } });
      } else {
       console.log("fav from serch",Fav)
        navigate('/product', { state: { results: specificProductObject ,favorites:Fav} });
      }
      
      setInput('');
    }
  };
  const handelChang=(e)=>{
    setWorning("")
    const searchTerm =e.target.value.toLowerCase();
    setInput(searchTerm)
    if (product && product.product) {
      const ProductsRelated=product.product.filter((item)=>{ 
      if (item && item.title) {
      return item.title.toLowerCase().startsWith(searchTerm);
    }return false;})
    setResults(ProductsRelated)
  }
}
  const handelClick=(Prouduct)=>{
    if (Prouduct) {
      navigate('/product', { state: { results: Prouduct ,favorites:Fav } });
      setResults("")
      setInput("")
  }
  }
  return (
    <div>
    <div class="search-container">
        <form class="search-form"  onSubmit={handelSubmit}>
            <input
             className="search-input"
                type="text"
                onChange={handelChang}
                value={input}
                placeholder={worning}
            />
             <button class="search-button" type='submit'>Search</button>
             </form>
            <ul className="search-results" id="searchResults">
            {input && results && results.map(product =><li key={product.id} 
            onClick={() => handelClick(product)}>{product.title}</li>)}
             </ul>
             </div>
        {error&& <p style={{color:"black"}}>{error}</p>}
        
  
</div>
)};


