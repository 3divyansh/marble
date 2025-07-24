import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    // AOS init would go here if needed
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* IMAGE SECTION */}
        <div className="flex-1 max-w-lg">
          <img
            alt="Marvel Tiles Company Building"
            className="w-full h-[400px]  rounded-lg shadow-2xl object-cover"
            src="https://www.rkmarble.com/wp-content/uploads/2023/01/833X373_THE-COMPANY.jpg"
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 max-w-lg text-center lg:text-left">
          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 inline-block relative">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-4 w-6 h-6 border-4 border-red-600 border-r-0 border-b-0"
            ></span>
            The Company
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 w-6 h-6 border-4 border-red-600 border-l-0 border-t-0"
            ></span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-8">
            The journey of Marvel Group began with a warehouse at Kishangarh,
            Rajasthan in 1989 and over the span of few years, diversified by
            expanding its geographical boundaries within the state in the form of
            villages Dharmeta, Morwad, Dhariyawad, Banswara in Rajasthan and
            village Majoli in Madhya Pradesh.
          </p>

          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-10">
            Today, Marvel stands as a leading name in premium marble and granite 
            tiles, delivering exceptional quality and craftsmanship to transform 
            spaces across the nation.
          </p>

          {/* BUTTON */}
          <button
            aria-label="Read More about The Company"
            className="bg-red-600 text-white px-8 py-4 rounded-md shadow-lg flex items-center gap-3 mx-auto lg:mx-0 hover:bg-red-700 transition duration-300 font-semibold"
          >
            Read More
            <FaArrowRight className="text-white text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;