import React, { useState, useEffect } from 'react';
import { X, Mic, Send, Clock, Compass } from 'lucide-react';

const WidgetInterface = ({ onSearch }) => {
  const [userInput, setUserInput] = useState('');
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

  const handleSubmit = () => {
    if (userInput.trim()) {
      onSearch(userInput);
    }
  };

  const suggestionTopics = [
    "What should I pack for a weekend camping trip?",
    "How do I choose the right hiking boots?",
    "What's the best way to purify water while backpacking?",
    "Can you recommend gear for winter camping?"
  ];

  const recentlyViewedProducts = [
    { name: "Ultralight Tent", image: "/api/placeholder/80/80" },
    { name: "Hiking Boots", image: "/api/placeholder/80/80" },
    { name: "Water Filter", image: "/api/placeholder/80/80" },
    { name: "Solar Charger", image: "/api/placeholder/80/80" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold">Your Outdoor Adventure Assistant</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={28} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center p-8 bg-gradient-to-r from-blue-50 to-green-50 overflow-y-auto">
        {/* Large Text Prompt */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          How can I assist with your outdoor adventure today?
        </h1>

        {/* Interactive Query Area */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex items-center bg-white rounded-full p-4 shadow-lg">
            <textarea
              placeholder={placeholder}
              className="flex-grow outline-none resize-none text-lg bg-transparent"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={2}
            />
            <Mic size={24} className="text-blue-500 ml-4 cursor-pointer hover:text-blue-600" />
            <Send size={24} className="text-green-500 ml-4 cursor-pointer hover:text-green-600" onClick={handleSubmit} />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Ask me anything about gear, trips, or outdoor skills!
          </p>
        </div>

        {/* Suggestion Topics */}
        <div className="w-full max-w-3xl mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Compass className="mr-2" /> Popular Questions
          </h3>
          <div className="flex flex-col gap-3">
            {suggestionTopics.map((topic, index) => (
              <button key={index} className="bg-white text-left text-blue-600 rounded-lg px-4 py-3 text-sm font-medium hover:bg-blue-50 transition duration-300 shadow-sm">
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2" /> Recently Viewed
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentlyViewedProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow hover:shadow-md transition duration-300">
                <img src={product.image} alt={product.name} className="w-full h-20 object-cover rounded mb-2" />
                <p className="text-sm text-center">{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetInterface;