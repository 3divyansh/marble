import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Anjali Mehta",
    position: "Interior Designer, Luxe Spaces",
    feedback:
      "Marvel tiles transformed our clients' homes beautifully. The quality of marble and granite is exceptional, and the finish is absolutely stunning.",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    project: "Luxury Villa Project"
  },
  {
    name: "Rahul Kapoor", 
    position: "Architect, Modern Designs",
    feedback:
      "Working with Marvel has been incredible. Their exotic granite collection exceeded our expectations, and the installation was flawless.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    project: "Commercial Complex"
  },
  {
    name: "Sara Ali",
    position: "Project Manager, Elite Constructions",
    feedback:
      "The marble collection from Marvel is world-class. Perfect finish, timely delivery, and excellent customer service throughout the project.",
    avatar: "https://i.pravatar.cc/150?img=36", 
    rating: 5,
    project: "Residential Towers"
  },
  {
    name: "Karan Malhotra",
    position: "Design Director, Urban Architects",
    feedback:
      "Marvel understands luxury and quality. Their granite tiles elevated our designs to a whole new level. Highly recommended for premium projects.",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    project: "Five-Star Hotel"
  },
  {
    name: "Priya Sharma",
    position: "Interior Consultant, Elegant Homes",
    feedback:
      "Reliable partners who never compromise on quality or deadlines. Marvel's marble collection is our go-to choice for luxury interiors.",
    avatar: "https://i.pravatar.cc/150?img=31",
    rating: 5,
    project: "Premium Residences"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const testimonial1 = testimonials[currentIndex];
    const testimonial2 = testimonials[(currentIndex + 1) % testimonials.length];
    return [testimonial1, testimonial2];
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Client <span className="text-red-500">Testimonials</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Discover what our clients say about Marvel's premium marble and granite collections
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-16">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-red-500/20 rounded-2xl p-8 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-6">
                  <FaQuoteLeft className="text-red-500 text-3xl" />
                  <div className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
                    {testimonial.project}
                  </div>
                </div>

                {/* Feedback */}
                <p className="text-gray-200 text-lg leading-relaxed mb-8 italic">
                  "{testimonial.feedback}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                  ))}
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-red-500 mr-4 shadow-lg"
                  />
                  <div className="text-center">
                    <h4 className="text-white text-xl font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-red-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Testimonials;