import React from 'react';
import { motion } from 'framer-motion';

const certificates = [
  {
    id: 1,
    title: 'Google Cloud Career Launchpad',
    image: '/certificates/google.jpg',
  },
  {
    id: 2,
    title: 'Nvidia',
    image: '/certificates/nvidia.png',
  },
  {
    id: 3,
    title: 'Nokia Machine Learning Internship',
    image: '/certificates/Nokia.jpg',
  },
  {
    id: 4,
    title: 'Generative AI by Microsoft',
    image: '/certificates/GenAI.jpg',
  },
  {
    id: 5,
    title: 'Infosys AI Certification',
    image: '/certificates/AI.jpg',
  },
  {
    id: 6,
    title: 'Explore ML using Python',
    image: '/certificates/ML.jpg',
  },
  {
    id: 7,
    title: 'NPTEL Accounting Course',
    image: '/certificates/RL.jpg',
  },
  {
    id: 8,
    title: 'Nueva Internship Certificate',
    image: '/certificates/fullstack.png',
  },
 
];

const Certificate = () => {
  return (
    <section 
     id="certificate"
     className="py-10 px-4 md:px-10 bg-transparent text-white">
      <h2 className="text-4xl font-bold text-center text-[#3AFF00] mb-8">
        Certificates
      </h2>

      {/* Horizontal scroll on small screens */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory">
        <div className="flex gap-6 px-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="inline-block snap-center flex-shrink-0 w-[280px] transform transition duration-300 hover:scale-105"
            >
              <div className="overflow-hidden rounded-xl shadow-lg border border-[#3AFF00]/40">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-[180px] object-cover rounded-xl"
                />
              </div>
              <p className="text-[#3AFF00] text-center font-semibold mt-2">
                {cert.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid layout with fade-in animation on larger screens */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="flex flex-col items-center gap-3 transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden rounded-xl shadow-lg border border-[#3AFF00]/40">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-[300px] h-[200px] object-cover rounded-xl"
              />
            </div>
            <p className="text-[#3AFF00] text-center font-semibold text-sm md:text-base">
              {cert.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
