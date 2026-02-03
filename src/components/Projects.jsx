import React, { useState } from "react";

const projects = [
  {
    title: "",
    img: "1.png",
    code: "https://github.com/gurunathasmb/NLPhackthon",
    lock: false,
    description:
      "A real-time speech recognition system using NLP and audio signal processing to transcribe spoken words into text with high accuracy. Built with Python and integrated using Web APIs.",
  },

  {
    title: "AI Fashion Style",
    img: "2.png",
    code: "https://github.com/gurunathasmb/CNN-Model-",
    lock: false,
    description:
      "A convolutional neural network (CNN)-based model trained on labeled fashion datasets to predict clothing styles and trends.",
  },

  {
    title: "GUDBLOOD",
    img: "3.png",
    code: "https://github.com/gurunathasmb/GUDBLOOD",
    lock: false,
    description:
      "A full-stack platform for connecting blood donors and recipients in emergency situations using React, Node.js, and MongoDB.",
  },

  {
    title: "Cow Breed Backend",
    img: "4.png",
    code: "https://github.com/gurunathasmb/cow-breed-backend",
    lock: false,
    description:
      "A backend API for cow breed detection using OpenCV and image processing techniques.",
  },

  {
    title: "Binary Sentiment Analysis",
    img: "5.png",
    code: "https://github.com/gurunathasmb/electronix_ai",
    lock: false,
    description:
      "Performs binary sentiment classification using Logistic Regression and Naive Bayes.",
  },

  {
    title: "Project Management System",
    img: "6.png",
    code: "https://github.com/gurunathasmb/project_managment",
    lock: true,
    description:
      "A MERN-based platform for managing student-teacher projects with role-based access.",
  },

  {
    title: "AI Avatar",
    img: "7.png",
    code: "https://github.com/gurunathasmb/lipscyn",
    lock: true,
    description:
      "Creates AI-generated avatars that speak from a still image using Wav2Lip and GANs.",
  },

  {
    title: "Brain Tumor Segmentation & Classification",
    img: "8.png",
    code: "https://github.com/gurunathasmb/brain-tumor-ai",
    lock: true,
    description:
      "A medical AI system that performs 3D brain tumor segmentation using Attention U-Net and multi-class classification using ResNet + Transformer.",
  },

  {
    title: "Synthesis Multi-Agent LLM System",
    img: "9.png",
    code: "https://github.com/gurunathasmb/synthetic-agent",
    lock: true,
    description:
      "A multi-agent LLM framework built with LangChain/LangGraph that coordinates research, reasoning, and coding agents with RAG, memory, and tool-calling.",
  },
];

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section id="projects" className="py-16 bg-gradient-to-br">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#3AFF00]">
        Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {projects.map((proj, idx) => (
          <div key={idx} className="perspective">
            <div
              className={`relative w-full h-80 transition-transform duration-500 transform-style-preserve-3d ${
                flippedIndex === idx ? "rotate-y-180" : ""
              }`}
            >
              {/* ===== FRONT SIDE (IMAGE OVERLAY) ===== */}
              <div className="absolute w-full h-full backface-hidden border border-[#3AFF00] rounded-xl shadow-lg overflow-hidden">

                {/* Full background image */}
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/"></div>

                {/* Text + buttons on top of image */}
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-6 text-center px-4">

                  <h3 className="text-xl font-bold text-[#3AFF00] mb-2 drop-shadow-lg">
                   
                  </h3>

                  {proj.lock ? (
                    <button className="bg-red-600/80 text-white font-semibold px-3 py-1 rounded-xl mb-2">
                      Credential Needed
                    </button>
                  ) : (
                    <a
                      href={proj.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3AFF00]/80 text-black font-semibold px-3 py-1 rounded-xl mb-2"
                    >
                      Source Code
                    </a>
                  )}

                  <button
                    onClick={() => toggleFlip(idx)}
                    className="text-sm text-[#3AFF00] underline drop-shadow-lg"
                  >
                    Show Description
                  </button>
                </div>
              </div>

              {/* ===== BACK SIDE ===== */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#3AFF00]/10 border border-[#3AFF00] p-4 rounded-xl shadow-lg text-center flex flex-col justify-center items-center">
                <p className="text-green-100 px-4">
                  {proj.description}
                </p>

                <button
                  onClick={() => toggleFlip(idx)}
                  className="mt-4 text-sm text-[#3AFF00] underline"
                >
                  Back to Project
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
