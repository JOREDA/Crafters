import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-40">
      <h1 className="text-3xl font-bold text-[#72442c] mb-6">Terms and Conditions</h1>
      
      <div className="space-y-6 text-[#72442c]">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="mb-3">
            By accessing and using The Crafters website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Product Information</h2>
          <p className="mb-3">
            We strive to display our handcrafted products as accurately as possible. However, due to the handmade nature of our items:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Colors may vary slightly from the images shown</li>
            <li>Each item is unique and may have slight variations</li>
            <li>Dimensions may vary within reasonable limits</li>
            <li>Product availability is subject to change without notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Ordering and Payment</h2>
          <p className="mb-3">
            When placing an order:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices are in USD unless otherwise stated</li>
            <li>Orders are subject to availability</li>
            <li>We reserve the right to refuse any order</li>
            <li>Payment must be made in full before order processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Shipping and Delivery</h2>
          <p className="mb-3">
            Our shipping terms include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing time: 2-3 business days</li>
            <li>Shipping times vary by location</li>
            <li>International orders may be subject to customs duties</li>
            <li>We are not responsible for shipping delays due to customs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Returns and Refunds</h2>
          <p className="mb-3">
            Our return policy includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>30-day return window from delivery date</li>
            <li>Items must be unused and in original packaging</li>
            <li>Custom orders are non-returnable</li>
            <li>Shipping costs for returns are buyer's responsibility</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
          <p>
            All content on this website, including images, text, and designs, is the property of The Crafters and is protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
          <p>
            For any questions regarding these terms, please contact us at:
            <br />
            Email: legal@thecrafters.com
            <br />
            Phone: 1-800-CRAFTERS
          </p>
        </section>

        <p className="text-sm italic">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions; 