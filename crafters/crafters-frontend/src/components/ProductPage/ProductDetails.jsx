import { ProductDetails as _ProductDetails } from './index.jsx';
export default _ProductDetails;
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Features</h3>
                  <ul className="list-disc pl-5 space-y-1 sm:space-y-2 text-base sm:text-lg">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Be the first to review "{product.name}"
              </h2>
              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-base sm:text-lg font-medium mb-1">
                    Your Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={24} sm:size={28}
                        className="cursor-pointer"
                        color={
                          (hoverRating || rating) >= star ? '#fbbf24' : '#d1d5db'
                        }
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewText" className="block text-base sm:text-lg font-medium mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="reviewText"
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base h-24 sm:h-32"
                    placeholder="Write your review here"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="reviewName" className="block text-base sm:text-lg font-medium mb-1">
                      Name
                    </label>
                    <input
                      id="reviewName"
                      type="text"
                      className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviewEmail" className="block text-base sm:text-lg font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="reviewEmail"
                      type="email"
                      className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input id="saveInfo" type="checkbox" className="mr-2" />
                  <label htmlFor="saveInfo" className="text-sm sm:text-base">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>

                <button type="submit" className="bg-[#72442c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-base sm:text-lg">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Category Products Section */}
      <div className="mt-8 sm:mt-16 border-t pt-6 sm:pt-10">
        <CategoryProducts currentProduct={product} />
      </div>

      {/* Continue Shopping button */}
      <NavLink
        to="/products"
        className="inline-block bg-[#72442c] text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base hover:bg-[#8d724a] mt-4 sm:mt-6"
      >
        Continue Shopping
      </NavLink>

      <ToastContainer />
    </div>
  );
}

export default ProductDetails;
