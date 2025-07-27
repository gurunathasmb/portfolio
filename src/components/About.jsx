// File: src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gradient-to-br ">
      <motion.h2
        className="text-3xl font-bold mb-6 text-[#3AFF00] text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="md:flex justify-between items-start gap-10">
        <motion.div
          className="md:w-1/2 bg-[#B2FFB2]/10 p-6 rounded-xl shadow-lg border border-[#3AFF00]"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-green-200 mb-4">
            I'm an Artificial Intelligence and Machine Learning student & developer. 
            I'm a final-year Computer Science student at Dayananda Sagar College of Engineering. I specialize in:
          </p>
          <ul className="list-disc list-inside text-green-100 mb-4">
            <li>Full Stack Development (MERN)</li>
            <li>Machine Learning Developer</li>
            <li>Deep Learning</li>
          </ul>
          <p className="text-green-200">
            Passionate about designing digital experiences and uncovering insights from data.
          </p>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-[#3AFF00] mb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "HTML", "CSS", "JavaScript", "MERN", "CNN", "LSTM", "GRU", "MLOPS", "Docker",
              "Google Cloud", "Streamlit", "Flask", "FastAPI", "Python", "ML", "Google Colab",
              "GIT", "Github", "Vercel", "Netlify"
            ].map((skill) => (
              <motion.span
                key={skill}
                className="bg-gradient-to-br from-green-500 to-green-300 text-black px-3 py-1 rounded shadow"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
