// src/pages/HomePage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FamilyOfProducts from "../components/FamilyOfProducts";
import OurProduct from "../components/OurProduct";
import CustomerSatisfaction from "../components/CustomerSatisfaction";
import BestProduct from "../components/BestProduct";
import MoreProducts from "../components/MoreProducts";
import OurGlimpses from "../components/OurGlimpses";
import Testimonials from "../components/Testimonials";
import Crafters from "../components/Crafters";
import CraftersShowcase from "../components/CraftersShowcase";
import Quote from "../components/Quote/Quote";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CraftersShowcase />
      <FamilyOfProducts />
      <OurProduct />
      <CustomerSatisfaction />
      {/* <BestProduct /> */}
      <MoreProducts />
      <Quote />
      <OurGlimpses />
      <Testimonials />
      <Crafters />
    </>
  );
};

export default HomePage;
