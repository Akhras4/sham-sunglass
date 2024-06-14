
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
import Homepage from './components/homepage';
import Allproduct from './components/allproduct';
import { useState, useEffect,createContext,useContext } from 'react';
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
import Logout from './components/logout'
import AllproductsCat from './components/allproductscat';
import NotFound from './components/404'
import ResetPassword from './components/resetpassword'


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
      });
  };
  useEffect(() => {
    fetchData();
    let tokenInfo = Cookies.get('token');
     if(! tokenInfo){ tokenInfo = localStorage.getItem('token');}
     console.log('Received token:', tokenInfo);
    setToken(tokenInfo);

    if (tokenInfo) {
      const decodedToken = jwtDecode(tokenInfo);
      // console.log('Decoded token:', decodedToken);
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
  } else {
      setIsAuthenticated(false);
      setuserId(null);
  }
  },[token,userid ]);

  
  return (
    <div className="App">  
    <NextUIProvider>
     <Router>
        <productContext.Provider value={{product, loading,token ,isAuthenticated,userid }} >
          <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="/products/:sort" element={<Allproduct />} />
            <Route path="/products/:sort/:cat" element={<AllproductsCat />} />
            <Route path="/product/:sort" element={<Product />} /> 
            <Route path="/signup" element={ isAuthenticated ? <User /> : <Signup /> } />
            <Route path="/creataccount" element={<Createaccount />} />
            <Route path="/wait" element={< Waitingpage />} />
            <Route path='/user' element={isAuthenticated ? <User  /> : <Signup />  }/>
            <Route path='/logout' element={ <Logout /> }/>
            <Route path='/ResetPassword' element={ <ResetPassword /> }/>
            <Route path="/NotFound" component={NotFound} />
            <Route path='*' element={<Navigate to="/NotFound" />}  />
          </Routes>
        </productContext.Provider>
      </Router>
      </NextUIProvider>
    </div>
  );
}

export default App;
