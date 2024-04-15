
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

export  const productContext = createContext()
function App() {
  const[product,setProduct]=useState([])
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token,setToken]=useState('')
  const [userid,setuserId]=useState('')


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
    const tokenInfo = Cookies.get('token');
    setToken(tokenInfo);

    if (tokenInfo) {
        const decodedToken = jwtDecode(tokenInfo);
        const userId = decodedToken.userId;
        console.log('User ID:', userId);
        setuserId(userId)
    }
    setIsAuthenticated(!!tokenInfo);

  },[]);
  
  return (
    <div className="App">  
    <NextUIProvider>
     <Router>
        <productContext.Provider value={{product, loading ,isAuthenticated,userid}} >
          <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Allproduct />} />
            <Route path="/product" element={<Product />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/creataccount" element={<Createaccount />} />
            <Route path="/wait" element={< Waitingpage />} />
            <Route path='/user' element={ isAuthenticated ? <User /> : <Signup /> }/>
          </Routes>
        </productContext.Provider>
      </Router>
      </NextUIProvider>
    </div>
  );
}

export default App;
