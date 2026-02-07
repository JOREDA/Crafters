// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // assuming Tailwind or your CSS is imported here
import ShoppingCart from "./components/ShoppingCart";
import { LoaderProvider, WishlistProvider } from './components/contexts';
import { CartProvider } from './components/contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LoaderProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </LoaderProvider>
  </BrowserRouter>
);
