import React from 'react';

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button onClick={scrollToTop}style={{ position: 'fixed', bottom: '20px', right: '20px' }}>Go back to top</button>
  );
}