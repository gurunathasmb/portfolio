import React from 'react';
import profile from '../assests/g.jpg'; // Replace with your own image

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col md:flex-row items-center justify-between min-h-screen py-20 bg-gradient-to-br from to"
    >
      <div className="max-w-2xl">
        <h1
          className="text-5xl font-bold mb-4"
          style={{
            color: '#3AFF00',
            // textShadow: '0 0 3px #3AFF00, 0 0 5px #44982b',
          }}
        >
          Gurunathagouda M Biradar
        </h1>

        <p className="text-lg mb-6 text-[#3AFF00]/100">
          I'm a <strong className="text-[#3AFF00]/2000">ML Developer</strong>
        </p>
        <p className="mb-6 text-lime-100">
          Passionate and driven Machine Learning and Frontend Developer with a strong foundation in creating intelligent,
          user-friendly applications. Skilled in React, Python, SQL, and deploying real-world ML models. I focus on
          building seamless digital experiences backed by robust data-driven logic.
        </p>

        <div className="flex gap-4">
          <button className="bg-lime-400/70 text-black font-semibold px-4 py-2 rounded transition duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-400 hover:to-red-400">
            Hire Me
          </button>
          <button className="bg-lime-400/70 text-black font-semibold px-4 py-2 rounded transition duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-400 hover:to-red-400">
            Download CV
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-lime-300 text-2xl hover:text-white transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-lime-300 text-2xl hover:text-white transition" />
          </a>
        </div>
      </div>

      <img
        src={profile}
        alt="Profile"
        className="rounded-full w-64 h-64 mt-10 md:mt-0 shadow-2xl border-4 border-[#3AFF00]"
      />
    </section>
  );
}
