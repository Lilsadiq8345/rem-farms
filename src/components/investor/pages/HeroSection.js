import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);

  // Array of texts to rotate
  const rotatingTexts = [
    "Invest in Agriculture",
    "Grow Your Wealth",
    "Support Sustainable Farming",
    "Secure Your Future"
  ];

  // Rotate text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero bg-green-800 text-white flex flex-col items-center justify-center text-center p-10 min-h-screen">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
        Welcome to REM Farms
      </h1>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
        {rotatingTexts[currentText]}
      </h2>
      <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
        REM Farms is your gateway to profitable agricultural investments. Join us in supporting sustainable farming and making a real impact on food security and the environment.
      </p>
      <a
        href="#about"
        className="mt-4 px-8 py-4 bg-white text-green-800 font-semibold rounded-full hover:bg-green-100 transition duration-300"
      >
        Learn More
      </a>
    </section>
  );
};

export default HeroSection;
