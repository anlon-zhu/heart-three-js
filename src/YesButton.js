import React from 'react';
import { Html } from '@react-three/drei';

const YesButton = ({ onClick }) => {
  return (
    <Html>
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <span style={{ color: 'black', fontWeight: 'bold' }}>Yes</span>
    </div>
      </Html>
  );
};

export default YesButton;
