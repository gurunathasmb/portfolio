// src/components/Projects.jsx
import React from 'react';

const projects = [
  {
    title: 'Speech-to-Text Conversion System',
    img: '/images/emotion.png',
    code: '#',
    lock: false,
  },
  {
    title: ' AI Fashion style',
    img: '/images/agro.png',
    code: '#',
    lock: false,
  },
  {
    title: 'GUDBLOOD',
    img: '/images/netflix.png',
    code: '#',
    lock: false,
  },
  {
    title: 'cow-breed-backend',
    img: '/images/liver.png',
    code: '#',
    lock: false,
  },
  {
    title: 'cow-breed-backend',
    img: '/images/liver.png',
    code: '#',
    lock: false,
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-xl shadow text-center">
            <img src={proj.img} alt={proj.title} className="rounded-lg mb-4 mx-auto h-40 object-cover" />
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">{proj.title}</h3>
            {proj.lock ? (
              <button className="bg-red-400 text-black px-4 py-1 rounded">Credential Needed</button>
            ) : (
              <a href={proj.code} className="inline-block bg-yellow-400 text-black px-4 py-1 rounded">Source Code</a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
