// src/components/Projects.jsx
import React from 'react';

const projects = [
  {
    title: 'Speech-to-Text Conversion System',
    img: 'speech1.png',
    code: '#',
    lock: false,
  },
  {
    title: 'AI Fashion Style',
    img: 'ai-fashion.png',
    code: '#',
    lock: false,
  },
  {
    title: 'GUDBLOOD',
    img: 'gud.png',
    code: '#',
    lock: false,
  },
  {
    title: 'Cow Breed Backend',
    img: 'cow.png',
    code: '#',
    lock: false,
  },
  {
    title: 'Binary Sentiment Analysis',
    img: 'binary.png',
    code: '#',
    lock: false,
  },
  {
    title: 'Project Management System',
    img: 'cow.png',
    code: '#',
    lock: true,
  },

  {
    title: 'Lip Sync AI Avatar',
    img: 'lip.png',
    code: '#',
    lock: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 bg-gradient-to-br from- to-">
      <h2
        className="text-3xl font-bold text-center mb-10 text-[#3AFF00]"
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="bg-[#B2FFB2]/10 border border-[#3AFF00] p-4 rounded-xl shadow-lg text-center hover:scale-105 transform transition duration-300"
          >
            <img
              src={proj.img}
              alt={proj.title}
              className="rounded-lg mb-4 mx-auto h-40 object-cover"
            />
            <h3
              className="text-xl font-semibold text-[#3AFF00] mb-2"
              
            >
              {proj.title}
            </h3>
            {proj.lock ? (
              <button className="bg-red-500 text-white px-4 py-1 rounded shadow">
                Credential Needed
              </button>
            ) : (
              <a
                href={proj.code}
                className="inline-block bg-[#3AFF00] text-black px-4 py-1 rounded shadow hover:bg-[#2DDC00] transition"
              >
                Source Code
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
