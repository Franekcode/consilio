//Using the interface developed earlier

import React, { useState, useEffect } from 'react';
import { Send, X, ShoppingBag, ChevronRight } from 'lucide-react';

const WidgetInterface = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const placeholders = [
    "What kind of adventure are you planning?",
    "Tell me about your ideal camping trip",
    "What's your biggest outdoor challenge?",
    "Dreaming of new gear? Let's chat!",
    "What's your next outdoor goal?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const suggestionTopics = [
    "What should I pack for a weekend camping trip?",
    "How do I choose the right hiking boots?",
    "What's the best way to purify water while backpacking?",
    "Can you recommend gear for winter camping?"
  ];

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <ShoppingBag className="text-white mr-2" size={24} />
          <h2 className="text-white font-bold text-xl">Shopping Assistant</h2>
        </div>
        <button className="text-white hover:text-gray-200 transition">
          <X size={24} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-center text-indigo-800 mb-4">
          How can I assist with your outdoor adventure today?
        </h1>

        {/* Suggestion Topics */}
        <div className="w-full mb-4">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Popular Questions</h3>
          <div className="space-y-2">
            {suggestionTopics.map((topic, index) => (
              <button 
                key={index}
                className="w-full text-left text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition px-4 py-2 rounded-lg"
                onClick={() => setQuery(topic)}
              >
                <div className="flex items-center">
                  <ChevronRight size={16} className="mr-2 text-indigo-400" />
                  <span>{topic}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center bg-indigo-50 rounded-full overflow-hidden shadow-inner">
          <input
            type="text"
            placeholder={placeholder}
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

export default WidgetInterface;