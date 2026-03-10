import { motion } from 'motion/react';
import { Dna, Dumbbell, CheckCircle2 } from 'lucide-react';
import { SITE_DATA } from '../data';

export default function Ingredients() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { y: '100%' },
    show: { 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="ingredients" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="overflow-hidden pb-4">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-heading font-bold text-text-main tracking-tighter"
            >
              מרכיבים <span className="text-energy italic font-light">להצלחה</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {SITE_DATA.philosophy.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 + (idx * 40) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`glass-panel rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group ${idx === 1 ? 'md:mt-24' : ''}`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-700 ${idx === 0 ? 'bg-energy/5 group-hover:bg-energy/10' : 'bg-white/5 group-hover:bg-white/10'}`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${idx === 0 ? 'bg-energy/10 text-energy' : 'bg-white/10 text-white'}`}>
                  {item.icon === 'dna' ? <Dna size={32} strokeWidth={1.5} /> : <Dumbbell size={32} strokeWidth={1.5} />}
                </div>
                
                <h3 className="text-3xl font-heading font-bold mb-6 text-text-main">{item.title}</h3>
                
                <p className="text-lg text-text-muted leading-relaxed font-medium mb-8">
                  {item.description}
                </p>

                <ul className="space-y-4 mt-auto">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-text-main/80 bg-white/5 p-4 rounded-xl border border-white/5">
                      <CheckCircle2 size={20} className={`${idx === 0 ? 'text-energy' : 'text-white'} shrink-0 mt-0.5`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
