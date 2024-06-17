import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
export default function Imgslide({product,show,setShow}) {
    return (
        <div style={{backgroundColor:'#c7bcd1'}}>
        <CloseButton variant="black" style={{backgroundColor:'#c7bcd1'}} onClick={() => { setShow(false) }} />
        <Carousel data-bs-theme="dark" style={{zIndex:'10',width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection: 'column',overflow: 'hidden',backgroundColor:'#c7bcd1'}} >    
          <Carousel.Item>
            <img
              src={product.image[0]}
              alt="First slide"
              style={{ width: '100%', height: '80vh',objectFit:'contain', display: 'block'  }}
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=eee"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=e5e5e5"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
      )
      
}
