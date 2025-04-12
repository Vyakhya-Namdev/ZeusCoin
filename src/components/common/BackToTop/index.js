import React, { useEffect, useRef } from 'react';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import './styles.css';

function BackToTop() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        buttonRef.current.style.display = 'flex';
      } else {
        buttonRef.current.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={buttonRef} className="back-to-top" onClick={topFunction}>
      <NorthRoundedIcon style={{ color: 'var(--primary-highlight)' }} />
    </div>
  );
}

export default BackToTop;
