import React from 'react';
import '../css/app.css'; // Import CSS file for styles

function BackArrow({ animate, onAnimate }) {
  return (
    <div 
      className={`back-arrow ${animate ? 'fly-off' : ''}`}
      onClick={onAnimate}
      style={{
              width: '21.2px',
              height: '21.2px',
              transform: 'rotate(45deg)',
              borderLeft: '2px solid black',
              borderBottom: '2px solid black'
            }}
    ></div>
  );
}

export default BackArrow;
