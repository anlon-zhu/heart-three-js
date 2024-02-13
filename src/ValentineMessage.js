import React from 'react';
import { Html } from '@react-three/drei';

const ValentineMessage = () => {
  return (
    <Html>
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          <h1>Asking you to be my valentine once again <span role="img" aria-label="heart">❤️</span></h1>
        </div>
    </div>
    </Html>
  );
};

export default ValentineMessage;
