import React from 'react';
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import ShowmoreDown from './ahowmoredown';
import Showmore from './showmore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
export default function AllproductEyewear({
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
  itemsToShowEyewear,
  setItemsToShowEyewear,
  sort,
  ProductImage,
  size,
  fontSizeMobile,
  isTabletOrMobile,
  isMobile,
}) {
  return (
    <div>
      <div className='continer'>
        <div className='newsunglassAll' >
          {sort == "Man" && (
            <img className="grid-image" src='http://localhost:8080/public/images/maneyeweargrid.jpeg' />
          )}
          {products && products.slice(0, 28).map((item, index) => (
            <div key={item._id} style={{ gridArea: gridAreaNames[index % gridAreaNames.length], display: (itemsToShowEyewear > index || itemsToShowEyewear === 29) ? 'block' : 'none' }}  >
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
                {isTabletOrMobile ?(<FontAwesomeIcon icon={faCartShopping} style={{ fontSize: size }}    onClick={() => handleShowOffcanvas(item)} />): (
                  <Button variant="dark" onClick={() => handleShowOffcanvas(item)}>
                    <FaShoppingCart />ADD to Cart
                  </Button>
                )}
                </div>
                <div id="fav" onClick={() => { handleAddToWishList(item._id) }}>
                  <MdFavorite
                      className="hoverEffect"
                      onClick={() => { handleAddToWishList(item._id) }}
                      style={{ fontSize:`${fontSizeMobile}`, cursor: isProcessing ? "" : 'pointer', color: selectedFav && selectedFav.items.some(items => items.productId === item._id) ? 'red' : 'black' }}
                    />
                    </div>
              </div>
            </div>
          ))}
          {sort == "Man" && (
            <video className="grid-vid" autoPlay muted loop
              style={{ display: (itemsToShowEyewear > 25) ? 'block' : 'none' }} >
              <source src="http://localhost:8080/public/video/maneyewear.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      {29 > 4 && (
        <div className='but-allprouduct-showmore'>
          {itemsToShowEyewear < 29 && (
            <ShowmoreDown state={`Show More`} handleShowMore={() => {handleShowMore(itemsToShowEyewear,setItemsToShowEyewear)}} />
          )}
          {itemsToShowEyewear == 29 && (
            <Showmore />
          )}
          {itemsToShowEyewear > 4 && (
            <ShowmoreDown state="Show Less" handleShowMore={() => {handleShowLess(itemsToShowEyewear,setItemsToShowEyewear)}} />
          )}
        </div>
      )}
    </div>
  );
}
