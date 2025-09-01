import React from "react";
import { Heart, Search, ShoppingCart, RefreshCcw } from "lucide-react";
import { useWishlist } from "../components/contexts/WishlistContext";
import { useCart } from "../components/contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import product1 from "../assets/bamboo_lamp_2.jpg"
import product2 from "../assets/bamboo_lamp.jpg"
import product3 from "../assets/bamboo_storage_box_2.jpg"
import product4 from "../assets/bamboo_storage_box.jpg"
import product5 from "../assets/bamboo_table_lamp.jpg"



const products = [
  {
    id: 1,
    name: "Handcrafted Bamboo Table Lamp",
    actualPrice: "₹900",
    sellingPrice: "₹600",
    price: 2499,
    image:
      product1,
    description: "Eco-friendly handcrafted bamboo lamp.",
    longDescription: {
      text: "Eco-friendly handcrafted bamboo lamp with a soothing glow, perfect for indoor ambiance.",
      specifications: {
        Material: "Natural Bamboo",
        Color: "Light Brown / Natural Finish",
        Dimensions: "Height: 12 inches, Width: 6 inches",
        Bulb: "Bulb not included",
        Usage: "Indoor – Bedroom, Living Room, Office, Cafe Decor",
      },
      aboutProduct: [
        "Add a touch of nature to your living space with our Handcrafted Bamboo Table Lamp where tradition meets sustainability.",
        "Expertly handwoven by skilled artisans, this table lamp is made from 100% natural bamboo, reflecting timeless craftsmanship and an eco-conscious lifestyle. Its rustic finish and warm glow make it a perfect lighting accessory for your home, office, or studio.",
        "Whether you're creating a cozy corner for reading or adding soft lighting to your bedroom, this bamboo lamp offers both beauty and purpose. It's lightweight, durable, and easy to move – ideal for daily use in modern homes that value sustainability.",
        "Place it on a bedside table, work desk, or shelf – its earthy texture and minimalist shape suit all interior aesthetics from boho to modern chic.",
      ],
    },
    aboutDesc: [
      "🌿 Eco-Friendly Craftsmanship – Made from 100% natural bamboo, this sustainable table lamp adds an organic charm to your space while supporting eco-conscious living.",
      "🖐️ Handwoven by Artisans – Each bamboo lamp is handwoven by skilled rural artisans using traditional techniques, making every piece unique and full of character.",
      "💡 Warm Ambient Lighting – Designed to emit a soft, warm glow that creates a calming atmosphere – ideal for bedrooms, meditation spaces, and cozy corners.",
      ,
      "🏡 Rustic, Minimalist Design – Perfectly complements modern, bohemian, and earthy interiors. A versatile piece that enhances any room's decor.",
    ],
  },
  {
    id: 2,
    name: "Handcrafted Circular Bamboo Storage Box",
    actualPrice: "₹470",
    sellingPrice: "₹210",
    price: 7499,
    image:
      product2,
    description: "Stylish leather jacket for winter.",
   longDescription: {
      text: "Eco-friendly handcrafted bamboo lamp with a soothing glow, perfect for indoor ambiance.",
      specifications: {
        Material: "100% Natural Bamboo",
        Color: "Light Brown / Natural Finish",
        Dimensions: " Diameter: 4.5, Height: 3",
        Bulb: "Bulb not included",
        Usage: "Storage, Organizing, Gift Box, Kitchen & Jewelry",
      },
      aboutProduct: [
         "Organize your essentials beautifully with our Handcrafted Circular Bamboo Box – the perfect blend of function, sustainability, and style.",
"Expertly woven from natural bamboo by skilled artisans, this round bamboo box is ideal for daily use or decorative display. Whether you're storing jewelry, dry spices, dry fruits, coins, cotton pads, or simply using it as a decorative container, its versatile design and earthy aesthetic make it a practical and eco-friendly choice.,"
      ],
    },
    aboutDesc: [
      "🌿 Eco-Friendly Craftsmanship – Made from 100% natural bamboo, this sustainable table lamp adds an organic charm to your space while supporting eco-conscious living.",
      "🖐️ Handwoven by Artisans – Each bamboo lamp is handwoven by skilled rural artisans using traditional techniques, making every piece unique and full of character.",
      "💡 Warm Ambient Lighting – Designed to emit a soft, warm glow that creates a calming atmosphere – ideal for bedrooms, meditation spaces, and cozy corners.",
      ,
      "🏡 Rustic, Minimalist Design – Perfectly complements modern, bohemian, and earthy interiors. A versatile piece that enhances any room's decor.",
    ],
  },
  {
    id: 3,
    name: "Handcrafted Bamboo Flower Port",
    actualPrice: "₹899",
    sellingPrice: "₹499",
    price: 4199,
    image: product3,
    description: "Lightweight sneakers for daily use.",
     longDescription: {
      text: "Eco-friendly handcrafted bamboo lamp with a soothing glow, perfect for indoor ambiance.",
      specifications: {
        Material: "100% Natural Bamboo",
        Color: "Natural Bamboo Finish",
        Dimensions: "Diameter: 6.5 inches, Height: 14 inches",
        Bulb: "Bulb not included",
        Usage: "Indoor Plants, Outdoor Garden, Balcony, Gifting",
      },
      aboutProduct: [
       " Give your green corner a natural upgrade with our Handcrafted Bamboo Flower Pot – the perfect harmony of nature, art, and sustainability.",
       "Designed for plant lovers and conscious homemakers, this bamboo flower pot brings earthy aesthetics and eco-responsibility together. Whether you're placing it in your indoor plant shelf, balcony garden, or gifting it to a nature enthusiast, this pot adds a warm, rustic charm to any space.",
       "It is handmade from renewable bamboo, with care and precision, by skilled rural artisans. The natural ventilation of bamboo makes it great for plant health, while its woven structure stands out as a decor piece.",
       "Use it for succulents, ferns, money plants, or even dried flower arrangements. It's a versatile addition to homes, cafes, and green workspaces.",

      ],
    },
    aboutDesc: [
     " 🌿 Sustainable Bamboo Planter – Made from 100% natural bamboo, this flower pot offers an eco-friendly alternative to plastic or ceramic pots.",
     "🖐️ Handcrafted by Artisans – Each pot is skillfully woven and crafted by rural artisans using traditional techniques for an authentic and rustic look.",
     "🌼 Perfect for Indoor & Outdoor Plants – Ideal for succulents, herbs, and small flowering plants. Adds a natural vibe to balconies, tabletops, or gardens.",
     "🏠 Rustic & Minimalist Decor – Complements modern, farmhouse, and boho interiors with its earthy texture and handcrafted finish.",
     "♻️ Durable & Biodegradable – Strong yet lightweight, this bamboo pot is naturally durable and completely biodegradable – good for plants and the planet.",
    ],
  },
  {
    id: 4,
    name: "Eco-Friendly Handbag for Women",
    actualPrice: "₹3,500",
    sellingPrice: "₹2,499",
    price: 3299,
    image: product4,
    description: "Relaxed fit denim jeans.",
    longDescription: {
      text: "Eco-Friendly Handbag for Women | Handcrafted Sustainable Purse Made from Natural Bamboo | Cotton (9*12)",
      specifications: {
        Material: "Natural Bamboo",
        Color: "Earthy Tones / Natural Finish ",
        Dimensions: "Height: 9 inches, Width: 12 inches",
        Bulb: "Bulb not included",
        Usage: "Casual, Daily Use, Office, Travel, Shopping, Gifting",
      },
      aboutProduct: [
        "Embrace conscious fashion with our Eco-Friendly Handbag – where sustainability meets timeless style.",
        "Crafted with care using natural materials like bamboo, organic cotton, or jute (customize based on your actual product), this eco handbag is perfect for women who care about the planet and love fashion.",
        "With its spacious interior and stylish design, this handbag is not only functional but also a statement piece for any outfit.",
        "Designed by skilled artisans, each piece showcases traditional weaving techniques blended with modern trends.",
        "The bag is lightweight, spacious, and easy to carry. Whether you're heading out for a casual day, attending a cultural event, or simply running errands – this bag offers style and utility in one eco-conscious package.",
        "By choosing this bag, you're not only reducing plastic waste but also supporting sustainable craftsmanship and artisan communities.",

      ],
    },
    aboutDesc: [
      " ♻️ 100% Eco-Friendly Material – Made using natural jute, this handbag supports zero-waste, sustainable living.",
      "🖐️ Handcrafted by Rural Artisans – Each bag is ethically handmade using traditional techniques, making every piece unique and culturally rich.",
      "👜 Stylish & Functional Design – Spacious enough for everyday essentials like phone, wallet, keys, and makeup with an aesthetic, earthy vibe.",
      "🌿 Sustainable Fashion Choice – A perfect alternative to synthetic leather or plastic bags – support conscious fashion while staying stylish.",
      "👗 Versatile & Trendy – Ideal for casual outings, shopping, travel, college, or gifting; matches well with boho, ethnic, or fusion outfits.",

    ],
  },
  {
    id: 5,
    name: "Eco-Friendly Bamboo Laundry Bin",
    actualPrice: "₹2,199",
    sellingPrice: "₹1,699",
    price: 1699,
    image:
     product5,
    description: "Cozy wool scarf for winter.",
    longDescription: {
      text: "Eco-Friendly Bamboo Laundry Bin  | Handcrafted Clothes Basket with Lid for Bathroom | Bedroom | Laundry Room (18*18)",
      specifications: {
        Material: "100% Natural Bamboo with Cotton Fabric Liner",
        Color: "Natural Bamboo Finish",
        Dimensions: "Height: 18 inches, Width: 18 inches",
        Bulb: "Bulb not included",
        Usage: " Laundry Storage, Bedroom, Bathroom, Wardrobe Organizer",
      },
      aboutProduct: [
       "Add natural elegance and functionality to your home with our Handcrafted Bamboo Laundry Bin – where sustainable living meets everyday practicality.",
       "Crafted from durable and eco-friendly bamboo, this laundry basket is perfect for bedrooms, bathrooms, and laundry rooms. It features a spacious interior for organizing clothes and linens, while the breathable design ensures proper air circulation to avoid odors or mildew.",
       "Designed by skilled rural artisans, this bin not only organizes your space but also enhances your home decor with its earthy and elegant finish. The included cotton liner adds a layer of protection for your laundry, and the foldable design makes storage easy when not in use.",
       "Whether you're adopting a zero-waste lifestyle or simply want to upgrade your home aesthetics, this bamboo laundry basket is a perfect choice.",

      ],
    },
    aboutDesc: [
      "🧺 Spacious Bamboo Laundry Basket – Ideal for sorting and storing dirty clothes, towels, or linens with a natural, minimalist look.",
      "🌿 Made from 100% Natural Bamboo – Durable, biodegradable, and eco-friendly alternative to plastic bins.",
      "🖐️ Handcrafted by Artisans – Handwoven using traditional bamboo weaving techniques for a strong, stylish structure.",
      "🔁 Foldable & Lightweight Design – Easily collapsible when not in use; convenient for small apartments, dorms, or travel.",
      "🧼 Comes with Lid & Cotton Liner – Features a fabric liner to protect clothes and a secure lid to keep things neat and odor-free.",
    ],
  },
];

const calculateDiscount = (actual, selling) => {
  const actualNum = parseInt(actual.replace(/[₹,]/g, ""));
  const sellingNum = parseInt(selling.replace(/[₹,]/g, ""));
  if (!actualNum || !sellingNum) return 0;
  return Math.round(((actualNum - sellingNum) / actualNum) * 100);
};

const OurProduct = () => {
  const { wishlistItems, addToWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const isInWishlist = (productName) =>
    wishlistItems.some((item) => item.name === productName);

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.name)) {
      toast.info(`${product.name} is already in wishlist`, { autoClose: 2000 });
      return;
    }
    const wishlistProduct = { ...product, imageUrl: product.image };
    addToWishlist(wishlistProduct);
    toast.success(`${product.name} added to wishlist`, { autoClose: 2000 });
  };

  const handleAddToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      toast.info(`${product.name} is already in the cart`, { autoClose: 2000 });
    } else {
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      };
      addToCart(cartProduct);
      toast.success(`${product.name} added to cart`, { autoClose: 2000 });
    }
  };

  const handleProductClick = (product) => {
    const productWithImage = {
      ...product,
      image: product.image,
      imageUrl: product.image
    };
    navigate(`/product/${product.id}`, { 
      state: { 
        product: productWithImage
      } 
    });
  };

  return (
    <div className="py-10 bg-[#f5f5f5] mt-5 px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg uppercase text-gray-500 tracking-wider">
            Discover
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            Our Products
          </h1>
          <div className="mt-3 w-20 h-1 bg-[#788c7c] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-[30px]">
          {products.map((product) => {
            const discount = calculateDiscount(
              product.actualPrice,
              product.sellingPrice
            );
            const inWishlist = isInWishlist(product.name);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md relative transition-transform hover:scale-105"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => handleProductClick(product)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x400.png?text=Image+Not+Available";
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transform -rotate-12 backdrop-blur-sm">
                    {discount}% OFF
                  </div>

                  {/* Desktop Icons */}
                  <div className="absolute bottom-[-50px] left-0 w-full justify-around opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 ease-in-out hidden sm:flex">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart />
                    </button>

                    <button
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                      aria-label="Search product"
                    >
                      <Search />
                    </button>

                    <button
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                      aria-label="Refresh"
                    >
                      <RefreshCcw />
                    </button>

                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-2 rounded-full shadow-lg cursor-pointer ${
                        inWishlist
                          ? "text-red-500 bg-red-100"
                          : "bg-white hover:bg-red-100"
                      }`}
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart fill={inWishlist ? "red" : "none"} />
                    </button>
                  </div>

                  {/* Mobile Icons */}
                  <div className="absolute bottom-4 left-4 sm:hidden">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-2 rounded-full shadow-lg cursor-pointer ${
                        inWishlist
                          ? "text-red-500 bg-red-100"
                          : "bg-white hover:bg-red-100"
                      }`}
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart fill={inWishlist ? "red" : "none"} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 right-4 sm:hidden">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="font-semibold text-gray-900 text-2xl">
                      {product.sellingPrice}
                    </span>
                    <span className="line-through text-gray-500">
                      {product.actualPrice}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default OurProduct;
