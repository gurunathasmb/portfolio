import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificate", href: "#certificate" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
        shadow ? "shadow-md bg-black/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
        <div className="text-2xl font-bold text-[#3AFF00]">MyPortfolio</div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="transition-colors duration-300 hover:text-[#3AFF00] cursor-pointer"
            >
              <a href={link.href}>{link.name}</a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile hamburger icon */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-black px-6 pb-4 pt-2"
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              whileTap={{ scale: 0.95 }}
              className="py-2 border-b border-gray-700 text-lg text-white hover:text-[#3AFF00] transition-colors duration-300 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <a href={link.href}>{link.name}</a>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </header>
  );
};

export default Navbar;
