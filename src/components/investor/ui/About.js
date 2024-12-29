import React from 'react';
import { motion } from 'framer-motion';
import '../../../App.css';

const About = () => {
  return (
    <>

      {/* About Section */}
      <section
        id="about"
        className="mt-0 py-12 px-6 max-w-7xl mx-auto text-center bg-white rounded-lg shadow-lg lg:flex lg:items-center lg:gap-10">
        <motion.div
          className="container mx-auto text-center px-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-6">
            REM Farms is a leading platform in agricultural innovation. By providing tools for investors to contribute to farming projects, we ensure a seamless connection between agriculture and technology.
          </p>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            With our platform, farmers gain access to much-needed resources, and investors receive returns on their investments while supporting sustainable agriculture.
          </p>
        </motion.div>
      </section>
      {/* Our Vision Section */}
      <section className="py-16 bg-gray-50 text-green-600">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center px-6">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-green-800">Our Mission</h2>
            <p className="mb-6 text-black">Promoting environmentally-friendly farming methods for long-term ecological balance.</p>
            <ul className="space-y-4 text-black">
              {[
                { title: 'Expert Investment Team', description: 'Our team ensures your investments are in capable hands.' },
                { title: 'Disciplined Investment Philosophy', description: 'We adhere to sustainable and profitable ventures.' },
                { title: 'Proprietary Sourcing Technology', description: 'Utilizing advanced technology for exclusive opportunities.' },
                { title: 'Crop Rotation and Diversity', description: 'We implement practices to boost crop yields sustainably.' },
              ].map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className=" text-black p-2 rounded-full mr-4">✔</span>
                  <div>
                    <h4 className="font-semibold">{point.title}</h4>
                    <p className="text-sm">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column with Image */}
          <div className="flex justify-center">
            <motion.img
              src="/hero4.jpeg"
              alt="Agriculture"
              className="rounded-md shadow-lg w-80 h-80 object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;