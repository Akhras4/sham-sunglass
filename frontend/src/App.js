
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Allproduct from './components/allproduct';
import { useState, useEffect,createContext } from 'react';
import axios from 'axios'
import Product from './components/product';

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
     <Router>
        <productContext.Provider value={{product, loading}} >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Allproduct />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </productContext.Provider>
      </Router>
    </div>
  );
}

export default App;
