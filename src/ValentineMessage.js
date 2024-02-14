import React, { useState, useEffect } from 'react';

const ValentineMessage = ({ explode }) => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (explode) {
      // Delay the showing of the image after 2 seconds
      const timeout = setTimeout(() => {
        setShowImage(true);
      }, 2800);

      // Clear the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [explode]);

  return (
    <>
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <p className="val-text">
          {explode ?
            'happy valentine\'s day ❤️ i love you!' :
            'dear megan, will you be my valentine once again? ❤️'
          }
        </p>
      </div>
      {showImage && explode && (
        <>
        <div className='image-container' style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          <img src="/megan.png" alt="heart" width="300" />
        </div>
        <div className='image-container' style={{ position: 'absolute', top: '50%', left: '20%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <img src="/megan-sushi.png" alt="heart" width="300" />
      </div>
      </>
      )}
    </>
  );
};

export default ValentineMessage;
