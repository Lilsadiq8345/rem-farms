import React from 'react';

const Testimonials = ({ text, author }) => {
  return (
    <section  className="mt-12 bg-gray-800 p-4 text-center text-white" id="testimonials">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">What Our Investors Say</h3>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Testimonial text="This platform is fantastic! I've made significant returns from my investments." author="Investor A" />
        <Testimonial text="The transparency and services offered by REM Farms are top-notch." author="Investor B" />
        <Testimonial text="I highly recommend investing in REM Farms. The process is seamless and easy." author="Investor C" />
      </div>
    </section>
  );
};

// Testimonial Component
const Testimonial = ({ text, author }) => {
  return (
    <div className="bg-green-700 p-4 rounded-lg shadow-lg">
      <p className="italic">"{text}"</p>
      <p className="font-bold mt-2">- {author}</p>
    </div>
  );
};

export default Testimonials;