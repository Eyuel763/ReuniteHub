import React from "react";
import HeroSection from "../Componenets/HeroSection"; // Adjust path as needed
import ReuniteSteps from "../Componenets/ReuniteSteps";
import Partnerships from "../Componenets/Partnerships"; // Adjust path as needed
import UrgentCases from "../Componenets/UrgentCases"; // Adjust path as needed

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ReuniteSteps />
      <Partnerships/>
      <UrgentCases />

      {/* Add other sections below */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        {/* Add your content here */}
      </section>
    </div>
  );
};

export default Home;