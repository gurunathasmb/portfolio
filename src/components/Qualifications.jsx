// src/components/Qualifications.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Qualifications() {
  const timeline = [
    {
      title: "Artificial Intelligence & Machine Learning Engineering",
      institution: "Dayananda Sagar College of Engineering",
      date: "Expected July 2026",
      gpa: "Cumulative GPA: 8.67 / 10",
    },
    {
      title: "Pre-University Education",
      institution: "patil's Oxford PU Science college",
      date: "Completed April 2022",
      gpa: "Percentage: 89.85%",
    },
    {
      title: "High School",
      institution: "GOVT High School Rajanakolur",
      date: "Completed March 2020",
      gpa: "Percentage: 78.4%",
    },
  ];

  return (
    <section
      id="qualifications"
      className="min-h-screen py-20 bg-gradient-to-br from- to- px-4"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-[#3AFF00]">
        Qualifications
      </h2>

      <div className="relative max-w-3xl mx-auto pl-6 border-l-4 border-[#3AFF00]">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="mb-10 ml-6 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 bg-[#3AFF00] rounded-full -left-[22px] top-1.5 border-2 border-white"></div>

            <div className="bg-[#B2FFB2]/10 border border-[#3AFF00] p-5 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#3AFF00]">
                {item.title}
              </h3>
              <p className="text-green-200">
                {item.institution} | {item.date}
              </p>
              <p className="text-green-100 mt-1">{item.gpa}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
