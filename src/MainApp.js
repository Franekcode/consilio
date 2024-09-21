import React, { useState } from 'react';
import WidgetInterface from './WidgetInterface';
import PostQueryProductInterface from './PostQueryProductInterface';

const MainApp = () => {
  const [currentView, setCurrentView] = useState('widget');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Simulating a product recommendation based on the query
    setSelectedProduct({
      name: "Premium Ultra-Comfort Office Chair",
      image: "/api/placeholder/200/200",
      rating: 4.7,
      reviewCount: 1289,
      price: "$299.99",
      features: [
        "Ergonomic design for optimal back support",
        "Breathable mesh material",
        "Adjustable armrests and seat height",
        "360-degree swivel with smooth-rolling casters"
      ]
    });
    setCurrentView('product');
  };

  const handleBackToSearch = () => {
    setCurrentView('widget');
    setSelectedProduct(null);
  };

  return (
    <div>
      {currentView === 'widget' ? (
        <WidgetInterface onSearch={handleSearch} />
      ) : (
        <PostQueryProductInterface 
          product={selectedProduct}
          onBackToSearch={handleBackToSearch}
          initialQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default MainApp;