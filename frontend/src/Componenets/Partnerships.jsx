import React from 'react';
import { FaHandshake } from 'react-icons/fa';

// Import your logos
import Logo1 from '../assets/logo1.jpg';
import Logo2 from '../assets/download (3).jpg';
import Logo3 from '../assets/download (4).jpg';
import Logo4 from '../assets/download (5).jpg';
import Logo5 from '../assets/download.png';

const Partners = () => {
  const partners = [
    { id: 1, logo: Logo1, name: "Partner 1", url: "#" },
    { id: 2, logo: Logo2, name: "Partner 2", url: "#" },
    { id: 3, logo: Logo3, name: "Partner 3", url: "#" },
    { id: 4, logo: Logo4, name: "Partner 4", url: "#" },
    { id: 5, logo: Logo5, name: "Partner 5", url: "#" }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Centered Header */}
        <div className="text-center mb-8"> {/* Reduced margin-bottom */}
          <div className="inline-flex items-center justify-center gap-2 mb-3 text-blue-600">
            <FaHandshake className="text-2xl" />
            <span className="font-semibold">OUR PARTNERS</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Trusted Collaborations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with leading organizations to amplify our search efforts
          </p>
        </div>

        {/* Closer Logo Distribution */}
        <div className="flex justify-center gap-8 md:gap-12"> {/* Adjusted gap */}
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-16 w-auto" // Uniform height
                style={{ maxWidth: '120px' }} // Control logo width
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;