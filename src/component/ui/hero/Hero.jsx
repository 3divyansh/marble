import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const slideCount = 3;

  const nextSlide = () => {
    setCurrent((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const resetAutoplay = () => {
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    resetAutoplay();
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (touchStartX.current - endX > 50) nextSlide();
    else if (endX - touchStartX.current > 50) prevSlide();
  };

  const handleDotClick = (index) => {
    setCurrent(index);
    resetAutoplay();
  };

  const handleArrowClick = (direction) => {
    direction === 'next' ? nextSlide() : prevSlide();
    resetAutoplay();
  };

  const slides = [
    {
      id: 1,
      title: 'Premium Marble Collection',
      subtitle: '',
      description: 'Discover the finest quality marble tiles for your dream spaces',
      img: 'https://varunmarbles.b-cdn.net/wp-content/uploads/2024/03/italian-marble-flooring-design.jpg',
    },
    {
      id: 2,
      title: 'Exotic Granite',
      subtitle: 'Natural Beauty',
      description: 'Experience the durability and elegance of our handpicked granite selection from around the world',
      img: 'https://cdn.msisurfaces.com/images/blogs/posts/2024/03/msi-desert-dream-granite-kitchen-and-backsplash-min.jpg',
    },
    {
      id: 3,
      title: 'Luxury Tiles',
      subtitle: 'Transform Your Space',
      description: 'From contemporary designs to timeless classics, find the perfect tiles to elevate your interior design',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    },
  ];

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .zoom-animation {
          animation: zoomIn 6s ease-in-out infinite alternate;
        }
        .slide-transition {
          transition: opacity 0.8s ease-in-out;
        }
      `}</style>

      <div className="relative w-full h-[500px] sm:h-[550px] md:h-[620px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 slide-transition ${
              current === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover zoom-animation"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4 md:px-8 lg:px-20">
              <div className="text-white w-full max-w-screen-xl text-center mx-auto pt-10 sm:pt-12 md:pt-16 lg:pt-24">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug mb-4">
                  {slide.title}
                  {slide.subtitle && (
                    <span className="block text-2xl md:text-3xl lg:text-4xl font-light mt-2">
                      {slide.subtitle}
                    </span>
                  )}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-8 py-4 font-semibold rounded text-base md:text-lg flex items-center gap-3 mx-auto shadow-lg">
                  View Products
                  {index === 2 && <FaArrowRight className="text-sm" />}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => handleArrowClick('prev')}
          className="hidden sm:block absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl z-20 hover:text-red-500 transition"
          aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => handleArrowClick('next')}
          className="hidden sm:block absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl z-20 hover:text-red-500 transition"
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-transform duration-300 hover:scale-110 ${
                current === i ? 'bg-red-500' : 'bg-gray-400 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
