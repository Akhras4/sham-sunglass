import React, { forwardRef } from 'react';

const TopButton = forwardRef(({ currentSection, Section1Ref,Section2Ref,setCurrentSection }, ref) => {
  const scrollToTop = () => {
    if (currentSection === 'Eyewear'||currentSection ==='woman') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentSection === 'ContactLens'||currentSection ==='man') {
      Section1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }else if (currentSection ==='kids') {
      Section2Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px',zIndex:'4' }}>
      Go back to {currentSection}
    </button>
  );
});

export default TopButton;