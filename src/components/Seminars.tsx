import { motion } from 'motion/react';

export default function Seminars() {
  return (
    <section id="seminars" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface border border-energy/20 rounded-[2rem] p-10 md:p-16 relative overflow-hidden text-center shadow-[0_0_50px_rgba(255,77,0,0.05)]"
        >
          <div className="absolute inset-0 bg-[url('/image8.jpg')] opacity-5 bg-cover bg-center mix-blend-luminosity"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-energy/20 text-energy text-xs font-bold mb-6 tracking-widest uppercase border border-energy/30">בקרוב</span>
            <h3 className="font-heading font-black text-3xl md:text-5xl mb-6 text-white">
              סדנאות פרונטליות - <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy to-orange-400">סדרת 2026</span>
            </h3>
            <p className="text-text-muted text-lg mb-10 leading-relaxed">
              בקרוב נפתח את ההרשמה לסדרה ייחודית של הרצאות וסדנאות עומק בנושאי תזונת ספורט, תוספים, וגמישות תזונתית ברחבי הארץ.
              מספר המקומות מוגבל. הירשמו לרשימת ההמתנה כדי לקבל עדכון ראשונים והטבת הרשמה.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="האימייל שלך" 
                required 
                className="flex-grow bg-bg border border-white/20 rounded-full px-6 py-4 text-white focus:border-energy focus:ring-1 focus:ring-energy transition-all outline-none"
              />
              <button type="submit" className="btn-magnetic bg-energy text-white py-4 px-8 rounded-full font-bold whitespace-nowrap shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)]">
                הצטרף לרשימה
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
