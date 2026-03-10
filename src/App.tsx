/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import VSL from './components/VSL';
import Ingredients from './components/Ingredients';
import Process from './components/Process';
import FreeValue from './components/FreeValue';
import Pathfinder from './components/Pathfinder';
import Courses from './components/Courses';
import Tracks from './components/Tracks';
import AppShowcase from './components/AppShowcase';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Seminars from './components/Seminars';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LeadMagnetPopup from './components/LeadMagnetPopup';
import DownloadPopup from './components/DownloadPopup';
import CursorFollower from './components/CursorFollower';

// GitHub Push Sync Test - 2026-03-10
export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            exit={{ y: '-100%' }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 mb-6">
              <img src="https://storage.googleapis.com/aistudio-user-content/0000000000000000/2026-03-07T05:51:19-08:00/68/image-1.png" alt="TF Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-energy"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-4 text-text-muted font-mono text-sm tracking-widest">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full min-h-screen">
        <CursorFollower />
        <div className="noise-overlay"></div>
        <Header />
        <main>
          <Hero />
          <VSL />
          <Ingredients />
          <Process />
          <FreeValue />
          <Pathfinder />
          <Courses />
          <Tracks />
          <AppShowcase />
          <About />
          <Seminars />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
        <LeadMagnetPopup />
        <DownloadPopup />
      </div>
    </>
  );
}
