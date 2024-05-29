import React from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';

export default function AllproductContact({
  products,
  handleShowOffcanvas,
  handleAddToCart,
  handleAddToWishList,
  hadelnavgaiton,
  isProcessing,
  selectedFav,
  isAuthenticated
}) {
console.log(products)
  return (
    <div className='continer'>
        <div className='newsunglassAll' >
            {products  && products.slice(0, 40).map(item => (
            <div className='newsunglassconAll' key={item._id} >
              <img id="img" src={item.image[0]} style={{ width: "100%", heigh: "80%" }} onClick={()=>hadelnavgaiton(item)} />
              {item.isOnSale ? (
                <>
                  <div className='saleinfo'><p>Price:</p><p style={{ textDecoration: 'line-through', color: 'red' }}> {item.price}</p>
                    <p style={{ backgroundColor: 'yellow' }}> {item.salePrice}</p></div>
                </>
              ) : (
                <p>Price: {item.price}</p>
              )}
              <h4>{item.title}</h4>
              <div className='butCon'>
            <Button variant="dark" onClick={() => handleShowOffcanvas(item)}>
              <FaShoppingCart />ADD to Cart
            </Button>
            <MdFavorite
              className="hoverEffect"
              onClick={() => { handleAddToWishList(item._id); }}
              style={{ fontSize: '30px', cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
            />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}