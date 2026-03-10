import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SITE_DATA } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="faq" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="overflow-hidden pb-4">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-heading font-bold text-text-main tracking-tighter mb-4"
            >
              שאלות <span className="text-energy italic font-light">נפוצות</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.p 
              variants={itemVariants}
              className="text-xl text-text-muted"
            >
              כל מה שרציתם לדעת על התהליך.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {SITE_DATA.faq.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="glass-panel-dark rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
              >
                <span className="text-lg md:text-xl font-bold text-white">{item.question}</span>
                <ChevronDown 
                  size={24} 
                  className={`text-energy transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 text-text-muted leading-relaxed border-t border-white/5 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
