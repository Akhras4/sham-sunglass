import React, {useState,useContext,useEffect} from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Button from 'react-bootstrap/Button';
import {productContext} from'../App'
   

const Checkout = ({  total,productShoppingCart }) => {
    const [loading, setLoading] = useState(false);
    const{token ,userid}=useContext(productContext)
    console.log(productShoppingCart,"productShoppingCart",userid,"userid")
    const handleCheckout = () => {
        setLoading(true);
        axios.post(`http://localhost:8080/user/createOrder/${userid}?token=${token}`,{ total , productShoppingCart })
        .then(response => {
            return response.data;
        })
        .then(data => {
            // Redirect the user to the Stripe Checkout page using the session ID
            window.location.href = data.checkoutUrl;
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <Button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Checkout'}
            </Button>
        </div>
    );
};

export default Checkout;
