import React from 'react';
import { Link } from 'react-router-dom';
import gifBackground from '../assets/dribbble_1.gif';

const ErrorPage = () => {
  return (
    <div
      className="bg-center h-screen flex flex-col relative bg-no-repeat bg-cover sm:bg-contain"
      style={{
        backgroundImage: `url(${gifBackground})`,
      }}>
        
      <span className="text-center font-serif text-6xl">
        <h1 className="text-4xl sm:text-6xl text-black font-bold text-center mt-20">404</h1>
        <p className="text-2xl sm:text-xl text-black font-semibold text-center mt-4">Page Not Found</p>
      </span>

      <Link
          to="/"
          aria-label="Go back to the homepage"
          className="absolute bottom-11 left-1/2 transform -translate-x-1/2 text-black-50 sm:text-xl bg-red-400 font-bold hover:bg-blue-400 transition duration-300 hover:cursor-pointer hover:scale-110 rounded-lg px-4 py-2 animate-bounce">
          Return to Home
      </Link>
    </div>
  );
};

export default ErrorPage;