import React, { useState, useEffect } from 'react';
import PostQueryProductInterface from './PostQueryProductInterface';
import ExpandedChatInterface from './ExpandedChatInterface';
import AnimatedWidgetEntryPoint from './AnimatedWidgetEntryPoint';

const MainApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [productContext, setProductContext] = useState(null);
  const [initialQuery, setInitialQuery] = useState('');

  // Simulating a product context
  useEffect(() => {
    setProductContext({
      name: "TrekPro Ultralight Tent",
      image: "/api/placeholder/400/300",
      description: "Lightweight and durable tent perfect for backpacking adventures.",
      rating: 4.7,
      reviewCount: 328,
      price: "$299.99"
    });
  }, []);

  const handleOpenWidget = () => {
    setIsWidgetOpen(true);
    setInitialQuery("Tell me about this tent");  // Example initial query
  };

  const handleCloseWidget = () => {
    setIsWidgetOpen(false);
    setIsExpanded(false);
  };

  const handleBackToSearch = () => {
    setIsWidgetOpen(false);
  };

  return (
    <div className="App">
      {/* Your main app content goes here */}
      <h1 className="text-3xl font-bold m-4">Your Adventure Store</h1>
      
      {isWidgetOpen ? (
        isExpanded ? (
          <ExpandedChatInterface 
            onClose={handleCloseWidget}
            productContext={productContext}
          />
        ) : (
          <PostQueryProductInterface 
            product={productContext}
            onBackToSearch={handleBackToSearch}
            initialQuery={initialQuery}
          />
        )
      ) : (
        <AnimatedWidgetEntryPoint onOpen={handleOpenWidget} />
      )}
    </div>
  );
};

export default MainApp;