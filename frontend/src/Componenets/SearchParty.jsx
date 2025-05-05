import React from 'react';

const SearchParty = () => {
  return (
    <section className="p-6 bg-blue-100 rounded-md shadow-md max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Search Party Coordination</h2>
      <p className="text-gray-700 mb-4">Join search groups and download offline checklists to assist with finding missing persons more efficiently.</p>

      <div className="space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Join a Search Group
        </button>
        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
          Download Offline Checklist
        </button>
      </div>
    </section>
  );
};

export default SearchParty;
