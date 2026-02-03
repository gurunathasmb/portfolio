// File: src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gradient-to-br">
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
        {/* LEFT CARD */}
        <motion.div
          className="md:w-1/2 bg-[#B2FFB2]/10 p-6 rounded-xl shadow-lg border border-[#3AFF00]"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-green-200 mb-4">
            I’m an Artificial Intelligence & Machine Learning engineer who enjoys
            building intelligent systems end-to-end — from data pipelines to
            deployable AI products.
          </p>

          <p className="text-green-200 mb-4">
            I’m currently a final-year Computer Science (AI & ML) student at
            Dayananda Sagar College of Engineering, with hands-on experience in
            designing, experimenting, and shipping AI systems.
          </p>

          <ul className="list-disc list-inside text-green-100 mb-4 space-y-1">
            <li>Retrieval-Augmented Generation (RAG) systems</li>
            <li>Single-agent & multi-agent workflows</li>
            <li>LangChain & LangGraph based pipelines</li>
            <li>Custom agent frameworks & MCP experiments</li>
            <li>Full-stack AI applications (MERN + Python)</li>
          </ul>

          <p className="text-green-200">
            I actively think about system trade-offs — cost, latency, accuracy,
            and scalability — and enjoy experimenting with creative or
            unconventional AI ideas before moving them to production.
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-[#3AFF00] mb-2">
            Skills & Tools
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Python",
              "JavaScript",
              "RAG Systems",
              "LLM Agents",
              "LangChain",
              "LangGraph",
              "Multi-Agent Systems",
              "Prompt Engineering",
              "CNN",
              "LSTM",
              "GRU",
              "Deep Learning",
              "MLOps",
              "Docker",
              "FastAPI",
              "Flask",
              "Streamlit",
              "MERN Stack",
              "Google Cloud",
              "Git",
              "GitHub",
              "Vercel",
              "Netlify"
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
