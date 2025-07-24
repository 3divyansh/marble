import React, { useEffect, useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: "Where is R K Marble location?",
    answer: "R K Marble is located at Makrana Road, Madanganj - Kishangarh, Rajasthan, India, 305801...",
  },
  {
    question: "What is special about marble?",
    answer: "Marble is a metamorphic rock formed from limestone or dolomite. It's prized for its natural beauty...",
  },
  {
    question: "How is marble formed in nature?",
    answer: "Marble is formed through metamorphism of limestone or dolomite rocks under intense heat and pressure...",
  },
  {
    question: "What type of rock is granite?",
    answer: "Granite is an igneous rock formed from the slow crystallization of magma beneath the Earth's surface...",
  },
  {
    question: "How to check the quality of marble?",
    answer: "Quality marble can be identified by: 1) Uniform color, 2) Smooth surface, 3) Low absorption rate...",
  },
  {
    question: "Where to use imported marble?",
    answer: "Imported marble is perfect for luxury homes, hotels, bathrooms, kitchen counters, and decorative walls...",
  },
  {
    question: "What is the difference between marble and granite?",
    answer: "Marble is softer and more porous, ideal for elegance. Granite is harder and better for high-traffic areas...",
  },
  {
    question: "Do you provide installation services?",
    answer: "Yes, we offer full installation by professionals to ensure the product's quality is preserved...",
  },
  {
    question: "What are your delivery options?",
    answer: "We provide reliable delivery across India and globally with professional logistics handling...",
  },
  {
    question: "Can I see samples before ordering?",
    answer: "Absolutely! Visit our showroom or request samples to be shipped for a better decision-making experience...",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our premium marble and granite
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full px-6 py-5 text-left text-gray-800 font-medium hover:text-red-600 transition-colors duration-200"
              >
                <span className="text-lg">{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-red-600 text-xl flex-shrink-0 ml-4" />
                ) : (
                  <FaChevronDown className="text-gray-500 text-xl flex-shrink-0 ml-4" />
                )}
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : '0px',
                }}
                className="px-6 overflow-hidden transition-all duration-500 ease-in-out"
              >
                <div className="py-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
