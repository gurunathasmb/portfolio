import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Speech-to-Text Conversion System',
    img: 'speech1.png',
    code: 'https://github.com/gurunathasmb/NLPhackthon',
    lock: false,
    description:
      'A real-time speech recognition system using Natural Language Processing (NLP) and audio signal processing to transcribe spoken words into text with high accuracy. Built with Python and integrated using Web APIs.',
  },
  {
    title: 'AI Fashion Style',
    img: 'ai-fashion.png',
    code: 'https://github.com/gurunathasmb/CNN-Model-',
    lock: false,
    description:
      'A convolutional neural network (CNN)-based model trained on labeled fashion datasets to predict clothing styles and trends. Focused on computer vision, deep learning, and fashion analytics.',
  },
  {
    title: 'GUDBLOOD',
    img: 'gud.png',
    code: 'https://github.com/gurunathasmb/GUDBLOOD',
    lock: false,
    description:
      'A full-stack platform for connecting blood donors and recipients in emergency situations. Includes user authentication, donor filtering, and request status tracking with React, Node.js, and MongoDB.',
  },
  {
    title: 'Cow Breed Backend',
    img: 'cow.png',
    code: 'https://github.com/gurunathasmb/cow-breed-backend',
    lock: false,
    description:
      'A backend API service for cow breed detection using OpenCV and image processing techniques. Supports breed classification from uploaded images and returns results via RESTful endpoints.',
  },
  {
    title: 'Binary Sentiment Analysis',
    img: 'binary.png',
    code: 'https://github.com/gurunathasmb/electronix_ai',
    lock: false,
    description:
      'Performs binary sentiment classification (positive/negative) on text reviews using machine learning models such as Logistic Regression and Naive Bayes. Includes data preprocessing and model evaluation.',
  },
  {
    title: 'Project Management System',
    img: 'project.png',
    code: 'https://github.com/gurunathasmb/project_managment',
    lock: true,
    description:
      'A centralized web application for managing student-teacher projects, including documentation upload, team coordination, fund requests, and project tracking. Built with MERN stack and role-based access control.',
  },
  {
    title: 'AI Avatar',
    img: 'lip.png',
    code: 'https://github.com/gurunathasmb/lipscyn',
    lock: true,
    description:
      'Creates AI-generated avatars that speak from a still image and text/audio input. Uses Wav2Lip and GANs to produce realistic lip-sync animations for human-like communication and video generation.',
  },
];

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section id="projects" className="py-16 bg-transparent text-white px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#3AFF00]">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            className="perspective"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div
              className={`relative w-full h-80 transition-transform duration-500 transform-style preserve-3d ${
                flippedIndex === idx ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden bg-[#B2FFB2]/10 border border-[#3AFF00] p-4 rounded-xl shadow-lg text-center flex flex-col justify-center items-center">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="rounded-lg mb-4 mx-auto h-40 object-cover"
                />
                <h3 className="text-xl font-semibold text-[#3AFF00] mb-2">{proj.title}</h3>
                {proj.lock ? (
                  <button className="bg-red-600/80 text-white font-semibold px-2 py-1 rounded-xl transition duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:via-orange-500 hover:to-yellow-400">
                    Credential Needed
                  </button>
                ) : (
                  <a
                    href={proj.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#3AFF00]/80 text-black font-semibold px-2 py-1 rounded-xl transition duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:via-yellow-400 hover:to-red-400"
                  >
                    Source Code
                  </a>
                )}
                <button
                  onClick={() => toggleFlip(idx)}
                  className="mt-2 text-sm text-[#3AFF00] underline"
                >
                  Show Description
                </button>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#3AFF00]/10 border border-[#3AFF00] p-4 rounded-xl shadow-lg text-center flex flex-col justify-center items-center">
                <p className="text-green-100 px-4">{proj.description}</p>
                <button
                  onClick={() => toggleFlip(idx)}
                  className="mt-4 text-sm text-[#3AFF00] underline"
                >
                  Back to Project
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
