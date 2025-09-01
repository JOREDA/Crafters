import React from 'react';
import FamilyOfProducts from './FamilyOfProducts';
import TypesOfProducts from './TypesOfProducts';
import WhyCrafters from './WhyCrafters';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-orange-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">The Crafters</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:text-yellow-300">Home</a>
          <a href="#family" className="hover:text-yellow-300">Family of Products</a>
          <a href="#types" className="hover:text-yellow-300">Types of Products</a>
          <a href="#why" className="hover:text-yellow-300">Why Crafters</a>
          <a href="#about" className="hover:text-yellow-300">About Us</a>
          <a href="#contact" className="hover:text-yellow-300">Contact Us</a>
        </div>
      </nav>

      {/* Home Section */}
      <section
  id="home"
  className="py-70 text-center bg-gray-100 bg-cover bg-center"
  style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/copy-space-with-sewing-accessories_53876-36514.jpg?w=996')" }}
>
  <h2 className="text-6xl font-bold mb-4 text-black">Welcome to The Crafters</h2>
  <p className="text-lg text-gray-700 mb-6 font-bold">Crafting the finest home decor, bags, and more...</p>
</section>


      {/* Family of Products Section */}
      <section id="family" className="">
        <FamilyOfProducts />
      </section>

      {/* Types of Products Section */}
      <section id="types" className=" bg-gray-100">
        <TypesOfProducts />
      </section>

      {/* Why Crafters Section */}
      <section id="why" className="">
        <WhyCrafters />
      </section>

      {/* About Us Section */}
      <section id="about" className=" bg-gray-100">
        <AboutUs />
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="">
        <ContactUs />
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-4 mt-8">
        <p>&copy; {new Date().getFullYear()} The Crafters. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-yellow-300">Facebook</a>
          <a href="#" className="hover:text-yellow-300">Instagram</a>
          <a href="#" className="hover:text-yellow-300">Pinterest</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
