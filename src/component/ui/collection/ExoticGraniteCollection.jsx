import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExoticGraniteCollection = () => {
  const [activeTab, setActiveTab] = useState('spaces');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data for different granite categories
  const graniteData = {
    popular: [
      {
        title: "Black Galaxy",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        description: "Premium black granite with golden speckles and shimmer"
      },
      {
        title: "Kashmir White",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop", 
        description: "Elegant white granite with burgundy and grey patterns"
      },
      {
        title: "Imperial Red",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
        description: "Bold red granite with black and white mineral deposits"
      }
    ],
    colors: [
      {
        title: "Black Granite Collection",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        description: "Deep black granites with stunning mineral patterns"
      },
      {
        title: "White Granite Collection", 
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
        description: "Pure white granites for bright, clean aesthetics"
      },
      {
        title: "Multi-Color Collection",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", 
        description: "Vibrant granite with multiple color variations"
      }
    ],
    spaces: [
      {
        title: "Granite For Kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        description: "Heat-resistant granite perfect for kitchen countertops"
      },
      {
        title: "Granite For Bathroom", 
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
        description: "Water-resistant granite ideal for bathroom vanities"
      },
      {
        title: "Granite For Flooring",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop", 
        description: "Durable granite options for high-traffic floor areas"
      }
    ]
  };

  const currentData = graniteData[activeTab];
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
    { id: 'popular', label: 'Popular Granite' },
    { id: 'colors', label: 'Granite by Colours' },
    { id: 'spaces', label: 'Granite by Spaces' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 relative overflow-hidden">
      {/* Granite Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='60' cy='20' r='1'/%3E%3Ccircle cx='20' cy='60' r='1'/%3E%3Ccircle cx='60' cy='60' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Exotic Granite Collection
          </h1>
          <div className="w-32 h-1 bg-red-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Discover the beauty of nature's finest granite stones</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-full p-2 shadow-xl border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white shadow-lg transform scale-105'
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
              Exotic Granite<br />by Spaces
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Transform your spaces with our premium exotic granite collection. Sourced from the finest quarries worldwide, each piece showcases unique patterns, exceptional durability, and timeless elegance that elevates any architectural design.
            </p>
            
            {/* Navigation Arrows */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-110"
                disabled={totalSlides <= 1}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-110"
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-red-500 scale-125' 
                        : 'bg-gray-300 hover:bg-red-200'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Feature Points */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Heat & Scratch Resistant</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Low Maintenance</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Natural Beauty</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Grid */}
          <div className="w-2/3">
            <div className="grid grid-cols-2 gap-6">
              {getVisibleItems().map((item, index) => (
                <div
                  key={`${activeTab}-${currentSlide}-${index}`}
                  className={`group cursor-pointer transition-all duration-700 hover:transform hover:scale-105 ${
                    index === 0 ? 'col-span-1 row-span-2' : 'col-span-1'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white border border-gray-100">
                    {/* Image */}
                    <div className={`relative ${index === 0 ? 'h-96' : 'h-44'}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=${index === 0 ? '600' : '300'}&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-red-600">
                        Premium
                      </div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className={`font-bold ${index === 0 ? 'text-2xl' : 'text-xl'} mb-2 text-shadow`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm opacity-90 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* View Details Button */}
                      <button className="mt-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                        View Details
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ExoticGraniteCollection;