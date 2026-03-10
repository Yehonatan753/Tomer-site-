import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const links = [
    { name: 'ראשי', href: '#hero' },
    { name: 'אודות', href: '#about' },
    { name: 'מסלולים', href: '#tracks' },
    { name: 'אפליקציה', href: '#app' },
    { name: 'תהליך', href: '#process' },
    { name: 'המלצות', href: '#testimonials' },
    { name: 'הרצאות', href: '#courses' },
    { name: 'שאלות', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      let currentSection = 'hero';
      const sections = links.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-0 right-0 z-40 mx-auto w-[95%] max-w-5xl rounded-full transition-all duration-500 ${
          isScrolled
            ? 'glass-panel py-3 px-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10'
            : 'bg-transparent py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-lg transition-colors overflow-hidden ${isScrolled ? 'bg-energy text-white shadow-[0_0_15px_rgba(255,77,0,0.5)]' : 'bg-white text-bg'}`}>
              <img src="https://storage.googleapis.com/aistudio-user-content/0000000000000000/2026-03-07T05:51:19-08:00/68/image-1.png" alt="TF Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight hidden lg:block transition-colors text-text-main`}>
              תומר פרידמן
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`focus:outline-none transition-colors text-text-main`}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'text-white bg-white/10 shadow-[inset_0_0_20px_rgba(255,77,0,0.2)]' 
                      : 'text-text-muted hover:text-text-main hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-energy rounded-full shadow-[0_0_10px_rgba(255,77,0,0.8)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
          
          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <a href="#contact" className="bg-energy text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-energy-light transition-colors shadow-[0_0_15px_rgba(255,77,0,0.4)]">
              צור קשר
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-xl pt-32 px-6 flex flex-col gap-6 md:hidden"
          >
            {links.map((link, i) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-3xl font-heading font-bold border-b border-white/5 pb-4 transition-colors ${
                    isActive ? 'text-energy' : 'text-text-main'
                  }`}
                >
                  {link.name}
                </motion.a>
              );
            })}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: links.length * 0.1 }}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-energy text-white py-4 rounded-xl font-bold text-center text-xl shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)]"
            >
              צור קשר
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
