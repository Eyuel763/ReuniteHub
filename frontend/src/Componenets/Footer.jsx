import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from '../assets/Logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 w-full py-4">
            <div className="container mx-auto px-4 flex justify-between items-start">
                {/* Column 1: Logo */}
                <div className="flex flex-col items-start space-y-2">
                    <img 
                        src={Logo}
                        alt="Company Logo" 
                        className="h-8 w-auto" // Reduced logo size
                    />
                    <span className="text-white font-bold text-sm">ReuniteHub</span>
                    <p className="text-gray-400 text-xs">
                        Connecting people through technology. Our platform helps you find and reunite with loved ones.
                    </p>
                </div>

                {/* Column 2: Contact Us */}
                <div className="flex flex-col items-start space-y-2">
                    <h2 className="text-lg font-semibold text-white">Contact Us</h2>
                    <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">📍</span>
                            <span>Addis Ababa, Ethiopia</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">✉️</span>
                            <span>805#(free service)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">📞</span>
                            <span>(+251)911234567</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">✉️</span>
                            <span>help@reunitehub.et</span>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Quick Links */}
                <div className="flex flex-col items-start space-y-2">
                    <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="/services" className="hover:text-white transition">Services</a></li>
                        <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
                    </ul>
                </div>

                {/* Column 4: Follow Us */}
                <div className="flex flex-col items-start space-y-2">
                    <h2 className="text-lg font-semibold text-white">Follow Us</h2>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">
                            <FaFacebook size={20} />
                        </a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">
                            <FaTwitter size={20} />
                        </a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">
                            <FaInstagram size={20} />
                        </a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">
                            <FaLinkedin size={20} />
                        </a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;