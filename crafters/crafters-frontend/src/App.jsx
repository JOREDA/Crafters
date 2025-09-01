import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './components/contexts/CartContext';
import { WishlistProvider } from './components/contexts/WishlistContext';
import { LoaderProvider, useLoader } from './components/contexts/LoaderContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactUsPage';
import ProductPage from './pages/ProductPage';
import StorageBoxPage from './pages/StorageBoxPage';
import LaundryBinPage from './pages/laundryBinPage';
import LampShadePage from './pages/LampShadePage';
import HomeDecorPage from './pages/HomeDecorPage';
import FlowerVasePage from './pages/FlowerVasePage';
import EssentialPage from './pages/EssentialPage';
import BlogPageHome from './pages/BlogPageHome';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPages';
import ProductMain from './components/ProductPage/ProductMain';
import ProductDetails from './components/ProductPage/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderCompletePage from './pages/OrderCompletePage';
import ScrollTop from './components/ScrollTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import ShoppingCart from './components/ShoppingCart';
import BestSellersPage from './pages/BestSellersPage';
import TrendingPage from './pages/TrendingPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import StorageBox from './components/StorageBox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './components/contexts/AuthContext';
import NotFound from './pages/NotFound';
import OrdersPage from './pages/OrdersPage';
import PrivateRoute from './components/PrivateRoute';

const RouteChangeHandler = () => {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [dummyProducts, setDummyProducts] = useState([]);

  return (
    <AuthProvider>
      <LoaderProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
              <RouteChangeHandler />
              <Navbar
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                dummyProducts={dummyProducts}
                setDummyProducts={setDummyProducts}
              />
              <main className="flex-1">
                <ScrollTop />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product" element={<ProductPage />} />
                  <Route path="/product/storage/box" element={<StorageBoxPage />} />
                  <Route path="/product/laundry/bin" element={<LaundryBinPage />} />
                  <Route path="/product/lamps/shade" element={<LampShadePage />} />
                  <Route path="/product/home/decor" element={<HomeDecorPage />} />
                  <Route path="/product/flower/vase" element={<FlowerVasePage />} />
                  <Route path="/product/essential" element={<EssentialPage />} />
                  <Route path="/blog" element={<BlogPageHome />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/products" element={<ProductMain />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  } />
                  <Route path="/order-complete" element={
                    <PrivateRoute>
                      <OrderCompletePage />
                    </PrivateRoute>
                  } />
                  <Route path="/account/orders" element={
                    <PrivateRoute>
                      <OrdersPage />
                    </PrivateRoute>
                  } />
                  <Route path="/bestsellers" element={<BestSellersPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ScrollToTopButton />
                <ShoppingCart
                  cartOpen={cartOpen}
                  setCartOpen={setCartOpen}
                  dummyProducts={dummyProducts}
                  setDummyProducts={setDummyProducts}
                />
                <Footer />
              </main>
              <ToastContainer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </LoaderProvider>
    </AuthProvider>
  );
};

export default App;
