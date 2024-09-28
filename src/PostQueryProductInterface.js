//Using the interface developed earlier


import React, { useState, useEffect } from 'react';
import { Send, X, ShoppingBag, ChevronRight, Star, ShoppingCart, Check } from 'lucide-react';

const ShoppingAssistant = ({ onClose, initialQuery }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const fullConversation = [
    { type: 'user', content: initialQuery },
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
    { type: 'assistant', content: "Would you like to know more about any specific features of this tent?", 
      continuers: [
        "Tell me about its wind resistance",
        "How much does it weigh?",
        "What's the tent's capacity?"
      ]
    },
  ];

  useEffect(() => {
    if (currentMessageIndex < fullConversation.length) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, fullConversation[currentMessageIndex]]);
        setCurrentMessageIndex(prev => prev + 1);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, fullConversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setDisplayedMessages(prev => [...prev, { type: 'user', content: query }]);
      setQuery('');
      // Here you would typically call an API to get the assistant's response
      // For now, we'll just add a loading state
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Add a mock response
        setDisplayedMessages(prev => [...prev, { 
          type: 'assistant', 
          content: "That's a great question about the NEMO Chogori tent. What specific aspect would you like to know more about?"
        }]);
      }, 1500);
    }
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
        {displayedMessages.map((message, index) => (
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
            {message.continuers && (
              <div className="mt-2 space-y-2">
                {message.continuers.map((continuer, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery(continuer)}
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
        {isLoading && (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce200"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce400"></div>
          </div>
        )}
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

export default ShoppingAssistant;