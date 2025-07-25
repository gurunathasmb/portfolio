// src/components/Qualifications.jsx
import React from 'react';

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-16 bg-gradient-to-br from- to-">
      <h2
        className="text-3xl font-bold mb-6 text-center text-[#3AFF00]"
        
      >
        Qualifications
      </h2>

      <div className="bg-[#B2FFB2]/10 border border-[#3AFF00] p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-[#3AFF00]" >
          Artificial Intelligence & Machine Learning Engineering
        </h3>
        <p className="text-green-200">
          Dayananda Sagar College of Engineering | Expected July 2026
        </p>
        <p className="text-green-100 mt-2">Cumulative GPA: 8.67 / 10</p>
      </div>
    </section>
  );
}
