import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  Search, 
  Tag, 
  Share2, 
  Heart, 
  MessageCircle, 
  BookmarkPlus,
  ChevronRight
} from 'lucide-react';
import blog from '../assets/blog.jpg';

const categories = [
  "All Posts",
  "Handicrafts",
  "Home Decor",
  "Sustainable Living",
  "Artisan Stories",
  "DIY Projects"
];

const blogPosts = [
  {
    title: 'The Art of Handicrafts: Why Handmade Still Matters',
    imageUrl: blog,
    date: 'May 15, 2025',
    category: 'Handicrafts',
    readTime: '5 min read',
    likes: 124,
    comments: 45,
    excerpt:
      'Discover why handmade crafts continue to hold significant value in our modern, mass-produced world. Explore the unique charm and character that only handcrafted items can bring to your space.',
    tags: ['handicrafts', 'artisan', 'traditional']
  },
  {
    title: '5 Must-Have Handicrafts for Your Home Decor',
    imageUrl: 'https://img.freepik.com/free-photo/home-interior-with-handmade-items_23-2150540071.jpg?w=740',
    date: 'May 10, 2025',
    category: 'Home Decor',
    readTime: '4 min read',
    likes: 98,
    comments: 32,
    excerpt:
      'Transform your living space with these carefully curated handcrafted pieces. Learn how to incorporate artisanal elements that add warmth and character to your home.',
    tags: ['home decor', 'interior design', 'crafts']
  },
  {
    title: 'Sustainable Living with Artisan Products',
    imageUrl: 'https://img.freepik.com/free-photo/eco-friendly-products-concept_23-2148942690.jpg?w=740',
    date: 'May 5, 2025',
    category: 'Sustainable Living',
    readTime: '6 min read',
    likes: 156,
    comments: 67,
    excerpt:
      'Explore how choosing artisan-made products can contribute to a more sustainable lifestyle. Discover eco-friendly crafts that make a difference.',
    tags: ['sustainability', 'eco-friendly', 'green living']
  },
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-[#fef9f4] min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#72442c] mb-4">The Crafters Blog</h1>
        <p className="text-gray-600 text-lg">Stories & inspirations from the world of handmade art</p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl shadow-md p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#72442c] focus:border-transparent transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#72442c] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPosts.map((post, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onHoverStart={() => setHoveredPost(index)}
            onHoverEnd={() => setHoveredPost(null)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              <motion.div 
                className="relative lg:w-1/2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-[#72442c]">
                    {post.category}
                  </span>
                </div>
              </motion.div>

              <div className="flex-1 p-6 lg:p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 hover:text-[#72442c] transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{post.likes}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span>{post.comments}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-500 hover:text-[#72442c] transition-colors"
                    >
                      <BookmarkPlus className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#72442c] text-white rounded-full text-sm hover:bg-[#8d724a] transition-colors"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#72442c] mb-4">Stay Updated</h3>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest articles and updates</p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#72442c] focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#72442c] text-white rounded-r-lg hover:bg-[#8d724a] transition-colors"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
