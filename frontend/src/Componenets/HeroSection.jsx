import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import Hero from '../assets/pexels-rdne-6148876.jpg'; 

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-end justify-start bg-cover bg-center overflow-hidden pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Reduced opacity */}
      <img
        src={Hero}
        alt="Family reunion"
        className="absolute w-full h-full object-cover"
        style={{
          objectFit: "cover", // Ensures the image covers the container
          objectPosition: "center", // Centers the image
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-left px-8 max-w-4xl">
        <h1
          className="text-4xl md:text-6xl font-serif font-medium mb-6"
          style={{
            color: "black", // Black text color
            letterSpacing: "1.5px", // Adds spacing between letters
            lineHeight: "1.3", // Adjusts line height for elegance
          }}
        >
          We help bring your loved ones home
        </h1>
        <p
          className="text-lg md:text-xl font-serif mb-10"
          style={{
            color: "black", // Black text color
            letterSpacing: "1px", // Adds subtle spacing between letters
            lineHeight: "1.5", // Adjusts line height for readability
          }}
        >
          Report, search, and reunite - together
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/submitform" // Navigate to the submitform page
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-2 transition duration-300"
          >
            <FaUserPlus /> Report a missing person
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;