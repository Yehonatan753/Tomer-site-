import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function VSL() {
  return (
    <section className="relative py-20 px-6 md:px-16 lg:px-24 bg-bg overflow-hidden z-20">
      <div className="max-w-5xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 rounded-2xl md:rounded-[2rem] bg-gradient-to-b from-energy to-orange-600 opacity-30 blur-xl"></div>

          <div className="relative rounded-2xl md:rounded-[2rem] border-2 border-white/10 bg-surface overflow-hidden aspect-video shadow-2xl flex items-center justify-center group cursor-pointer">
            {/* Fallback / Placeholder Image */}
            <img 
              src="/image4.jpg" 
              alt="Tomer Fridman VSL"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent"></div>

            {/* Play Button */}
            <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-energy/90 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(255,77,0,0.5)]">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" />
            </div>

            {/* VSL Text Overlay */}
            <div className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center z-10">
              <p className="font-heading font-bold text-xl md:text-3xl text-white tracking-widest drop-shadow-md">
                צפה כיצד השיטה עובדת
              </p>
              <p className="text-white/60 text-sm mt-2">4:32 דקות שעשויות לשנות את חייך</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
