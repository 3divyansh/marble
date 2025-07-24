import React, { useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const images = [
  {
    src: "https://images.unsplash.com/photo-1615971677499-5467cbab2e85?q=80&w=1200&auto=format&fit=crop",
    title: "Carrara White Marble",
    description: "Premium Italian marble with elegant white veining patterns perfect for luxury interiors.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    title: "Black Galaxy Granite",
    description: "Exotic granite with sparkling golden speckles that create a stunning night sky effect.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
    title: "Calacatta Gold Marble",
    description: "Luxurious marble featuring bold gold veining on pristine white background.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?q=80&w=1200&auto=format&fit=crop",
    title: "Verde Guatemala Marble",
    description: "Rich green marble with natural patterns, perfect for statement walls and countertops.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    title: "Emperador Brown Marble",
    description: "Warm brown marble with intricate veining, ideal for creating cozy sophisticated spaces.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1200&auto=format&fit=crop",
    title: "Kashmir White Granite",
    description: "Premium white granite with subtle gray and burgundy speckles for elegant flooring.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=1200&auto=format&fit=crop",
    title: "Statuario Marble",
    description: "Classic Italian marble with dramatic gray veining, perfect for sculptures and luxury spaces.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1541123892971-a4a77b6d9f8e?q=80&w=1200&auto=format&fit=crop",
    title: "Absolute Black Granite",
    description: "Pure black granite with mirror-like finish, ideal for modern minimalist designs.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1200&auto=format&fit=crop",
    title: "Thassos White Marble",
    description: "Pure white Greek marble with crystalline structure, perfect for bathrooms and kitchens.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1200&auto=format&fit=crop",
    title: "Red Dragon Granite",
    description: "Exotic red granite with unique patterns, perfect for creating bold statement pieces.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1541123604673-e6e1b5b76da6?q=80&w=1200&auto=format&fit=crop",
    title: "Botticino Marble",
    description: "Classic beige marble with subtle veining, ideal for traditional and contemporary designs.",
    rating: 5
  },
  {
    src: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?q=80&w=1200&auto=format&fit=crop",
    title: "Blue Bahia Granite",
    description: "Stunning blue granite with unique patterns, perfect for luxury countertops and accents.",
    rating: 5
  }
];

const Gallery = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;
      const cardWidth = container.clientWidth / getVisibleCards();

      container.scrollBy({ left: cardWidth, behavior: "smooth" });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    const container = scrollRef.current;
    const cardWidth = container.clientWidth / getVisibleCards();
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3.5;
  };

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-red-500">Gallery</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our premium collection of marble and granite tiles showcasing exceptional quality and timeless elegance
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-6 px-2 sm:px-4 md:px-6 lg:px-10 snap-x py-4"
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="
                  w-[92%] 
                  sm:w-[85%] 
                  md:w-[48%] 
                  lg:w-[28%] 
                  h-[400px]
                  flex-shrink-0 
                  bg-white 
                  rounded-xl 
                  shadow-lg 
                  hover:shadow-2xl 
                  transition-all
                  duration-300 
                  snap-start
                  overflow-hidden
                  group
                  hover:scale-105
                "
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay with title and stars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">{img.title}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(img.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                        <span className="text-white text-sm ml-2">({img.rating}.0)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{img.description}</p>
                  <button className="mt-3 text-red-500 text-sm font-semibold hover:text-red-600 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg z-10 transition-all duration-300"
            onClick={() => scroll("left")}
            aria-label="Previous images"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <button
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg z-10 transition-all duration-300"
            onClick={() => scroll("right")}
            aria-label="Next images"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>

       
      </div>

      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Gallery;