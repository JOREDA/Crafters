import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity } = useCart();
  const shippingCost = 59; // Updated to match checkout page

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  // State for showing address form
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Address form state
  const [addressForm, setAddressForm] = useState({
    country: 'India',
    state: '',
    zip: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-white p-6 lg:p-10 mt-40">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-6 justify-center text-center">
        <Link to="/cart" className="text-[#72442c] hover:underline">
          SHOPPING CART
        </Link>
        <span className="mx-2">→</span>
        <Link to="/checkout" className="text-[#72442c] hover:underline">
          CHECKOUT
        </Link>
        <span className="mx-2">→</span>
        <span className="text-gray-400">ORDER COMPLETE</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 w-full overflow-x-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Your cart is empty</h3>
              <Link 
                to="/products" 
                className="bg-[#72442c] text-white px-6 py-2 rounded hover:bg-[#5a3220] transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">PRODUCT</th>
                    <th className="py-2">PRICE</th>
                    <th className="py-2">QUANTITY</th>
                    <th className="py-2">SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 flex items-center gap-4">
                        <img
                          src={item.image || '/bracelet.jpg'}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td>₹{item.price}.00</td>
                      <td>
                        <div className="flex items-center border rounded w-fit">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-lg"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-lg"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-[#72442c] font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Coupon and Update */}
              <div className="flex flex-wrap gap-4 mt-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="border px-4 py-2 w-full sm:w-60"
                />
                <button className="bg-[#72442c] text-white px-6 py-2 rounded hover:bg-[#5a3220] transition">
                  APPLY COUPON
                </button>
              </div>
            </>
          )}
        </div>

        {/* Cart Totals */}
        {cartItems.length > 0 && (
          <div className="border p-6 rounded shadow-sm bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">CART TOTALS</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="text-[#72442c] font-semibold">
                Flat rate: ₹{shippingCost}.00
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Shipping to{' '}
              <span className="font-medium">Jharkhand</span>.{' '}
              <span
                className="text-[#72442c] cursor-pointer"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                Change address
              </span>
            </p>

            {/* Address Form Section */}
            {showAddressForm && (
              <div className="border p-4 bg-white rounded mb-4 animate-fadeIn">
                <h4 className="text-lg font-semibold mb-4">Address</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex flex-col">
                    Full Address
                    <textarea
                      name="address"
                      value={addressForm.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      className="border px-3 py-2 rounded mt-1 resize-none"
                      rows={3}
                    />
                  </label>
                  <label className="flex flex-col">
                    Country
                    <input
                      type="text"
                      name="country"
                      value={addressForm.country}
                      onChange={handleInputChange}
                      className="border px-3 py-2 rounded mt-1"
                      readOnly
                    />
                  </label>
                  <label className="flex flex-col">
                    State
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      className="border px-3 py-2 rounded mt-1"
                    />
                  </label>
                  <label className="flex flex-col">
                    Zip / Pin Code
                    <input
                      type="text"
                      name="zip"
                      value={addressForm.zip}
                      onChange={handleInputChange}
                      placeholder="Enter zip or pin code"
                      className="border px-3 py-2 rounded mt-1"
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold mt-4 border-t pt-2">
              <span>Total</span>
              <span className="text-[#72442c]">₹{total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="bg-[#72442c] w-full mt-6 py-3 text-white rounded hover:bg-[#5a3220] transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
