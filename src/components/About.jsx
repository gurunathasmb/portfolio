// src/components/About.jsx
import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">About Me</h2>
      <div className="md:flex justify-between items-start gap-10">
        <div className="md:w-1/2 bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-white mb-4">
           I'm a Artificial intelligence and machine learning student & Developer. 
           I'm a final-year Computer Science student at Dayananda Sagara college of Engineering. I specialize in:
          </p>
          <ul className="list-disc list-inside text-yellow-300 mb-4">
            <li>Full stack devlopment(MERN)</li>
            <li>Machine learning Developer</li>
            <li>Deep learninng </li>
          </ul>
          <p className="text-white">
            Passionate about designing digital experiences and uncovering insights from data.
          </p>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <h3 className="text-xl font-semibold text-yellow-400">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">HTML</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">CSS</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">JavaScript</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">MERN</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">CNN</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">LSTM</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">GRU</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">MLOPS</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Docker</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Google Cloud</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Streamlit</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Flask</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">FasTAPI</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Python</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">ML</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Google Cloab</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">GIT</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Github</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Vercel</span>
            <span className="bg-yellow-400 text-black px-3 py-1 rounded">Netlify</span>

          </div>
        </div>
      </div>
    </section>
  );
}
