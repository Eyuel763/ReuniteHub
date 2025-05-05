import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/Logo.png"; // Update this path

const Header = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Homepage navigation items with links to sections
  const homeNavItems = [
    { label: "Urgent Cases", link: "#urgent-cases", colorClass: "text-red-500 hover:text-red-600" },
    { label: "Success Stories", link: "#success-stories", colorClass: "text-purple-500 hover:text-purple-600" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Always visible */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Regular nav items */}
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link to="/alertsmaps" className="text-gray-600 hover:text-blue-500 transition-colors">
            Alerts & Map
          </Link>
          <Link to="/Volunteer" className="text-gray-600 hover:text-blue-500 transition-colors">
            Volunteer
          </Link>
          <Link to="/Resources" className="text-gray-600 hover:text-blue-500 transition-colors">
            Resources
          </Link>

          {/* Homepage-only navigation items */}
          {isHome && (
            <div className="flex space-x-6 ml-4">
              {homeNavItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link} // Use hash navigation to scroll to sections
                  className={`${item.colorClass} transition-colors cursor-pointer`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Desktop Buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-3 ml-6">
          <Link
            to="/submitform"
            className="px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm"
          >
            Report
          </Link>
          <Link
            to="/login"
            className="px-3 py-1.5 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Login
          </Link>
        </div>

        {/* Mobile Hamburger Button (visible only on mobile) */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-blue-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (slides in from right) */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex flex-col space-y-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors py-2">
            Home
          </Link>
          <Link to="/alertsmap" className="text-gray-600 hover:text-blue-500 transition-colors py-2">
            Alerts & Map
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors py-2">
            Contact
          </Link>
          <Link to="/Volunteer" className="text-gray-600 hover:text-blue-500 transition-colors py-2">
            Volunteer
          </Link>
          <Link to="/Resources" className="text-gray-600 hover:text-blue-500 transition-colors py-2">
            Resources
          </Link>

          {/* Show homepage nav items in mobile menu if on homepage */}
          {isHome && (
            <div className="flex flex-col space-y-3 pt-2">
              {homeNavItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link} // Use hash navigation to scroll to sections
                  className={`${item.colorClass} py-2 transition-colors`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
            <Link
              to="/submitform"
              className="w-full px-3 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm"
            >
              Report
            </Link>
            <Link
              to="/login"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;