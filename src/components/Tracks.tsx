import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Users, PhoneCall, Info } from 'lucide-react';
import { SITE_DATA } from '../data';

type TabId = 'online' | 'frontal' | 'phone';

export default function Tracks() {
  const [activeTab, setActiveTab] = useState<TabId>('online');

  const tabs = [
    { id: 'online', label: SITE_DATA.services.categories[0], icon: Smartphone },
    { id: 'frontal', label: SITE_DATA.services.categories[1], icon: Users },
    { id: 'phone', label: SITE_DATA.services.categories[2], icon: PhoneCall },
  ];

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
    <section id="tracks" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative border-y border-white/5 overflow-hidden">
      {/* Floating Dumbbells Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-30, 30, -30], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-[5%] opacity-5"
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6.5 6.5h11" />
            <path d="M6.5 17.5h11" />
            <path d="m14 6.5-4 11" />
            <path d="m10 6.5 4 11" />
            <rect x="2" y="5" width="3" height="14" rx="1" />
            <rect x="19" y="5" width="3" height="14" rx="1" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ y: [30, -30, 30], rotate: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[10%] opacity-5"
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-energy">
            <path d="M6.5 6.5h11" />
            <path d="M6.5 17.5h11" />
            <path d="m14 6.5-4 11" />
            <path d="m10 6.5 4 11" />
            <rect x="2" y="5" width="3" height="14" rx="1" />
            <rect x="19" y="5" width="3" height="14" rx="1" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="overflow-hidden pb-4">
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-6"
            >
              מסלולי <span className="text-energy italic font-light">ייעוץ</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.p 
              variants={itemVariants}
              className="text-xl text-text-muted max-w-2xl mx-auto"
            >
              המסע שלך מתחיל כאן. בחר את המסלול המתאים ביותר לאורח החיים שלך.
            </motion.p>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-surface p-1.5 rounded-full border border-white/5 shadow-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`relative flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-text-muted hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-energy rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={18} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              {activeTab === 'online' && (
                <div className="space-y-12">
                  <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-white/10">
                    <img src="https://storage.googleapis.com/aistudio-user-content/0000000000000000/2026-03-07T05:51:19-08:00/68/image-6.png" alt="Online Tracking" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SITE_DATA.services.online.map((option, idx) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className={`rounded-3xl p-10 relative flex flex-col ${
                        option.isPopular 
                          ? 'bg-surface-hover border border-white/10 shadow-[0_0_40px_rgba(255,77,0,0.05)]' 
                          : 'bg-surface border border-white/5'
                      }`}
                    >
                      {option.isPopular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white text-xs font-bold px-6 py-1.5 rounded-full uppercase tracking-widest shadow-[0_5px_15px_rgba(255,77,0,0.4)]">
                          המסלול המלא
                        </div>
                      )}
                      
                      <div className="text-center mb-10 mt-4">
                        <h3 className="text-3xl font-heading font-black text-white mb-3">{option.title}</h3>
                        <p className="text-sm text-text-muted">{option.description}</p>
                      </div>
                      
                      <div className="space-y-6 flex-grow mb-10">
                        {option.pricing.map((p, pIdx) => (
                          <div key={pIdx} className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-sm text-text-muted">{p.period}</span>
                            <span className={`font-bold text-2xl ${option.isPopular && pIdx === option.pricing.length - 1 ? 'text-energy' : 'text-white'}`}>
                              ₪ {p.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <a href="#contact" className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                        option.isPopular 
                          ? 'bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:scale-[1.02]' 
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                      }`}>
                        התחל עכשיו
                      </a>
                    </motion.div>
                  ))}
                  </div>
                </div>
              )}

              {activeTab === 'frontal' && (
                <div className="space-y-12">
                  <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-white/10">
                    <img src="https://storage.googleapis.com/aistudio-user-content/0000000000000000/2026-03-07T05:51:19-08:00/68/image-4.png" alt="Frontal Measurements" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SITE_DATA.services.frontal.filter(o => o.id !== 'frontal-mfu').map((option, idx) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className={`rounded-3xl p-10 relative flex flex-col ${
                          option.isPopular 
                            ? 'bg-surface-hover border border-white/10 shadow-[0_0_40px_rgba(255,77,0,0.05)]' 
                            : 'bg-surface border border-white/5'
                        }`}
                      >
                        {option.isPopular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white text-xs font-bold px-6 py-1.5 rounded-full uppercase tracking-widest shadow-[0_5px_15px_rgba(255,77,0,0.4)]">
                            המסלול המלא
                          </div>
                        )}
                        
                        <div className="text-center mb-10 mt-4">
                          <h3 className="text-3xl font-heading font-black text-white mb-3">{option.title}</h3>
                          <p className="text-sm text-text-muted">{option.description}</p>
                        </div>
                        
                        <div className="space-y-6 flex-grow mb-10">
                          {option.pricing.map((p, pIdx) => (
                            <div key={pIdx} className="flex justify-between items-center border-b border-white/5 pb-4">
                              <span className="text-sm text-text-muted">{p.period}</span>
                              <span className={`font-bold text-2xl ${option.isPopular && pIdx === option.pricing.length - 1 ? 'text-energy' : 'text-white'}`}>
                                ₪ {p.price.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <a href="#contact" className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                          option.isPopular 
                            ? 'bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:scale-[1.02]' 
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                        }`}>
                          התחל עכשיו
                        </a>
                      </motion.div>
                    ))}
                  </div>

                  {/* Follow-up Note */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-energy/10 border border-energy/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80"
                  >
                    <Info className="text-energy shrink-0" size={24} />
                    <div className="flex-grow">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-energy font-bold">שימו לב:</strong> הפגישה הראשונה ארוכה מן הרגיל. שאר פגישות המעקב אורכות כ-5 דקות ומתקיימות בטווח של כ-3 שבועות אחת מהשנייה למעקב אידיאלי.
                      </p>
                    </div>
                  </motion.div>

                  {/* MFU Note */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-surface border border-white/5 rounded-2xl p-6 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-white font-bold mb-1">מדידות מעקב (MFU)</h4>
                      <p className="text-sm text-text-muted">לשמירה על תוצאות - מיועד רק למי שעבר תהליך פרונטלי מלא.</p>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-text-muted mb-1">4 קפיצות מדידה</div>
                      <div className="text-xl font-bold text-white">₪ 520</div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'phone' && (
                <div className="max-w-2xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface-hover border border-white/10 p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,77,0,0.05)]"
                  >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-energy/5 to-transparent pointer-events-none"></div>
                    <PhoneCall className="w-16 h-16 text-energy mx-auto mb-8" strokeWidth={1.5} />
                    <h3 className="text-4xl font-heading font-black mb-6 text-white">{SITE_DATA.services.phone.title}</h3>
                    <p className="text-lg text-text-muted mb-12 leading-relaxed max-w-lg mx-auto">
                      {SITE_DATA.services.phone.description}
                    </p>

                    <div className="flex flex-col gap-4 max-w-md mx-auto relative z-10">
                      <div className="flex justify-between items-center w-full bg-surface border border-white/5 rounded-2xl p-6">
                        <span className="text-sm text-text-muted">{SITE_DATA.services.phone.basePrice.minutes} דקות ראשונות</span>
                        <span className="text-3xl font-black text-energy">₪ {SITE_DATA.services.phone.basePrice.price}</span>
                      </div>
                      <div className="flex justify-between items-center w-full bg-surface border border-white/5 rounded-2xl p-6">
                        <span className="text-sm text-text-muted">כל דקה נוספת</span>
                        <span className="font-bold text-xl text-white">₪ {SITE_DATA.services.phone.additionalMinutePrice}</span>
                      </div>
                      
                      <a href="#contact" className="w-full mt-4 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:scale-[1.02]">
                        תיאום שיחה
                      </a>
                    </div>
                  </motion.div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
