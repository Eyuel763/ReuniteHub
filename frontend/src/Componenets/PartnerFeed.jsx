import React from 'react';

const PartnerFeed = () => {
  return (
    <section className="p-6 bg-green-100 rounded-md shadow-md max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Partner Integration</h2>
      <p className="text-gray-700 mb-4">Stay updated with live feeds from our partner NGOs and explore success stories.</p>

      <div className="space-y-4">
        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
          View Live Feed
        </button>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Explore Success Stories
        </button>
      </div>
    </section>
  );
};

export default PartnerFeed;
