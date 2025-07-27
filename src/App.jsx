// src/App.jsx
import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Qualifications from './components/Qualifications';
import Projects from './components/Projects';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBG from './components/ThreeBG';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen text-white bg-gray-900 overflow-hidden">
      <ThreeBG />
      <Navbar />
      <main className="relative z-10 px-4 sm:px-8 md:px-16">
        <Hero />
        <About />
        <Qualifications />
        <Projects />
        <Certificate />
        <Contact />
        <br />
        <Footer />
      </main>
    </div>
  );
}

export default App;