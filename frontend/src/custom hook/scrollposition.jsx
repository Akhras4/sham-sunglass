import { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll =() => {
      setScrollPosition(scrollRef.current.scrollTop);
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return { scrollPosition, scrollRef };
}


export default useScrollPosition;