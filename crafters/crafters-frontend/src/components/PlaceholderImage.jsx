import React from 'react';

const PlaceholderImage = ({ text, bgColor = '#788c7c' }) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-white text-lg font-medium text-center p-4">
        {text}
      </p>
    </div>
  );
};

export default PlaceholderImage; 