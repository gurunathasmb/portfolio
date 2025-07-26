// File: src/App.jsx
import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Qualifications from "./components/Qualifications";
import Navbar from "./components/Navbar";
import ThreeBG from "./components/ThreeBG";
import "./index.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen text-white bg-gray-900 overflow-hidden">
      <ThreeBG />
      <Navbar />
      <main className="relative z-10 px-4 sm:px-8 md:px-16">
        <Hero />
        <About />
        <Qualifications />
        <Projects />
        <Contact />
        <br></br>
        <Footer/>
      </main>
    </div>
  );
}
