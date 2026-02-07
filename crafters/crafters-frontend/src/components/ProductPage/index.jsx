import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, RefreshCcw, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCart, useWishlist } from '../contexts';

// ProductGallery
export function ProductGallery({ images = [] }) {
  const defaultImages = images.length ? images : [
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg',
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg',
    'https://img.freepik.com/premium-photo/close-up-objects_1048944-25365762.jpg'
  ];
  const [selectedImage, setSelectedImage] = useState(defaultImages[0]);
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };
  return (
    <div className="flex items-start gap-6 px-4">
      <div className="flex flex-col gap-4">
        {defaultImages.map((img, index) => (
          <img key={index} src={img} alt={`thumb-${index}`} className={`w-40 h-40 object-cover border-2 rounded cursor-pointer ${selectedImage === img ? 'border-[#72442c]' : 'border-transparent'}`} onClick={() => setSelectedImage(img)} />
        ))}
      </div>
      <div onMouseMove={handleMouseMove} style={{ backgroundImage: `url(${selectedImage})`, backgroundSize: '300%', backgroundPosition }} className="w-[600px] h-[600px] rounded-lg shadow-md border transition-transform duration-300 hover:scale-105 bg-no-repeat" />
    </div>
  );
}

// ProductDetails (simplified consumer-friendly component)
export function ProductDetails({ product, onAddToCart }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;
  const getProductImage = () => product.image || product.imageUrl || product.mainImage;
  const isInWishlist = wishlistItems.some(i => i.name === product.name);
  const handleAdd = () => { addToCart({ id: product.id, name: product.name, price: product.price || product.sellingPrice, image: getProductImage(), quantity }); toast.success(`${product.name} added to cart!`); if (onAddToCart) onAddToCart(product); };
  const handleWishlist = () => { if (isInWishlist) { removeFromWishlist(product.name); toast.info(`${product.name} removed`); } else { addToWishlist({ id: product.id, name: product.name, price: product.price, image: getProductImage() }); toast.success(`${product.name} added to wishlist`); } };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <div className="mt-4 flex items-center gap-4">
        <button onClick={handleAdd} className="bg-[#72442c] text-white px-4 py-2 rounded">Add to cart</button>
        <button onClick={handleWishlist} className="px-4 py-2 rounded border">{isInWishlist ? 'Remove' : 'Wishlist'}</button>
      </div>
    </div>
  );
}

// RelatedProducts and SimilarProducts merged into a single flexible list component
function ProductCard({ product, onClick, onAddToCart, onWishlistToggle, wishlistItems }) {
  const inWishlist = wishlistItems.some(i => i.name === product.name);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative h-64 cursor-pointer" onClick={() => onClick(product)}>
        <img src={product.imageUrl || product.image || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={(e)=>{e.stopPropagation(); onAddToCart(product);}} className="bg-white p-2 rounded-full shadow-lg"><ShoppingCart size={20} /></button>
          <button onClick={(e)=>{e.stopPropagation(); onWishlistToggle(product);}} className="bg-white p-2 rounded-full shadow-lg"> <Heart className={inWishlist? 'text-red-500':''} /> </button>
        </div>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => onClick(product)}>
        <h3 className="text-lg font-semibold text-[#72442c] mb-2">{product.name}</h3>
        <p className="text-gray-600">₹{product.price || product.sellingPrice}</p>
      </div>
    </motion.div>
  );
}

export function RelatedList({ products, title = 'Related Products', category = null }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const handleClick = (p) => navigate(`/product/${p.id}`, { state: { product: { ...p, mainImage: p.imageUrl, sellingPrice: p.price, actualPrice: p.price } } });
  const handleAdd = (p) => addToCart({ id: p.id, name: p.name, price: p.price, image: p.imageUrl, quantity: 1 });
  const handleWishlist = (p) => { const exists = wishlistItems.some(i=>i.name===p.name); if (exists) removeFromWishlist(p.name); else addToWishlist({ id: p.id, name: p.name, price: p.price, image: p.imageUrl }); };
  if (!products || products.length===0) return null;
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-[#72442c] mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} onClick={handleClick} onAddToCart={handleAdd} onWishlistToggle={handleWishlist} wishlistItems={wishlistItems} />)}
      </div>
    </div>
  );
}

// ProductMain: layout consumer that composes gallery + details
export function ProductMain({ product }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2"><ProductGallery images={product?.images?.map(i=>i.image_url) || []} /></div>
        <div className="w-full lg:w-1/2"><ProductDetails product={product} /></div>
      </div>
    </div>
  );
}

export default { ProductGallery, ProductDetails, RelatedList, ProductMain };
