import React from "react";
import {useState,useContext } from "react";
import { productContext } from '../App'
import './nav.css'

export default function Search() {
  const[input,setInput]=useState([])
  const[results,setResults]=useState([])
  const[error,setError] = useState(false)
  const[worning,setWorning] = useState('Search')
  const {product} = useContext(productContext);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      return setWorning("Please enter a product name");
    } else {
      const searchTermSubmit = input.toLowerCase();
      const specificProduct = product.product.filter((item) => item && item.title && item.title.toLowerCase() === searchTermSubmit);
      if (specificProduct.length === 0) {
        const relatedProduct = product.product.filter((item) => {
          return Object.values(item).some((value) => {
          return typeof value === 'string' && value.toLowerCase().includes(searchTermSubmit);
          });
        });
        setResults(relatedProduct)
      } else {
        setResults(specificProduct);
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
  const handelClick=(ProuductId)=>{
    const findProduct = product.product.find(product => product.id === ProuductId);
    if (findProduct) {
      setResults([findProduct]);
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
            onClick={() => handelClick(product.id)}>{product.title}</li>)}
             </ul>
             </div>
        {error&& <p style={{color:"black"}}>{error}</p>}
        
  
</div>
)};


