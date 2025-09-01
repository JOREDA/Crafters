import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaHandHoldingHeart, FaLeaf, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="container mx-auto px-4 py-16"
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#72442c] mb-4">About Us</h2>
        <p className="text-lg text-gray-600">Discover our story and commitment to quality</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp} className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#72442c]">Our Story</h3>
          <p className="text-gray-600">
            At The Crafters, we believe in the beauty of handcrafted items. Our journey began with a simple idea:
            to create beautiful, sustainable products that bring warmth and character to your home.
          </p>
          <p className="text-gray-600">
            Each piece in our collection is carefully crafted by skilled artisans who pour their heart and soul
            into every detail. We work directly with local craftsmen, ensuring fair wages and sustainable practices.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#72442c]">Our Mission</h3>
          <p className="text-gray-600">
            We're committed to preserving traditional craftsmanship while embracing modern design sensibilities.
            Our mission is to bring unique, handcrafted pieces to homes around the world while supporting local artisans.
          </p>
          <p className="text-gray-600">
            Sustainability is at the core of everything we do. From sourcing materials to packaging, we strive
            to minimize our environmental impact while maximizing the beauty and quality of our products.
          </p>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp} className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#72442c] mb-4">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#e5d0b1] rounded-lg">
            <h4 className="text-xl font-semibold text-[#72442c] mb-2">Quality</h4>
            <p className="text-gray-600">Every piece is crafted with attention to detail and quality materials</p>
          </div>
          <div className="p-6 bg-[#e5d0b1] rounded-lg">
            <h4 className="text-xl font-semibold text-[#72442c] mb-2">Sustainability</h4>
            <p className="text-gray-600">Eco-friendly practices and materials in every step of production</p>
          </div>
          <div className="p-6 bg-[#e5d0b1] rounded-lg">
            <h4 className="text-xl font-semibold text-[#72442c] mb-2">Community</h4>
            <p className="text-gray-600">Supporting local artisans and traditional craftsmanship</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-[#f8f5f1] py-12 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#72442c]">500+</div>
              <div className="text-gray-600 mt-2">Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#72442c]">1000+</div>
              <div className="text-gray-600 mt-2">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#72442c]">50+</div>
              <div className="text-gray-600 mt-2">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#72442c]">10K+</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Who We Are */}
        <section className="mb-16">
          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-[#72442c] mb-6">Who We Are</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>The Crafters</strong> is more than just a marketplace - we're a community of passionate
                  artisans, designers, and craft enthusiasts dedicated to preserving and promoting the rich
                  heritage of handcrafted excellence.
                </p>
                <p className="text-lg text-gray-700">
                  Founded in 2020, we've grown from a small collective of local artisans to a thriving
                  platform that connects skilled craftspeople with appreciative customers worldwide.
                  Our team carefully curates each piece, ensuring that every item meets our high
                  standards of quality and authenticity.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8f5f1] p-6 rounded-lg text-center">
                  <FaUsers className="text-4xl text-[#72442c] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Community First</h3>
                  <p className="text-sm text-gray-600">Supporting artisan communities</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg text-center">
                  <FaAward className="text-4xl text-[#72442c] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Highest craftsmanship standards</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg text-center">
                  <FaLeaf className="text-4xl text-[#72442c] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                  <p className="text-sm text-gray-600">Sustainable practices</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg text-center">
                  <FaHandHoldingHeart className="text-4xl text-[#72442c] mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Fair Trade</h3>
                  <p className="text-sm text-gray-600">Ethical business practices</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <motion.div variants={fadeInUp} className="bg-[#F5F5DC] rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-[#72442c] mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  At <strong>The Crafters</strong>, our mission extends beyond commerce. We're committed to:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>Preserving traditional crafting techniques and cultural heritage</li>
                  <li>Empowering artisans through fair compensation and sustainable practices</li>
                  <li>Promoting eco-friendly and sustainable crafting methods</li>
                  <li>Creating economic opportunities in rural communities</li>
                  <li>Bringing authentic, handcrafted products to global markets</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#72442c] mb-4">Impact Numbers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Artisan Employment</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#72442c] h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Sustainable Materials</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#72442c] h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Rural Development</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#72442c] h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Our Vision */}
        <section className="mb-16">
          <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-[#72442c] mb-6">Our Vision</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  We envision a world where traditional craftsmanship thrives alongside modern innovation,
                  creating sustainable livelihoods while preserving cultural heritage.
                </p>
                <p className="text-lg text-gray-700">
                  Our goals for the next decade include:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>Expanding our artisan network to 1000+ craftspeople</li>
                  <li>Establishing craft training centers in 20+ rural locations</li>
                  <li>Achieving 100% sustainable packaging and materials</li>
                  <li>Creating digital platforms for craft education</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8f5f1] p-6 rounded-lg">
                  <h3 className="font-semibold text-[#72442c] mb-2">Global Reach</h3>
                  <p className="text-gray-600">Expanding to 50+ countries</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg">
                  <h3 className="font-semibold text-[#72442c] mb-2">Innovation</h3>
                  <p className="text-gray-600">Blending tradition with technology</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg">
                  <h3 className="font-semibold text-[#72442c] mb-2">Education</h3>
                  <p className="text-gray-600">Training next-gen artisans</p>
                </div>
                <div className="bg-[#f8f5f1] p-6 rounded-lg">
                  <h3 className="font-semibold text-[#72442c] mb-2">Sustainability</h3>
                  <p className="text-gray-600">Zero-waste operations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Our Products */}
        <section className="mb-16">
          <motion.div variants={fadeInUp} className="bg-[#FAF9F6] rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-[#72442c] mb-6">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-[#72442c] mb-3">Traditional Arts</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Hand-painted pottery</li>
                  <li>Wooden sculptures</li>
                  <li>Metal crafts</li>
                  <li>Traditional paintings</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-[#72442c] mb-3">Home Decor</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Handwoven textiles</li>
                  <li>Bamboo furniture</li>
                  <li>Decorative items</li>
                  <li>Wall hangings</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-[#72442c] mb-3">Eco-Friendly</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Sustainable crafts</li>
                  <li>Recycled art</li>
                  <li>Natural materials</li>
                  <li>Zero-waste products</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <motion.div variants={fadeInUp} className="bg-[#72442c] text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-lg mb-6">
              We'd love to hear from you! Whether you're interested in our products,
              want to collaborate, or just want to say hello, reach out to us.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <a href="mailto:thecrafters.co.in@gmail.com" className="text-white hover:text-[#F5F5DC]">
                  thecrafters.co.in@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <a href="tel:+918084593583" className="text-white hover:text-[#F5F5DC]">
                  +91 8084593583
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <p>Connect with us on social media</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutPage;
