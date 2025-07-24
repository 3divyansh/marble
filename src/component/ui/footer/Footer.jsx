import React, { useState, useEffect } from "react";
import {
  FaArrowUp,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaFax,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "The Company", path: "/the-company" },
    { name: "Products", path: "/products" },
    { name: "Media Resources", path: "/media-resources" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Downloads Catalogue", path: "/downloads" },
    { name: "Compliance", path: "/compliance" }
  ];

  const collections = [
    { name: "Imported Marble", path: "/imported-marble" },
    { name: "Exotic Granite", path: "/exotic-granite" },
    { name: "Statuario Marble", path: "/statuario-marble" },
    { name: "Italian Marble", path: "/italian-marble" },
    { name: "White Marble", path: "/white-marble" },
    { name: "Countertops", path: "/countertops" }
  ];

  return (
    <div className="bg-gray-100">
      <footer className="bg-gray-100 w-full py-16 px-8 md:px-24">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Quick Links - Split into two columns */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-6 uppercase tracking-wider">
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.slice(0, 5).map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block text-gray-700 hover:text-red-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* More Quick Links */}
            <div>
              <h3 className="text-transparent text-lg font-bold mb-6 uppercase tracking-wider">
                Links
              </h3>
              <div className="space-y-3">
                {quickLinks.slice(5).map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block text-gray-700 hover:text-red-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-6 uppercase tracking-wider">
                Collections
              </h3>
              <div className="space-y-3">
                {collections.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block text-gray-700 hover:text-red-500 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-6 uppercase tracking-wider">
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-600 mt-1 flex-shrink-0" />
                  <div className="text-gray-700">
                    <p>Makrana Road, Madanganj - Kishangarh,</p>
                    <p>Rajasthan, India, 305801</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">+91-1463-250501, 277777</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaFax className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">+91-1463-250601</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">info@rkmarble.com</span>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4 mt-6">
                  <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaFacebookF className="text-xl" />
                  </a>
                  <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaLinkedinIn className="text-xl" />
                  </a>
                  <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" aria-label="YouTube" className="text-gray-600 hover:text-red-500 transition-colors">
                    <FaYoutube className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-300 mt-12 pt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 text-sm">
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-0">
                <div className="flex items-center space-x-2 font-extrabold text-2xl cursor-pointer">
                  <span className="text-red-500 text-3xl">◆</span>
                  <span className="text-gray-800">MARVEL</span>
                </div>
                <span className="text-gray-600">
                  © {new Date().getFullYear()} Marvel. All rights reserved.
                </span>
              </div>

              <div className="flex space-x-6">
                <a href="/privacy-policy" className="hover:text-red-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms-conditions" className="hover:text-red-500 transition-colors">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg shadow-lg text-xl transition-all duration-300 z-50"
          >
            <FaArrowUp />
          </button>
        )}
      </footer>

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg text-2xl z-50 transition-all duration-300"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default Footer;