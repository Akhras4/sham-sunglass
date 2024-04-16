
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
import Waitingpage from './components/waitingpage';
import User from './components/user';
import Cookies from 'js-cookie';
import Usericon from './components/usericon';
import {jwtDecode} from 'jwt-decode';
import Test from './components/test';

export  const productContext = createContext()
function App() {
  const[product,setProduct]=useState([])
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token,setToken]=useState('')
  const [userid,setuserId]=useState('')


  const fetchData = () => {
    axios.get('http://localhost:8080/api')
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
    const tokenInfo = Cookies.get('token');
    setToken(tokenInfo);

    if (tokenInfo) {
      const decodedToken = jwtDecode(tokenInfo);
      const userId = decodedToken.userId;
      if (decodedToken.exp * 1000 < Date.now()) {
          Cookies.remove('token');
          setToken(null); 
          setuserId(null); 
          setIsAuthenticated(false); 
      } else {
          setuserId(userId);
          setIsAuthenticated(true);
      }
      console.log('User ID:', userId);
  } else {
      setIsAuthenticated(false);
      setuserId(null);
  }

  },[token,userid ]);
  
  return (
    <div className="App">  
    <NextUIProvider>
     <Router>
        <productContext.Provider value={{product, loading,token ,isAuthenticated,userid}} >
          <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Allproduct />} />
            <Route path="/product" element={<Product />} />
            <Route path="/signup" element={ isAuthenticated ? <User /> : <Signup /> } />
            <Route path="/creataccount" element={<Createaccount />} />
            <Route path="/wait" element={< Waitingpage />} />
            <Route path='/user' element={ isAuthenticated ? <User /> : <Signup /> }/>
            <Route path="/test" element={<Test />} />
          </Routes>
        </productContext.Provider>
      </Router>
      </NextUIProvider>
    </div>
  );
}

export default App;
