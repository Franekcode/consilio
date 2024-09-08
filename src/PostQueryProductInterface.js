import React, { useState } from 'react';
import { X, Mic, Send, Star, ArrowLeft, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';

const PostQueryProductInterface = ({ product, onBackToSearch, initialQuery }) => {
  const [userInput, setUserInput] = useState('');
  const [assistantResponses, setAssistantResponses] = useState([
    {
      query: initialQuery,
      response: `The TrekPro Ultralight Tent is an excellent choice for backpacking. At just 2.5 lbs, it's one of the lightest in its category, perfect for long treks. It sets up quickly in under 5 minutes, ideal for efficient camp setup.

With a 5000mm waterproof rating, it offers robust protection against rain. The 3-season design makes it versatile for spring, summer, and fall camping. However, it may not be suitable for harsh winter conditions.

Given its features and positive reviews, this tent offers good value at $299.99. It's well-suited for backpackers prioritizing lightweight gear without compromising on quality and weather protection.`
    }
  ]);
  const [expandedResponses, setExpandedResponses] = useState([0]);
  const [showAllResponses, setShowAllResponses] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const recommendedProducts = [
    { name: "MountainDreams 20°F Down Sleeping Bag", price: "$199.99", image: "/api/placeholder/150/150" },
    { name: "PocketFlame Ultralight Stove", price: "$49.99", image: "/api/placeholder/150/150" },
    { name: "AquaPure Micro Filter", price: "$89.99", image: "/api/placeholder/150/150" },
    { name: "LightTrail Hiking Poles", price: "$79.99", image: "/api/placeholder/150/150" }
  ];

  const handleFollowUpQuery = () => {
    if (userInput.trim()) {
      let newResponse = "";
      if (userInput.toLowerCase().includes("recommend") || userInput.toLowerCase().includes("suggest")) {
        newResponse = "Based on your interest, I've prepared some recommendations for you. You can view them below.";
        setShowRecommendations(true);
      } else {
        newResponse = `The TrekPro Ultralight Tent is designed to balance durability with lightweight construction. It uses ripstop nylon for the body and rainfly, which provides excellent tear resistance. The poles are made of lightweight aluminum, offering a good strength-to-weight ratio.

For ventilation, it features mesh panels and adjustable vents in the rainfly to manage condensation. This design works well in most conditions, but in very humid environments, you might still experience some condensation.

Remember, while it's highly water-resistant, it's always a good idea to use a footprint (sold separately) to protect the tent floor and prolong its lifespan.`;
      }

      const newResponses = [...assistantResponses, { query: userInput, response: newResponse }];
      setAssistantResponses(newResponses);
      setExpandedResponses([...expandedResponses, newResponses.length - 1]);
      setUserInput('');
    }
  };

  const toggleResponseExpansion = (index) => {
    setExpandedResponses(expandedResponses.includes(index) 
      ? expandedResponses.filter(i => i !== index)
      : [...expandedResponses, index]
    );
  };

  const visibleResponses = showAllResponses ? assistantResponses : assistantResponses.slice(-3);

  if (!product) {
    return null; // or some loading state
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
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-1" size={20} />
                <span className="font-bold mr-2">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold w-max">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Conversation Thread */}
        {assistantResponses.length > 3 && !showAllResponses && (
          <button 
            onClick={() => setShowAllResponses(true)}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <ChevronDown size={20} className="mr-2" />
            Show Previous Responses
          </button>
        )}
        {visibleResponses.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mb-6">
            <div className="bg-blue-100 p-4 rounded-t-lg">
              <p className="font-semibold text-blue-800">{item.query}</p>
            </div>
            <div className="p-4">
              {expandedResponses.includes(index) ? (
                <p className="whitespace-pre-line">{item.response}</p>
              ) : (
                <p>{item.response.slice(0, 100)}...</p>
              )}
              <button 
                onClick={() => toggleResponseExpansion(index)} 
                className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
              >
                {expandedResponses.includes(index) ? (
                  <>
                    <ChevronUp size={20} className="mr-1" /> Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} className="mr-1" /> Read More
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
        {showAllResponses && (
          <button 
            onClick={() => setShowAllResponses(false)}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <ChevronUp size={20} className="mr-2" />
            Hide Previous Responses
          </button>
        )}

        {/* Recommendations View */}
        {showRecommendations && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h4 className="text-xl font-semibold mb-4">Recommended Products</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition duration-300">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-2" />
                  <h5 className="font-semibold text-center mb-1">{item.name}</h5>
                  <p className="text-green-600 font-bold">{item.price}</p>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Query Area */}
        <div className="w-full mb-8">
          <h4 className="text-xl font-semibold mb-4">Have a follow-up question or need a recommendation?</h4>
          <div className="flex items-center bg-white rounded-full p-4 shadow-md">
            <textarea
              placeholder="Ask anything else about this product or request recommendations..."
              className="flex-grow outline-none resize-none text-lg bg-transparent"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={2}
            />
            <Mic size={24} className="text-blue-500 ml-4 cursor-pointer hover:text-blue-600" />
            <Send size={24} className="text-green-500 ml-4 cursor-pointer hover:text-green-600" onClick={handleFollowUpQuery} />
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4">Key Features</h4>
            <ul className="list-disc pl-5">
              {product.features.map((feature, index) => (
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