import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import Hero from '../assets/family reunion.jpg'; // Assuming you have a Hero image in the assets folder

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img
        src={Hero}
        alt="Family reunion"
        className="absolute w-full h-full object-cover"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          We help bring your loved ones home
        </h1>
        <p className="text-xl md:text-2xl mb-10">
          Report, search, and reunite - together
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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