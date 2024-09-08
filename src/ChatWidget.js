import React, { useState } from 'react';
import { MessageSquare, Maximize2, Send } from 'lucide-react';

const ChatWidget = ({ onExpand, productContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const conversationStarters = productContext 
    ? [
        "Tell me more about this product",
        "What are the key features?",
        "How does it compare to similar products?",
      ]
    : [
        "I'm looking for outdoor gear",
        "What's new in camping equipment?",
        "Help me find the perfect hiking boots",
      ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission
    console.log("Message submitted:", input);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Adventure Assistant</h3>
        <button onClick={onExpand} className="text-white hover:text-gray-200">
          <Maximize2 size={20} />
        </button>
      </div>
      <div className="h-96 overflow-y-auto p-4 bg-gray-100">
        {/* Conversation content will go here */}
        <div className="mb-4">
          <p className="text-gray-700 mb-2">How can I assist you today? Here are some suggestions:</p>
          {conversationStarters.map((starter, index) => (
            <button 
              key={index}
              className="block w-full text-left bg-white p-2 rounded mb-2 hover:bg-blue-100 transition duration-300"
              onClick={() => setInput(starter)}
            >
              {starter}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;