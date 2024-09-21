import React, { useState } from 'react';
import { Search, Mic, ArrowRight } from 'lucide-react';

const WidgetInterface = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const conversationStarters = [
    "What's the best laptop for a college student?",
    "I need comfortable running shoes for daily use",
    "Recommend a good book for learning photography",
    "What's a great gift for a coffee enthusiast?"
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg w-80 h-[500px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
        <h2 className="text-lg font-bold text-white">Shopping Assistant</h2>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Try asking about:</h3>
        <ul className="space-y-3">
          {conversationStarters.map((starter, index) => (
            <li 
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
              onClick={() => setQuery(starter)}
            >
              <span className="text-sm text-gray-800">{starter}</span>
              <ArrowRight size={16} className="text-blue-500" />
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Query Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-grow bg-transparent outline-none text-sm px-4 py-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Mic className="text-blue-500 cursor-pointer mx-2" size={18} />
          <button 
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={handleSearch}
          >
            <Search size={18} />
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          I can help you find products, compare options, and answer questions about our inventory.
        </p>
      </div>
    </div>
  );
};

export default WidgetInterface;