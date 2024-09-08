import React, { useState } from 'react';
import ChatWidget from './ChatWidget';
import ExpandedChatInterface from './ExpandedChatInterface';

const MainApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productContext, setProductContext] = useState(null);

  // Simulating a product context
  // In a real app, this would come from your product page or state management
  React.useEffect(() => {
    setProductContext({
      name: "TrekPro Ultralight Tent",
      image: "/api/placeholder/400/300",
      description: "Lightweight and durable tent perfect for backpacking adventures.",
    });
  }, []);

  return (
    <div className="App">
      {/* Your main app content goes here */}
      <h1 className="text-3xl font-bold m-4">Your Adventure Store</h1>
      
      {isExpanded ? (
        <ExpandedChatInterface 
          onClose={() => setIsExpanded(false)}
          productContext={productContext}
        />
      ) : (
        <ChatWidget 
          onExpand={() => setIsExpanded(true)}
          productContext={productContext}
        />
      )}
    </div>
  );
};

export default MainApp;