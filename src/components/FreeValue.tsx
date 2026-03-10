import { motion } from 'motion/react';
import { Download, CheckCircle2, Smartphone } from 'lucide-react';

export default function FreeValue() {
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
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-surface relative overflow-hidden border-y border-white/5">
      {/* Glow Blobs */}
      <div className="glow-blob top-0 left-0 bg-energy opacity-10"></div>
      <div className="glow-blob bottom-0 right-0 bg-energy-light opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="overflow-hidden pb-2">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-energy/30 bg-energy/10 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-energy"></span>
                </span>
                <span className="text-xs font-bold tracking-widest text-energy uppercase">חינם לחלוטין</span>
              </motion.div>
            </div>
            
            <div className="overflow-hidden pb-4">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-heading font-black text-text-main mb-6 leading-tight">
                קבל גישה חינמית <span className="text-energy">לאפליקציית המעקב שלי</span>
              </motion.h2>
            </div>
            
            <div className="overflow-hidden pb-2">
              <motion.p variants={itemVariants} className="text-lg text-text-muted mb-8 leading-relaxed">
                לפני שאתה מתחייב לתהליך, קבל ממני את כל הכלים שאתה צריך כדי להתחיל. הירשם עכשיו וקבל גישה לאפליקציית המעקב שלי ולערכת ההתחלה המלאה.
              </motion.p>
            </div>

            <ul className="space-y-4 mb-10">
              {['מעקב אחר משקל ומדדים אישיים', 'מחשבון קלוריות ומאקרו מובנה', 'גישה למאגר מתכונים בריאים', 'מדריך וידאו קצר להתחלה נכונה'].map((item, i) => (
                <div key={i} className="overflow-hidden pb-1">
                  <motion.li variants={itemVariants} className="flex items-center gap-3 text-text-main">
                    <CheckCircle2 size={20} className="text-energy shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                </div>
              ))}
            </ul>

            <div className="overflow-hidden pb-2">
              <motion.form variants={itemVariants} className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="הכנס כתובת אימייל" 
                  className="flex-1 bg-bg border border-white/10 rounded-full px-6 py-4 text-text-main focus:outline-none focus:border-energy transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="btn-magnetic bg-energy text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)] flex items-center justify-center gap-2"
                >
                  <Smartphone size={18} />
                  <span>קבל גישה לאפליקציה</span>
                </button>
              </motion.form>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.p variants={itemVariants} className="text-xs text-text-muted mt-4">* פרטי ההתחברות ישלחו אליך למייל באופן מיידי. ללא ספאם.</motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-energy/20 to-bg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <img 
                src="/image7.jpg" 
                alt="Fitness App Access" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-10 text-center p-8">
                <div className="w-16 h-16 bg-energy text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-3xl font-heading font-black text-white mb-2">TF. TRACKER</h3>
                <p className="text-energy font-bold tracking-widest uppercase text-sm mb-6">אפליקציית מעקב אישית</p>
                <div className="w-12 h-1 bg-white/20 mx-auto rounded-full"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
