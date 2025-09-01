import React, { useState } from 'react';

function ProductGallery() {
  const images = [
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg', // towel
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg', // stack
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg', // textile
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [backgroundPosition, setBackgroundPosition] = useState('center');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className="flex items-start gap-6 px-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`thumb-${index}`}
            className={`w-40 h-40 object-cover border-2 rounded cursor-pointer ${
              selectedImage === img ? 'border-[#72442c]' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Main Image with Zoom on Hover */}
      <div
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: '300%',
          backgroundPosition,
        }}
        className="w-[600px] h-[600px] rounded-lg shadow-md border transition-transform duration-300 hover:scale-105 bg-no-repeat"
      />
    </div>
  );
}

export default ProductGallery;
