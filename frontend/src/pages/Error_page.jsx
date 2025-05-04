import React from 'react';
import { Link } from 'react-router-dom';
import gifBackground from '../assets/dribbble_1.gif';

const ErrorPage = () => {
    return (
        <div
            className="bg-center h-screen flex flex-col relative"
            style={{
                backgroundImage: `url(${gifBackground})`,
                backgroundSize: '50%', // Default size for larger screens
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            {/* Responsive background size for small screens */}
            <style>
                {`
                @media (max-width: 768px) {
                    div[style] {
                        background-size: 100% !important; /* Set background size to 100% for small screens */
                    }
                }
                `}
            </style>

            {/* Link at the bottom center */}
            <span className="text-center text-6xl">
                <h1 className="text-4xl text-black font-bold text-center mt-20">404</h1>
                <p className="text-2xl text-black font-semibold text-center mt-4">Page Not Found</p>
            </span>
            <Link
                to="/"
                className="absolute bottom-11 left-1/2 transform -translate-x-1/2 lm:text-2xl text-blue-50 sm:text-xl bg-gray-700 font-bold hover:bg-gray-500 transition duration-300 hover:cursor-pointer rounded-lg px-4 py-2"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;