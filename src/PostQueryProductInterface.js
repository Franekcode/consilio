import React, { useState } from 'react';
import { X, Mic, Send, Star, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

const PostQueryProductInterface = ({ product, onBackToSearch, initialQuery }) => {
  const [userInput, setUserInput] = useState('');

  if (!product) {
    return <div>Loading...</div>; // or some loading state
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <button className="flex items-center text-blue-600 hover:text-blue-800" onClick={onBackToSearch}>
          <ArrowLeft size={20} className="mr-2" />
          Back to search
        </button>
        <h2 className="text-2xl font-bold">Your Outdoor Adventure Assistant</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={28} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col p-8 bg-gradient-to-r from-blue-50 to-green-50 overflow-y-auto">
        {/* Product Information */}
        <div className="flex mb-8">
          <img src={product.image} alt={product.name} className="w-1/3 rounded-lg shadow-md" />
          <div className="ml-8 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold mb-2">{product.name}</h3>
              {product.rating && product.reviewCount && (
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400 mr-1" size={20} />
                  <span className="font-bold mr-2">{product.rating}</span>
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              )}
              {product.price && <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>}
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold w-max">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Assistant's Response */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
          <h4 className="text-xl font-semibold mb-4">Response to: {initialQuery}</h4>
          <p>
            The TrekPro Ultralight Tent is an excellent choice for backpacking. At just 2.5 lbs, it's one of the lightest in its category, perfect for long treks. It sets up quickly in under 5 minutes, ideal for efficient camp setup.
          </p>
          {/* ... (rest of the response) */}
        </div>

        {/* Interactive Query Area */}
        <div className="w-full mb-8">
          <h4 className="text-xl font-semibold mb-4">Have a follow-up question?</h4>
          <div className="flex items-center bg-white rounded-full p-4 shadow-md">
            <textarea
              placeholder="Ask anything else about this product..."
              className="flex-grow outline-none resize-none text-lg bg-transparent"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={2}
            />
            <Mic size={24} className="text-blue-500 ml-4 cursor-pointer hover:text-blue-600" />
            <Send size={24} className="text-green-500 ml-4 cursor-pointer hover:text-green-600" />
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4">Key Features</h4>
            <ul className="list-disc pl-5">
              {product.features && product.features.map((feature, index) => (
                <li key={index} className="mb-2">{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Actions</h4>
            <div className="space-y-2">
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-full hover:bg-gray-300 transition duration-300">
                Compare with Similar Products
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-full hover:bg-gray-300 transition duration-300">
                View Customer Reviews
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-full hover:bg-gray-300 transition duration-300">
                See Technical Specs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="p-6 bg-gray-100 flex justify-between items-center">
        <span className="text-lg font-semibold">Was this information helpful?</span>
        <div className="flex space-x-4">
          <button className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full hover:bg-green-200 transition duration-300">
            <ThumbsUp size={20} className="mr-2" /> Yes
          </button>
          <button className="flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full hover:bg-red-200 transition duration-300">
            <ThumbsDown size={20} className="mr-2" /> No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostQueryProductInterface;