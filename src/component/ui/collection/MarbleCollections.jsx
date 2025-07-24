import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MarbleCollections = () => {
  const [activeTab, setActiveTab] = useState('spaces');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for different marble categories
  const marbleData = {
    popular: [
      {
        title: "Carrara White",
        image: "/api/placeholder/400/300",
        description: "Classic Italian marble with subtle grey veining"
      },
      {
        title: "Calacatta Gold",
        image: "/api/placeholder/400/300", 
        description: "Luxurious white marble with bold golden veins"
      },
      {
        title: "Nero Marquina",
        image: "/api/placeholder/400/300",
        description: "Elegant black marble with distinctive white veining"
      }
    ],
    colors: [
      {
        title: "White Marble Collection",
        image: "/api/placeholder/400/300",
        description: "Pure white marbles for timeless elegance"
      },
      {
        title: "Black Marble Collection", 
        image: "/api/placeholder/400/300",
        description: "Bold black marbles for dramatic interiors"
      },
      {
        title: "Grey Marble Collection",
        image: "/api/placeholder/400/300", 
        description: "Sophisticated grey tones for modern spaces"
      }
    ],
    spaces: [
      {
        title: "Marble For Washroom",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
        description: "Water-resistant marble perfect for bathroom applications"
      },
      {
        title: "Marble For Bedroom", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        description: "Elegant marble designs for luxurious bedroom spaces"
      },
      {
        title: "Marble For Flooring",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", 
        description: "Durable marble options for stunning floor installations"
      }
    ]
  };

  const currentData = marbleData[activeTab];
  const totalSlides = Math.ceil(currentData.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleItems = () => {
    const startIndex = currentSlide * 3;
    return currentData.slice(startIndex, startIndex + 3);
  };

  const tabs = [
    { id: 'popular', label: 'Popular Marble' },
    { id: 'colors', label: 'Marble by Colours' },
    { id: 'spaces', label: 'Marble by Spaces' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Marble Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Marble Collections
          </h1>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-full p-2 shadow-lg border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-8">
          {/* Left Side Content */}
          <div className="w-1/3">
            <h2 className="text-4xl font-bold text-red-500 mb-6 leading-tight">
              Marble<br />by Spaces
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Enhance the aura of every space you create with high-quality marble from R K Marble. Our marble are sourced exclusively from the greatest mines across the globe, with the sole aim of creating wonderous spaces.
            </p>
            
            {/* Navigation Arrows */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors duration-300"
                disabled={totalSlides <= 1}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors duration-300"
                disabled={totalSlides <= 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex gap-2 mt-6">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentSlide ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Image Grid */}
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-6">
              {getVisibleItems().map((item, index) => (
                <div
                  key={`${activeTab}-${currentSlide}-${index}`}
                  className={`group cursor-pointer transition-all duration-500 hover:transform hover:scale-105 ${
                    index === 0 ? 'col-span-1 row-span-2' : 'col-span-1'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
                    {/* Image */}
                    <div className={`relative ${index === 0 ? 'h-96' : 'h-44'}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=${index === 0 ? '600' : '300'}&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className={`font-bold ${index === 0 ? 'text-2xl' : 'text-xl'} mb-2`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm opacity-90">
                        {item.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
            Explore Full Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarbleCollections;