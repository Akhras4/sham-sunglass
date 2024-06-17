import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Orders({ userid, token, product, selectedFav, setSelectedToFav }) {
    const [orders, setOrders] = useState([]);
    const [groupedProductOrder, setGroupedProductOrder] = useState({});
    const navigate = useNavigate();

useEffect(() => {
        axios.get(`http://localhost:8080/${userid}/Order?token=${token}`)
            .then(res => {
                setOrders(res.data.order);

                let groupedProductDetails = {};
                orders.forEach(order => {
                    const orderProductIds = order.items.map(item => item.productId);
                    const orderProductDetails = product.product.filter(p => orderProductIds.includes(p._id));
                    orderProductDetails.sort((a, b) => a.code - b.code); // Replace 'code' with the actual property to sort by
                    groupedProductDetails[order._id] = orderProductDetails;
                });
                setGroupedProductOrder(groupedProductDetails);
            })
            .catch(err => {
                console.log(err);
            });
}, [userid, token, product]);

const handleNavigation = (product) => {
        navigate(`/product/${product.sort}?product=${product._id}`, { state: { results: product, favorites: selectedFav } });
};
const formatExpectedDeliveryDate=(deliveryDate)=> {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(deliveryDate);
        const dayName = weekdays[date.getDay()];
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${dayName}, ${formattedDate}`;
}

return (
        <div>
            {orders.map(order => (
                <div key={order._id}>
                    <h3>Order ID: {order._id}</h3>
                    <p>Expected Delivery Date: {formatExpectedDeliveryDate(order.expectedDeliveryDate)}</p>
                    {groupedProductOrder[order._id] && groupedProductOrder[order._id].length > 0 ? (
                        groupedProductOrder[order._id].map(product => (
                            <div key={product._id} onClick={() => handleNavigation(product)}>
                                <h2>{product.name}</h2>
                                {/* <p>{product.description}</p> */}
                                <p>Price: {product.price}</p>
                                <p>Code: {product.code}</p> {/* Ensure this property exists */}
                            </div>
                        ))
                    ) : (
                        <p>No products found for this order.</p>
                    )}
                </div>
            ))}
        </div>
    );
}
