import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = ["Home", "About", "Projects", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 w-full z-50 bg-black text-white shadow-md">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">MyPortfolio</div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.05 }}
              className="transition-colors duration-300 hover:text-indigo-400 cursor-pointer"
            >
              {link}
            </motion.li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black px-6 pb-4"
        >
          {navLinks.map((link, i) => (
            <li
              key={i}
              className="py-2 border-b border-gray-700 text-lg hover:text-indigo-400 transition-colors duration-300 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </li>
          ))}
        </motion.ul>
      )}
    </header>
  );
};

export default Navbar;
