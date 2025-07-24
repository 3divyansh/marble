import { useState } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCompanyMobile, setShowCompanyMobile] = useState(false);
  const [showMarbleMobile, setShowMarbleMobile] = useState(false);
  const [showGraniteMobile, setShowGraniteMobile] = useState(false);

  const navLinks = ["HOME", "THE COMPANY", "MARBLE COLLECTION", "EXOTIC GRANITE COLLECTION", "CONTACT"];
  
  const companySubLinks = [
    "About Us",
    "Our Story", 
    "Vision & Mission"
  ];
  
  const marbleSubLinks = [
    "Premium Marble",
    "Classic Marble",
    "Designer Marble"
  ];

  const graniteSubLinks = [
    "Exotic Granite",
    "Premium Granite",
    "Custom Granite"
  ];

  const getLinkPath = (link) =>
    `/${link === "Home" ? "" : link.toLowerCase().replace(/\s+/g, "-")}`;

  const getSubLinkPath = (type) =>
    `/${type.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <nav className="w-full bg-gray-900 shadow px-6 py-4 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-extrabold text-2xl cursor-pointer">
          <span className="text-red-500 text-3xl">◆</span>
          <span className="text-white">MARVEL</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-base font-medium mr-12">
          {navLinks.map((link) => (
            <li key={link} className="relative group">
              {link === "THE COMPANY" || link === "MARBLE COLLECTION" || link === "EXOTIC GRANITE COLLECTION" ? (
                <>
                  <div className="pb-1 cursor-pointer flex items-center hover:text-gray-300 text-white">
                    <span className={`flex items-center ${link === "HOME" ? "text-red-500" : ""}`}>
                      {link}
                      <HiOutlineChevronDown className="ml-1 text-sm transition-transform duration-200 group-hover:rotate-180" />
                    </span>
                  </div>

                  <ul className="absolute top-full left-0 bg-gray-800 shadow-lg rounded w-56 py-2 hidden group-hover:block z-50 transition-all duration-300">
                    {(link === "THE COMPANY" ? companySubLinks : 
                      link === "MARBLE COLLECTION" ? marbleSubLinks : graniteSubLinks).map((sub) => (
                      <li key={sub}>
                        <a
                          href={getSubLinkPath(sub)}
                          className="block px-4 py-2 text-sm text-gray-300 font-medium hover:bg-gray-700 hover:text-red-500"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={getLinkPath(link)}
                  className={`pb-1 hover:text-red-500 transition-colors duration-200 ${
                    link === "HOME" ? "text-red-500" : "text-white"
                  }`}
                >
                  {link}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md px-6 py-4 z-40">
          {navLinks.map((link) => (
            <div key={link} className="py-2 border-b border-gray-600">
              {link === "THE COMPANY" || link === "MARBLE COLLECTION" || link === "EXOTIC GRANITE COLLECTION" ? (
                <>
                  <button
                    onClick={() =>
                      link === "THE COMPANY"
                        ? setShowCompanyMobile(!showCompanyMobile)
                        : link === "MARBLE COLLECTION" 
                        ? setShowMarbleMobile(!showMarbleMobile)
                        : setShowGraniteMobile(!showGraniteMobile)
                    }
                    className="w-full flex justify-between items-center font-medium text-white"
                  >
                    <span>{link}</span>
                    <HiOutlineChevronDown
                      className={`transform transition-transform duration-200 ${
                        (link === "THE COMPANY" ? showCompanyMobile : 
                         link === "MARBLE COLLECTION" ? showMarbleMobile : showGraniteMobile)
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>
                  
                  {(link === "THE COMPANY" ? showCompanyMobile : 
                    link === "MARBLE COLLECTION" ? showMarbleMobile : showGraniteMobile) && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {(link === "THE COMPANY" ? companySubLinks : 
                        link === "MARBLE COLLECTION" ? marbleSubLinks : graniteSubLinks).map((sub) => (
                        <li key={sub}>
                          <a
                            href={getSubLinkPath(sub)}
                            className="block text-sm text-gray-300 hover:text-red-500 py-1"
                          >
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={getLinkPath(link)}
                  className={`block py-2 hover:text-red-500 transition-colors duration-200 ${
                    link === "HOME" ? "text-red-500" : "text-white"
                  }`}
                >
                  {link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;