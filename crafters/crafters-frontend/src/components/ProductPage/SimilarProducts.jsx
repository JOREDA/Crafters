import React, { useState } from 'react';
import { ShoppingCart, Search, RefreshCcw, Heart } from 'lucide-react';

const SimilarProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  const handleAddToWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter((id) => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  };

  const products = [
    {
      id: 20,
      name: 'Handcrafted Wooden Vase',
      description: 'Eco-friendly vase made with sustainable wood.',
      image: 'https://img.freepik.com/free-photo/denim-jeans_1203-8123.jpg?w=740',
      sellingPrice: '$39.99',
      actualPrice: '$59.99',
      discount: 35
    },
    {
      id: 21,
      name: 'Vintage Cotton Scarf',
      description: 'Cozy scarf with traditional print charm.',
      image: 'https://img.freepik.com/free-photo/denim-jeans_1203-8123.jpg?w=740',
      sellingPrice: '$19.99',
      actualPrice: '$29.99',
      discount: 33
    },
    {
      id: 22,
      name: 'Rustic Ceramic Pot',
      description: 'Textured ceramic pot for your indoor plants.',
      image: 'https://img.freepik.com/free-photo/denim-jeans_1203-8123.jpg?w=740',
      sellingPrice: '$24.99',
      actualPrice: '$39.99',
      discount: 38
    },
    {
      id: 23,
      name: 'Artisan Woven Basket',
      description: 'Handwoven multipurpose storage basket.',
      image: 'https://img.freepik.com/free-photo/denim-jeans_1203-8123.jpg?w=740',
      sellingPrice: '$29.99',
      actualPrice: '$49.99',
      discount: 40
    },
    {
      id: 24,
      name: 'Clay Garden Planter',
      description: 'Durable hand-molded clay pot for garden plants.',
      image: 'https://img.freepik.com/free-photo/denim-jeans_1203-8123.jpg?w=740',
      sellingPrice: '$34.99',
      actualPrice: '$54.99',
      discount: 36
    }
  ];

  return (
    <div className="px-4 py-6 mt-20">
     {/* <hr className="border-t border-gray-300 mb-4 ml-20 mr-20" /> */}

      {/* <h2 className="text-xl font-semibold mb-6">Similar Products</h2> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ml-20 mr-20">
        {products.map((product) => {
          const inWishlist = wishlist.includes(product.id);
          return (
            <div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105 mx-5"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-[#72442c] to-[#8d724a] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transform -rotate-12 backdrop-blur-sm">
                  {product.discount}% OFF
                </div>

                <div className="absolute bottom-[-50px] left-0 w-full flex justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out">
                  <div
                    onClick={() => handleAddToCart(product)}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingCart />
                  </div>

                  <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer" title="View Details">
                    <Search />
                  </div>

                  <div className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer" title="Refresh">
                    <RefreshCcw />
                  </div>

                  <div
                    onClick={() => handleAddToWishlist(product)}
                    className={`p-2 rounded-full shadow-lg cursor-pointer transition ${
                      inWishlist ? 'text-red-500' : 'bg-white hover:bg-red-100'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart fill={inWishlist ? 'red' : 'none'} />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <span className="font-semibold text-gray-900">{product.sellingPrice}</span>
                  <span className="line-through text-gray-500 text-xs">{product.actualPrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
