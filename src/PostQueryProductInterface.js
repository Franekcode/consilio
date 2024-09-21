import React, { useState } from 'react';
import { Send, X, ShoppingBag, ChevronRight, Star, ShoppingCart, Package, Check } from 'lucide-react';

const ShoppingAssistantWithConsistentColors = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'assistant', content: "Hello! I'm your shopping assistant. How can I help you find the perfect product today?" },
    { type: 'user', content: 'I need a durable tent for winter camping' },
    { type: 'assistant', content: "Based on your need for a durable winter camping tent, I'd recommend the NEMO Chogori 4-Season Mountaineering Tent. It's designed for extreme conditions and offers excellent protection against snow and wind.", 
      productSuggestion: {
        name: "NEMO Chogori 4-Season Mountaineering Tent",
        image: "/images/namiot.png",
        rating: 4.7,
        reviewCount: 128,
        keyPoints: [
          "4-season protection",
          "Durable materials",
          "Excellent wind resistance",
          "Spacious interior"
        ]
      }
    },
    { type: 'user', content: 'That looks great! Do I need a special sleeping bag for winter camping?' },
    { type: 'assistant', content: "Excellent question! For winter camping, you definitely need a sleeping bag rated for low temperatures. I'd recommend pairing the NEMO Chogori tent with our Arctic-Grade Sleeping Bag. Together, they form an ideal winter camping combo.", 
      bundleSuggestion: {
        name: "Winter Camping Duo",
        items: [
          { 
            name: "NEMO Chogori Tent", 
            image: "/images/namiot.png",
            keyPoints: ["4-season protection", "Durable materials"]
          },
          { 
            name: "Arctic-Grade Sleeping Bag", 
            image: "/images/spiwor.png",
            keyPoints: ["-20°F temperature rating", "Water-resistant down"]
          }
        ],
        savings: "10%",
        totalPrice: "$899.99"
      }
    },
    { type: 'user', content: 'Can you tell me more about the sleeping bag?' },
    { type: 'assistant', content: "Certainly! The Arctic-Grade Sleeping Bag is rated for temperatures as low as -20°F (-29°C). It features a draft collar, a full-length zipper draft tube, and is filled with high-quality, water-resistant down insulation. This sleeping bag is designed to keep you warm and comfortable in extreme winter conditions, making it a perfect match for the NEMO Chogori tent.", 
      continuers: [
        "I am side sleeper. Will it be comfortable?",
        "How does this sleeping bag compare to others?",
        "Isnt it overkill for winter camping?"
      ]
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setChatHistory([...chatHistory, { type: 'user', content: query }]);
      setQuery('');
      // Here you would typically call an API to get the assistant's response
    }
  };

  const handleContinuerClick = (continuer) => {
    setChatHistory([...chatHistory, { type: 'user', content: continuer }]);
    // Here you would typically call an API to get the assistant's response
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShoppingBag className="text-white mr-2" size={24} />
          <h2 className="text-white font-bold text-xl">Shopping Assistant</h2>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition">
          <X size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
        {chatHistory.map((message, index) => (
          <div key={index} className="space-y-2">
            <div className={`text-sm ${message.type === 'user' ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
              {message.type === 'user' ? 'You' : 'Assistant'}
            </div>
            <div className={`${
              message.type === 'user' 
                ? 'bg-indigo-50 border-l-4 border-indigo-300 pl-3 py-2 rounded-r-md' 
                : ''
            }`}>
              <div className={`text-gray-800 leading-relaxed ${message.type === 'user' ? 'font-medium' : 'font-normal'}`}>
                {message.content}
              </div>
            </div>
            {message.productSuggestion && (
              <div className="mt-2 bg-indigo-50 p-3 rounded-md shadow-sm border border-indigo-100">
                <div className="flex items-center">
                  <img 
                    src={message.productSuggestion.image} 
                    alt={message.productSuggestion.name}
                    className="w-20 h-20 object-cover rounded-md mr-3 cursor-pointer"
                    onClick={() => {/* Handle click to view product details */}}
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-indigo-800 cursor-pointer hover:underline" onClick={() => {/* Handle click to view product details */}}>
                      {message.productSuggestion.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {renderStars(message.productSuggestion.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({message.productSuggestion.rating}) {message.productSuggestion.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {message.productSuggestion.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <Check size={14} className="text-indigo-500 mr-2" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 w-full bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center">
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            )}
            {message.bundleSuggestion && (
              <div className="mt-2 bg-indigo-50 p-3 rounded-md shadow-sm border border-indigo-100">
                <h4 className="font-semibold text-indigo-800 mb-2">{message.bundleSuggestion.name}</h4>
                <div className="flex justify-between mb-3">
                  {message.bundleSuggestion.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center w-1/2">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-2" />
                      <span className="text-xs text-center font-medium mb-1">{item.name}</span>
                      <ul className="text-xs space-y-1">
                        {item.keyPoints.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-center">
                            <Check size={10} className="text-indigo-500 mr-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-indigo-600">Save {message.bundleSuggestion.savings}</span>
                  <span className="text-sm font-bold">{message.bundleSuggestion.totalPrice}</span>
                </div>
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center">
                  <Package size={16} className="mr-2" />
                  Add Bundle to Cart
                </button>
              </div>
            )}
            {index === chatHistory.length - 1 && message.type === 'assistant' && message.continuers && (
              <div className="mt-2 space-y-2">
                {message.continuers.map((continuer, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleContinuerClick(continuer)}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <ChevronRight size={16} className="mr-1" />
                    {continuer}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center bg-indigo-50 rounded-full overflow-hidden shadow-inner">
          <input
            type="text"
            placeholder="Ask about products, features, or comparisons..."
            className="flex-grow px-5 py-3 bg-transparent outline-none text-gray-800"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="p-3 text-indigo-600 hover:text-indigo-800 transition">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingAssistantWithConsistentColors;