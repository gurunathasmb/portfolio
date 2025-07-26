import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="flex items-center justify-center  "
    >
      <div className="text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "#3AFF00" }}
        >
          Get in Touch
        </motion.h2>

        <motion.div
          className="flex justify-center gap-10 text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:scale-110 transition" style={{ color: "#3AFF00" }} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:scale-110 transition" style={{ color: "#3AFF00" }} />
          </a>
          <a href="tel:+919999999999">
            <FaPhoneAlt className="hover:scale-110 transition" style={{ color: "#3AFF00" }} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:scale-110 transition" style={{ color: "#3AFF00" }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
