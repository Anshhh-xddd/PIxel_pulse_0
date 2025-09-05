import React from "react";
import { useNavigate } from "react-router-dom";

const PortfolioCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navigate first, then scroll to top once the route has changed
    navigate("/portfolio");
    // Ensure scroll resets (timeout lets React Router finish navigation first)
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h3 className="text-white text-2xl md:text-4xl font-bold">
          Want to see more of our work?
        </h3>
        <p className="text-gray-300 mt-3 md:mt-4 text-base md:text-lg">
          Explore the full portfolio with interactive horizontal scroll and animations.
        </p>

        <button
          onClick={handleRedirect}
          className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold hover:from-orange-400 hover:to-red-400 shadow-lg transition-all duration-300"
        >
          View Portfolio
        </button>
      </div>
    </section>
  );
};

export default PortfolioCTA;
