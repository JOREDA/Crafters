import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Search, RefreshCcw } from 'lucide-react';
import { Heart as HeartFilled } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart, useWishlist } from '../contexts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProducts } from '../../api/products';

// Empty fallback arrays in case API fails
const essentialProducts = [];
const lampShadeProducts = [];
const laundryBinProducts = [];
const storageBoxProducts = [];
const homeDecorProducts = [];
const flowerVaseProducts = [];

const calculateDiscount = (actualPrice, sellingPrice) => {
  const actual = typeof actualPrice === 'number' ? actualPrice : parseInt((actualPrice || '').toString().replace(/[^0-9]/g, "")) || 0;
  const selling = typeof sellingPrice === 'number' ? sellingPrice : parseInt((sellingPrice || '').toString().replace(/[^0-9]/g, "")) || 0;
  if (!actual) return 0;
  return Math.round(((actual - selling) / actual) * 100);
};

function buildCategoryComponent(categoryName, categoryKey, fallbackProducts) {
  return function CategoryComponent() {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
    const [products, setProducts] = useState(fallbackProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadProducts = async () => {
        try {
          const allProducts = await getAllProducts();
          const filtered = allProducts.filter(p => p.categoryName?.toLowerCase() === categoryKey?.toLowerCase() || p.category?.toLowerCase() === categoryKey?.toLowerCase());
          setProducts(filtered.length > 0 ? filtered : fallbackProducts);
        } catch (error) {
          console.error('Error loading products:', error);
          setProducts(fallbackProducts);
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    }, []);

    const handleProductClick = (product) => {
      navigate(`/product/${product.id}`, {
        state: {
          product: {
            ...product,
            category: categoryName,
            mainImage: product.imageUrl
          }
        }
      });
    };

    const handleAddToCart = (e, product) => {
      e.stopPropagation();
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.imageUrl });
      toast.success(`${product.name} added to cart!`, { position: 'top-right', autoClose: 2000 });
    };

    const handleWishlist = (e, product) => {
      e.stopPropagation();
      const isInWishlist = wishlistItems.some(item => item.name === product.name);
      if (isInWishlist) {
        removeFromWishlist(product.name);
        toast.info(`${product.name} removed from wishlist!`);
      } else {
        addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.imageUrl });
        toast.success(`${product.name} added to wishlist!`);
      }
    };

    return (
      <div className="py-12 bg-[#f9f9f9] px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-sm uppercase text-gray-500 tracking-wider">Category</h2>
            <h1 className="text-4xl font-bold text-[#333]">{categoryName}</h1>
            <div className="mt-3 w-24 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                {products.map((product) => {
              const discount = calculateDiscount(product.actualPrice, product.sellingPrice || product.price);
              const isInWishlist = wishlistItems.some(item => item.name === product.name);
              return (
                <motion.div key={product.id} className="group bg-white min-w-[250px] rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105 cursor-pointer" onClick={() => handleProductClick(product)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="relative w-full h-64 overflow-hidden">
                      <img src={product.imageUrl || product.image} alt={product.name} className="object-cover w-full h-full" />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-[#72442c] to-[#8d724a] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transform -rotate-12 backdrop-blur-sm">
                        {discount}% OFF
                      </div>
                      <div className="absolute bottom-[-50px] left-0 w-full flex justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out">
                        {product.inStock && (
                          <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer" onClick={(e) => handleAddToCart(e, product)}>
                            <ShoppingCart />
                          </div>
                        )}
                        <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"><Search /></div>
                        <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"><RefreshCcw /></div>
                        <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer" onClick={(e) => handleWishlist(e, product)}>
                          {isInWishlist ? <HeartFilled className="text-red-500 fill-current" /> : <Heart className="text-gray-600" />}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="font-semibold text-gray-900 text-xl">{product.sellingPrice || product.price}</span>
                        <span className="line-through text-gray-500">{product.actualPrice}</span>
                      </div>
                    </div>
                  </motion.div>
                );
            })}
              </>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  };
}

export const Essential = buildCategoryComponent('Essential', 'essential', essentialProducts);
export const LampShade = buildCategoryComponent('Lamp Shade', 'lamp', lampShadeProducts);
export const LaundryBin = buildCategoryComponent('Laundry Bin', 'laundry', laundryBinProducts);
export const StorageBox = buildCategoryComponent('Storage', 'storage', storageBoxProducts);
export const HomeDecor = buildCategoryComponent('Home Decor', 'home decor', homeDecorProducts);
export const FlowerVase = buildCategoryComponent('Flower Vase', 'flower vase', flowerVaseProducts);

export default {
  Essential,
  LampShade,
  LaundryBin,
  StorageBox,
  HomeDecor,
  FlowerVase,
};
