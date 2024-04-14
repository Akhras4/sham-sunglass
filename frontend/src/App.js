
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Allproduct from './components/allproduct';
import { useState, useEffect,createContext } from 'react';
import axios from 'axios'
import Product from './components/product';
import Signup from './components/signup';
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import Createaccount from './components/createaccount';

export  const productContext = createContext()
function App() {
  const[product,setProduct]=useState([])
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios.get('http://localhost:3000/api')
      .then(res => {
        setProduct(res.data);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();

  },[]);
  
  return (
    <div className="App">
      
    <NextUIProvider>
     <Router>
        <productContext.Provider value={{product, loading}} >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Allproduct />} />
            <Route path="/product" element={<Product />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/creataccount" element={<Createaccount />} />
          </Routes>
        </productContext.Provider>
      </Router>
      </NextUIProvider>
    </div>
  );
}

export default App;
