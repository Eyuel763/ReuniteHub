import React from "react";
import HeroSection from "../Componenets/HeroSection"; // Adjust path as needed
import ReuniteSteps from "../Componenets/ReuniteSteps";
import Partnerships from "../Componenets/Partnerships"; // Adjust path as needed
import UrgentCases from "../Componenets/UrgentCases"; // Adjust path as needed
import SuccessStories from "../Componenets/SuccessStories";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ReuniteSteps />
      <Partnerships />
      
      {/* Add id for navigation */}
      <div id="urgent-cases">
        <UrgentCases />
      </div>
      
      {/* Add id for navigation */}
      <div id="success-stories">
        <SuccessStories />
      </div>
    </div>
  );
};

export default Home;