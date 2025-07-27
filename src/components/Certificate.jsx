import React from 'react';

const certificates = [
  {
    id: 1,
    title: 'Google Cloud Career Launchpad',
    image: '/certificates/google.jpg',
  },
  {
    id: 2,
    title: 'Nueva Internship Certificate',
    image: '/certificates/fullstack.png',
  },
  {
    id: 3,
    title: 'Generative AI by Microsoft',
    image: '/certificates/GenAI.jpg',
  },
  {
    id: 4,
    title: 'Infosys AI Certification',
    image: '/certificates/AI.jpg',
  },
  {
    id: 5,
    title: 'Explore ML using Python',
    image: '/certificates/ML.jpg',
  },
  {
    id: 6,
    title: 'NPTEL Accounting Course',
    image: '/certificates/RL.jpg',
  },
];

const Certificate = () => {
  return (
    <section className="py-10 px-4 md:px-10 bg-transparent text-white">
      <h2 className="text-4xl font-bold text-center text-[#3AFF00] mb-8">
        Certificates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col items-center gap-3 transform transition duration-300 hover:scale-105"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificate;
