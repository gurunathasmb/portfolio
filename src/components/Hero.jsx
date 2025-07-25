// src/components/Hero.jsx
import React from 'react';
import profile from '../assests/g.jpg'; // Replace with your own image

export default function Hero() {
  return (
    <section id="hero" className="flex flex-col md:flex-row items-center justify-between min-h-screen py-20">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-green-600">Gurunathagouda M biradar</h1>
        <p className="text-lg mb-6 text-green-300">I'm a <strong>ML Developer</strong></p>
        <p className="mb-6 text-white">
Passionate and driven Machine Learning and Frontend Developer with a strong foundation in creating intelligent, user-friendly applications. Skilled in React, Python, SQL, and deploying real-world ML models. I focus on building seamless digital experiences backed by robust data-driven logic.
        </p>
        <div className="flex gap-4">
          <button className="bg-green-400 text-black font-semibold px-4 py-2 rounded hover:bg-green-500">Hire Me</button>
          <button className="bg-green-400 text-black font-semibold px-4 py-2 rounded hover:bg-green-500" >Download CV</button>
        </div>
        <div className="flex gap-4 mt-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-green-400 text-2xl"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-green-400 text-2xl"></i>
          </a>
        </div>
      </div>
      <img src={profile} alt="Profile" className="rounded-full w-64 h-64 mt-10 md:mt-0 shadow-xl" />
    </section>
  );
}
