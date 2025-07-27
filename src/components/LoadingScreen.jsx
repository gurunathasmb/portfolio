// src/components/LoadingScreen.jsx
import React from "react";
import { motion } from "framer-motion";

const letterAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 120 }
  }),
};

const LoadingScreen = () => {
  const welcomeText = "Welcome";

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-1 text-[#3AFF00] text-5xl font-extrabold"
      >
        {welcomeText.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
