import React, { useState } from 'react';
import { X, Send, ArrowLeft } from 'lucide-react';

const ExpandedChatInterface = ({ onClose, productContext }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission
    console.log("Message submitted:", input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Adventure Assistant</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={24} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {/* Conversation content will go here */}
        {productContext && (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-bold mb-2">{productContext.name}</h3>
            <img src={productContext.image} alt={productContext.name} className="w-full h-48 object-cover rounded mb-2" />
            <p className="text-gray-700">{productContext.description}</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
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

export default ExpandedChatInterface;