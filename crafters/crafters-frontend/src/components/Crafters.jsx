import React from "react";

const Crafters = () => {
  const items = [
    {
      title: "Handcrafted Comfort",
      description:
        "Lightweight, flexible, and beautifully made, The Crafters shoes turn every step into a crafted experience. Slip into artisanal ease—whether you're strolling, working, or relaxing, our handcrafted support is always with you.",
      linkText: "Learn More",
      linkHref: "#",
    },
    {
      title: "Thoughtful Sustainability",
      description:
        "From sourcing to delivery, we aim to shrink our environmental impact. With responsible craftsmanship and ethical materials, we don’t wait for the future—we create it with every product we make.",
      linkText: "Learn More",
      linkHref: "#",
    },
    {
      title: "Natural Materials Only",
      description:
        "We swap synthetic shortcuts for organic choices—cotton, cork, jute, and more. Our products are breathable, durable, and naturally kind to the Earth. It’s not just style—it’s a sustainable statement.",
      linkText: "Learn More",
      linkHref: "#",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Main Heading */}
      <h2 className="text-3xl font-bold mb-10 text-center">The Crafters Approach</h2>

      {/* Content blocks */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {items.map(({ title, description, linkText, linkHref }, index) => (
          <div
            key={index}
            className="flex-1 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-700 mb-6">{description}</p>
            <a
              href={linkHref}
              className="text-indigo-600 font-medium hover:underline"
            >
              {linkText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Crafters;
