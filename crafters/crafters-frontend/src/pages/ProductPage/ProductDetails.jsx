import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { getProductImage } from '../../utils/productUtils';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const product = useSelector(state => state.product.product);
  const quantity = useSelector(state => state.cart.quantity);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.warning('Please sign in to continue with purchase', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      // Add item to cart before redirecting
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: getProductImage(),
        quantity: quantity
      }));
      navigate('/signup');
      return;
    }

    // If authenticated, add to cart and go to checkout
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getProductImage(),
      quantity: quantity
    }));
    navigate('/checkout');
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default ProductDetails; 