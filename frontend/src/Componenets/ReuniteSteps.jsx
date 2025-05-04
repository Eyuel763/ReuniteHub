import React from "react";
import { FaUserPlus, FaHandsHelping } from "react-icons/fa"; // Removed FaSearch
import { Link } from "react-router-dom"; // Added Link for navigation

const ReuniteSteps = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Two Simple Steps to Reunite Families
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Together, we can bring missing loved ones home through community action.
        </p>

        {/* 2 Steps (Numbered List) */}
        <ol className="grid md:grid-cols-2 gap-8 mb-16">
          <li className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Report</h3>
            <p className="text-gray-600">Submit details about a missing person</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Reunite</h3>
            <p className="text-gray-600">Verified matches trigger family notifications</p>
          </li>
        </ol>

        {/* 2 Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Report Card */}
          <div className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaUserPlus className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Report</h3>
            <p className="text-gray-600 mb-4">File a missing person case with details</p>
            <Link
              to="/submitform"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Submit Report
            </Link>
          </div>

          {/* Reunite Card */}
          <div className="bg-purple-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaHandsHelping className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Reunite</h3>
            <p className="text-gray-600 mb-4">Join volunteers or donate resources</p>
            <Link
              to="/volunteer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReuniteSteps;