import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../components/contexts/WishlistContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { 
      state: { 
        product: {
          ...item,
          mainImage: item.image || item.imageUrl,
          sellingPrice: item.price || item.sellingPrice,
          actualPrice: ((item.price || item.sellingPrice) * 1.25).toFixed(2),
          features: [
            "Handcrafted with care",
            "Premium quality materials",
            "Unique artisan design",
            "Sustainable production"
          ],
          inStock: true,
          rating: 4.5,
          reviews: 50,
          category: "Wishlist Item"
        } 
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0] py-10 px-4 md:px-20 ">
      <h2 className="text-4xl font-bold text-[#72442c] mb-8 text-center">Your Wishlist</h2>
      <div className="mt-3 w-20 h-1 bg-gray-800 mx-auto rounded-full"></div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center text-center text-gray-700 space-y-4 mt-10">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-marketplace-states-pack-windows-interface-illustrations-9824477.png?f=webp"
            alt="Empty Wishlist"
            className="w-64 h-64 object-contain mb-6"
          />
          <p className="text-xl">You don't have any products in the wishlist yet.</p>
          <p className="text-lg">
            You will find a lot of interesting products on our{" "}
            <span className="font-semibold">Shop</span> page.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-[#72442c] hover:bg-[#5e3221] text-white cursor-pointer px-6 py-3 rounded-full text-lg transition"
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
          {wishlistItems.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container - Now Clickable */}
              <div 
                className="relative w-full h-48 cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                <img
                  src={item.image || item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info - Now Clickable */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                <h3 className="text-xl font-semibold text-[#72442c] mb-2">{item.name}</h3>
                <p className="text-lg text-gray-700 mb-4">₹{item.price || item.sellingPrice}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the product click
                    removeFromWishlist(item.name);
                  }}
                  className="w-full bg-[#7e4a2e] hover:bg-[#5e3221] cursor-pointer text-white px-4 py-2 rounded-full text-sm transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
