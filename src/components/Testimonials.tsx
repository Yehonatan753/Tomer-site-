import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { SITE_DATA } from '../data';

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="testimonials" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="glow-blob top-1/2 left-0 bg-energy/50 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-text-main tracking-tighter mb-6">
            סיפורי <span className="text-glow-animate italic font-light">הצלחה</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            התוצאות מדברות בעד עצמן. הצטרפו למאות מתאמנים שכבר עשו את השינוי.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SITE_DATA.testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="glass-panel rounded-3xl p-8 relative group hover:-translate-y-2 transition-transform duration-500"
            >
              <Quote className="absolute top-6 left-6 w-12 h-12 text-energy/20 rotate-180" />
              
              <div className="flex gap-1 mb-6 text-energy">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-lg text-text-main/90 leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-text-main">{testimonial.name}</h4>
                  <span className="text-sm text-energy font-medium">{testimonial.result}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted border border-white/10">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tomer's Guarantee / Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 glass-panel-dark border-energy/20 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-energy/10 rounded-full blur-3xl"></div>
           
           {/* Image Placeholder */}
           <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full border-4 border-energy/30 overflow-hidden relative bg-bg shadow-[0_0_30px_rgba(255,77,0,0.2)]">
               <div className="absolute inset-0 bg-[url('/image6.jpg')] bg-cover bg-top opacity-50 mix-blend-luminosity"></div>
               <span className="absolute inset-0 flex items-center justify-center text-center text-sm font-bold text-white/60 uppercase tracking-widest">Tomer's Face</span>
           </div>
           
           <div className="relative z-10 text-center md:text-right">
               <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">המחוייבות שלי <span className="text-energy">אליך</span></h3>
               <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-6">
                   "אני לא מחפש לקוחות לכל החיים. אני מחפש אנשים שרוצים ללמוד איך לאכול נכון, להתאמן חכם, ולשמור על התוצאות לתמיד. ההצלחה שלך היא תעודת הזהות שלי, והפנים שלי עומדות מאחורי כל תפריט ותוכנית."
               </p>
               <div className="text-2xl font-heading font-bold text-white">תומר פרידמן.</div>
               <div className="text-energy text-sm font-bold tracking-widest uppercase mt-1">תזונאי קליני וספורט</div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
