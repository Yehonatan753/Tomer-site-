import { motion } from 'motion/react';
import { Mail, Phone, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { SITE_DATA } from '../data';

export default function Footer() {
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
    <footer id="contact" className="bg-surface text-text-main rounded-t-[4rem] pt-32 pb-12 px-6 md:px-16 lg:px-24 relative overflow-hidden mt-[-2rem] z-20 border-t border-white/5">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          
          {/* Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="overflow-hidden pb-4">
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tighter">
                מוכן לצאת <span className="text-energy italic font-light">לדרך?</span>
              </motion.h2>
            </div>
            
            <motion.form variants={itemVariants} className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="text" id="name" required className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-energy transition-colors peer" placeholder=" " />
                  <label htmlFor="name" className="absolute right-0 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">שם מלא</label>
                </div>
                <div className="relative group">
                  <input type="tel" id="phone" required className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-energy transition-colors peer" placeholder=" " dir="ltr" />
                  <label htmlFor="phone" className="absolute right-0 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">טלפון</label>
                </div>
              </div>
              
              <div className="relative group">
                <input type="email" id="email" required className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-energy transition-colors peer" placeholder=" " dir="ltr" />
                <label htmlFor="email" className="absolute right-0 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">אימייל</label>
              </div>
              
              <div className="relative group">
                <input type="text" id="subject" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-energy transition-colors peer" placeholder=" " />
                <label htmlFor="subject" className="absolute right-0 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">נושא הפנייה</label>
              </div>
              
              <div className="relative group mt-4">
                <textarea id="message" rows={4} className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-energy transition-colors peer resize-none" placeholder=" "></textarea>
                <label htmlFor="message" className="absolute right-0 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-energy peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">הודעה</label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 bg-energy text-white py-4 px-8 rounded-full font-bold text-lg w-full md:w-auto self-start hover:bg-energy-light transition-colors shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)]"
                type="submit"
              >
                שלח הודעה
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center lg:pl-12"
          >
            <div className="glass-panel rounded-3xl p-10 flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-energy border border-white/10">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm mb-1">אימייל</h4>
                  <a href={`mailto:${SITE_DATA.profile.email}`} className="text-xl font-medium hover:text-energy transition-colors" dir="ltr">
                    {SITE_DATA.profile.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-energy border border-white/10">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm mb-1">ווטסאפ / טלפון</h4>
                  <a href={`tel:${SITE_DATA.profile.phoneInternational}`} className="text-xl font-medium hover:text-energy transition-colors" dir="ltr">
                    {SITE_DATA.profile.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-energy border border-white/10">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm mb-1">שעות פעילות</h4>
                  <p className="text-xl font-medium">
                    {SITE_DATA.profile.hours}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-16 h-16">
            <img src="https://storage.googleapis.com/aistudio-user-content/0000000000000000/2026-03-07T05:51:19-08:00/68/image-1.png" alt="TF Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="flex items-center gap-4">
            <a href={SITE_DATA.profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-bg transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <Instagram size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-bg transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <Facebook size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-bg transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              <Youtube size={18} />
            </a>
            <a href={SITE_DATA.profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
            </a>
            <a href={SITE_DATA.profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all hover:shadow-[0_0_15px_rgba(0,119,181,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
          
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} {SITE_DATA.profile.name}. כל הזכויות שמורות.
          </div>
        </div>
      </div>
    </footer>
  );
}
