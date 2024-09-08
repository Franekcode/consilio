import React, { useState } from 'react';
import WidgetInterface from './WidgetInterface';
import PostQueryProductInterface from './PostQueryProductInterface';

const MainApp = () => {
  const [currentView, setCurrentView] = useState('search');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchQuery(query);
    // In a real application, you would perform the search here
    // For now, we'll just switch to the product view
    setCurrentView('product');
    setSelectedProduct({
      name: "TrekPro Ultralight Tent",
      image: "/api/placeholder/400/300",
      rating: 4.7,
      reviewCount: 328,
      price: "$299.99",
      features: [
        "Weighs only 2.5 lbs",
        "Sets up in under 5 minutes",
        "Waterproof rating: 5000mm",
        "3-season design"
      ]
    });
    console.log('Switched to product view');
  };

  const handleBackToSearch = () => {
    console.log('Switching back to search view');
    setCurrentView('search');
    setSelectedProduct(null);
  };

  console.log('Current view:', currentView);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {currentView === 'search' ? (
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