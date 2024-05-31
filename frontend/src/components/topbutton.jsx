import React, { forwardRef } from 'react';

const TopButton = forwardRef(({ currentSection, Section1Ref,setCurrentSection }, ref) => {
  const scrollToTop = () => {
    if (currentSection === 'Eyewear') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentSection === 'ContactLens') {
      Section1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      Go back to {currentSection}
    </button>
  );
});

export default TopButton;