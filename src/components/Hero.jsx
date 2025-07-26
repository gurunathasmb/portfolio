import React from 'react';
import profile from '../assests/g.jpg'; // Replace with your actual image path

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen py-20 bg-gradient-to-br px-6 md:px-20"
    >
      {/* Text Section */}
      <div className="max-w-2xl text-center md:text-left mt-10 md:mt-0">
        <h1 className="text-5xl font-bold mb-4 text-[#3AFF00]">
          Gurunathagouda M Biradar
        </h1>
        <p className="text-lg mb-6 text-[#A4FF9B]">
          I'm a <strong className="text-[#3AFF00]">Machine Learning Developer</strong>
        </p>
        <p className="mb-6 text-lime-100">
          Passionate and driven ML and Frontend Developer with a strong foundation in creating intelligent, user-friendly apps. Skilled in React, Python, SQL, and deploying real-world ML models.
        </p>

        {/* Buttons */}
        <div className="flex justify-center md:justify-start gap-4">
          {/* Hire Me - Email Link */}
          <a
            href="mailto:gurunathagoudambiradar@gmail.com"
            className="bg-[#3AFF00]/80 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-400 hover:to-red-400"
          >
            Hire Me
          </a>

          {/* Download CV - File from public folder */}
          <a
            href="/resume.pdf"
            download
            className="bg-[#3AFF00]/80 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-400 hover:to-red-400"
          >
            Download CV
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-lime-300 text-2xl hover:text-white transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-lime-300 text-2xl hover:text-white transition" />
          </a>
        </div>
      </div>

      {/* Image with Glowing Animation */}
      <div className="relative mt-10 md:mt-0 flex justify-center items-center w-72 h-72">
        {/* Profile Image with Pulsing Glow */}
        <div className="relative mt-10 md:mt-0">
          <div className="w-64 h-64 rounded-full overflow-hidden relative border-4 border-[#3AFF00] shadow-[0_0_25px_#3AFF00] animate-pulse">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full animate-spin-slow border-4 border-dashed border-[#3AFF00]/30" />
        </div>
      </div>
    </section>
  );
}
