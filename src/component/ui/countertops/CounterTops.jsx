import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CounterTops = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countertops data with different types
  const countertopsData = [
    {
      title: "Kitchen Countertops",
      description: "Sheer elegance and durability, that's what we guarantee with our range of Kitchen Countertop marble. With exquisite looks and strength, our marble will bring the best of both worlds to your space.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
      category: "Kitchen"
    },
    {
      title: "Bathroom Countertops",
      description: "Transform your bathroom into a luxurious retreat with our premium marble countertops. Water-resistant and stunning, these surfaces combine functionality with unmatched beauty for your personal sanctuary.",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop&q=80",
      category: "Bathroom"
    },
    {
      title: "Island Countertops",
      description: "Create a stunning focal point in your kitchen with our island countertops. These statement pieces offer both workspace and visual appeal, making your kitchen island the heart of your home.",
      image: "https://images.unsplash.com/photo-1556909114-356ba2ae4b2a?w=800&h=600&fit=crop&q=80",
      category: "Island"
    },
    {
      title: "Bar Countertops",
      description: "Elevate your entertainment space with sophisticated bar countertops. Designed to withstand daily use while maintaining their pristine appearance, perfect for hosting and socializing.",
      image: "https://images.unsplash.com/photo-1595515106336-8b9b7b8f4b73?w=800&h=600&fit=crop&q=80",
      category: "Bar"
    },
    {
      title: "Office Countertops",
      description: "Professional workspace deserves premium surfaces. Our office countertops provide durability and elegance, creating an inspiring environment that reflects your business standards.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80",
      category: "Office"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % countertopsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + countertopsData.length) % countertopsData.length);
  };

  const currentData = countertopsData[currentSlide];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80";
                }}
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-gray-800">{currentData.category}</span>
              </div>
              
              {/* Slide Number */}
              <div className="absolute bottom-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentSlide + 1} / {countertopsData.length}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-16 bg-red-500 rounded-full"></div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Countertops
                </h1>
                <div className="w-12 h-1 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6 transition-all duration-500">
              <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                {currentData.title}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentData.description}
              </p>
            </div>

            {/* Read More Button */}
            <div className="pt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 group">
                Read More
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-8">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 hover:scale-110 group"
                aria-label="Previous countertop"
              >
                <ChevronLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              
              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 hover:scale-110 group"
                aria-label="Next countertop"
              >
                <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Heat Resistant</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Scratch Proof</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Easy Maintenance</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Marble Varieties</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">15+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterTops;