import React from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import ShowmoreDown from './ahowmoredown';
import Showmore from './showmore';
export default function AllproductContact({
  products,
  handleShowOffcanvas,
  handleAddToCart,
  handleAddToWishList,
  hadelnavgaiton,
  isProcessing,
  selectedFav,
  isAuthenticated,
  handleShowMore,
  handleShowLess,
  gridAreaNames,
  itemsToShowContactlens,
  setItemsToShowContactlens,
  ProductImage,
  sort,
}) {

  return (
    <div>
      <div className='continer'>
        <div className='newsunglassAll' >
          {sort == "Man" && (
            <img className="grid-image" src='http://localhost:8080/public/images/mancontactlens.jpeg' />
          )}
          {products && products.slice(0, 29).map((item, index) => (
            <div key={item._id} style={{ gridArea: gridAreaNames[index % gridAreaNames.length], display: (itemsToShowContactlens > index || itemsToShowContactlens === 29) ? 'block' : 'none' }}  >
              <div className='newsunglassconAll' key={item._id} >
                <ProductImage item={item} />
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
            </div>
          ))}
          {sort == "Man" && (
            <video className="grid-vid" autoPlay muted loop
              style={{ display: (itemsToShowContactlens > 25) ? 'block' : 'none' }} >
              <source src="http://localhost:8080/public/video/rb-hp-hero-icons-d-data.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      {29 > 4 && (
        <div className='but-allprouduct-showmore'>
          {itemsToShowContactlens < 29 && (
            <ShowmoreDown state={`Show More`} handleShowMore={()=>{handleShowMore(itemsToShowContactlens,setItemsToShowContactlens)}} />
          )}
          {itemsToShowContactlens == 29 && (
            <Showmore />
          )}
          {itemsToShowContactlens > 4 && (
            <ShowmoreDown state={"Show Less"} handleShowMore={()=>{handleShowLess(itemsToShowContactlens,setItemsToShowContactlens)}} />
          )}
        </div>
      )}
    </div>
  );
}