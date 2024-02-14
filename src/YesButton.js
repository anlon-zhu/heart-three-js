import React from 'react';

const YesButton = ({ onClick }) => {
  return (
    <div
      className='button'
      style={{
        position: 'fixed',
        top: '80%',
        left: '50%',
        width: '100px',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '12px',
      }}
      onClick={onClick}
    >
      <span className='yes-button-text'>yes</span>
    </div>
  );
};

export default YesButton;
