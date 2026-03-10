import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Users, PhoneCall, Check, X, CheckCircle2, Info } from 'lucide-react';
import { SITE_DATA } from '../data';

type TabId = 'online' | 'frontal' | 'phone';

export default function Tracks() {
    const [activeTab, setActiveTab] = useState<TabId>('online');

    const tabs = [
        { id: 'online', label: 'אונליין', icon: Smartphone },
        { id: 'frontal', label: 'פרונטלי', icon: Users },
        { id: 'phone', label: 'ייעוץ טלפוני', icon: PhoneCall },
    ];

    return (
        <section id="tracks" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
            {/* PART A: Pain Point Gap Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto mb-20"
            >
                <h3 className="text-3xl md:text-5xl font-heading font-black text-center mb-10">למה דיאטות לא עובדות (ומה כן)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8"
                    >
                        <h4 className="text-2xl font-bold mb-6 text-white/90">הדרך הישנה</h4>
                        <div className="space-y-5">
                            {[
                                "תפריטים גנריים שלא לוקחים בחשבון את החיים האמיתיים שלך",
                                "אימונים של שעה+ שנגמרים אחרי שבועיים כי אין זמן או כוח",
                                "דיאטות קיצוניות שמסתיימות באותו משקל — פלוס עוד קילו",
                                "מאמנים שנותנים תפריט פוטוקופי זהה לכל לקוח"
                            ].map((text, i) => (
                                <motion.div key={i} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{ delay: 0.2 + (i*0.08) }} className="flex items-start gap-4">
                                    <X className="text-red-400/60 shrink-0 mt-1" size={18} />
                                    <span className="text-text-muted">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* Right Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-energy/5 border border-energy/10 rounded-3xl p-8"
                    >
                        <h4 className="text-2xl font-bold mb-6 text-white">הגישה של תומר</h4>
                        <div className="space-y-5">
                            {[
                                "תפריט שמתאים לאורח החיים שלך — מסעדות, אירועים, חופשות",
                                "אימונים של 20 דקות, 3 פעמים בשבוע. זה הכל.",
                                "תוצאות שנשארות כי הגישה מדעית, לא רגשית",
                                "תזונאי קליני אחד. 22 שנות ניסיון. בלי מתמחים, בלי צוות."
                            ].map((text, i) => (
                                <motion.div key={i} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{ delay: 0.4 + (i*0.08) }} className="flex items-start gap-4">
                                    <Check className="text-energy shrink-0 mt-1" size={18} />
                                    <span className="text-text-main">{text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <div className="text-center mt-12 text-xl font-medium text-text-muted">
                    בחר את המסלול שמתאים לך.
                </div>
            </motion.div>

            {/* PART B: Section Heading */}
            <div className="max-w-7xl mx-auto text-center mb-12 relative z-10">
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-6">
                    מסלולי <span className="text-energy italic font-light">ליווי</span>
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                    לא עוד דיאטה. מערכת שמותאמת ללוח הזמנים, להעדפות ולמטרות שלך.
                </p>
            </div>

            {/* PART C: Tab Switcher */}
            <div className="flex justify-center mb-16 relative z-10">
                <div className="inline-flex p-1.5 rounded-full" style={{
                    background: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={`relative flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive ? 'text-white' : 'text-text-muted hover:text-white'
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

            {/* Radial Glow Background behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse at center, rgba(255,77,0,0.06) 0%, transparent 70%)', zIndex: 0 }} />

            {/* PART D: Tab Content */}
            <div className="max-w-7xl mx-auto relative z-10 min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {activeTab === 'online' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Online Card 1 (Non-popular) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15, duration: 0.5 }}
                                    className="bg-surface border border-white/5 rounded-2xl p-10 flex flex-col relative"
                                >
                                    <h3 className="text-3xl font-bold text-white mb-2">המסלול הממוקד</h3>
                                    <p className="text-text-muted mb-8">תזונה מותאמת אישית, ליווי שבועי, תוצאות מדידות</p>
                                    
                                    <div className="space-y-4 mb-10 flex-grow">
                                        {[
                                            "תפריט מותאם לאורח החיים שלך — כולל מסעדות, אירועים וחופשות",
                                            "מדריך שרידות: איך לאכול בחוץ בלי להרוס התקדמות",
                                            "מעקב שבועי אישי מול תומר (לא מתמחה)",
                                            "גישה מלאה לאפליקציית TF Tracker",
                                            "התאמות תפריט בזמן אמת דרך צ'אט ישיר"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                <span className="text-sm text-white/90">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                            <span>חודש</span>
                                            <span className="font-bold">₪1,200</span>
                                        </div>
                                        <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                            <span>3 חודשים</span>
                                            <span className="font-bold">₪2,580 (₪860/חודש)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-white pb-3">
                                            <span>6 חודשים <span className="text-xs text-energy bg-energy/10 px-2 py-0.5 rounded ml-2">הכי משתלם</span></span>
                                            <span className="font-bold text-lg">₪4,200 (₪700/חודש)</span>
                                        </div>
                                    </div>

                                    <a href="#contact" className="w-full text-center py-4 rounded-xl font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                                        התחל את התהליך
                                    </a>
                                    <p className="text-xs text-center mt-3 text-text-muted">שיחת אפיון ראשונית ללא התחייבות</p>
                                </motion.div>

                                {/* Online Card 2 (POPULAR) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="animated-border-card-popular relative"
                                >
                                    <div className="bg-surface h-full rounded-[calc(1.5rem-2px)] p-10 flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-1/2 translate-x-1/2 bg-gradient-to-r from-energy to-energy-light text-white text-xs font-bold px-6 py-1.5 rounded-b-lg tracking-widest uppercase">
                                            הנבחר ביותר
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2 mt-4">המסלול המלא</h3>
                                        <p className="text-text-muted mb-8">תזונה + אימונים אישיים. המעטפת השלמה למי שרוצה תוצאות ולא רוצה לנחש.</p>

                                        <div className="space-y-4 mb-10 flex-grow">
                                            {[
                                                "כל מה שכלול במסלול הממוקד",
                                                "תכנית אימונים אישית: 20 דקות, 3 פעמים בשבוע",
                                                "סרטוני הדרכה לכל תרגיל + משקלים מדויקים",
                                                "עדכון תכנית אימונים כל חודש לפי התקדמות",
                                                "מעקב ביצועים באפליקציה: סטים, חזרות, עומסים"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>חודש</span>
                                                <span className="font-bold">₪1,620</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>3 חודשים</span>
                                                <span className="font-bold">₪3,660 (₪1,220/חודש)</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white pb-3">
                                                <span>6 חודשים <span className="text-xs text-energy bg-energy/10 px-2 py-0.5 rounded ml-2">הכי משתלם</span></span>
                                                <span className="font-bold text-lg text-energy">₪6,480 (₪1,080/חודש)</span>
                                            </div>
                                        </div>

                                        <a href="#contact" className="w-full text-center py-4 rounded-xl font-bold bg-energy text-white hover:bg-energy-light transition-colors shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)]">
                                            מתחיל עכשיו
                                        </a>
                                        <p className="text-xs text-center mt-3 text-text-muted">לנרשמים ל-6 חודשים: פגישת מיפוי ראשונית ללא עלות נוספת</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {activeTab === 'frontal' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Frontal Card 1 (Non-popular) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                        className="bg-surface border border-white/5 rounded-2xl p-10 flex flex-col relative"
                                    >
                                        <h3 className="text-3xl font-bold text-white mb-2">הליווי הפרונטלי</h3>
                                        <p className="text-text-muted mb-8">תזונה מותאמת אישית עם מפגשים פנים מול פנים</p>
                                        
                                        <div className="space-y-4 mb-10 flex-grow">
                                            {[
                                                "תפריט מותאם לאורח החיים שלך — כולל מסעדות, אירועים וחופשות",
                                                "מדריך שרידות: איך לאכול בחוץ בלי להרוס התקדמות",
                                                "מדידות הרכב גוף כל פגישה",
                                                "פגישה ראשונה של 75 דקות לאפיון מלא",
                                                "פגישות מעקב קצרות כל 2-3 שבועות",
                                                "גישה מלאה לאפליקציית TF Tracker"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                    <span className="text-sm text-white/90">{item}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                <span>4 מפגשים</span>
                                                <span className="font-bold">₪4,200</span>
                                            </div>
                                            <div className="flex justify-between items-center text-white pb-3">
                                                <span>8 מפגשים</span>
                                                <span className="font-bold text-lg">₪6,240 (₪780/מפגש)</span>
                                            </div>
                                        </div>

                                        <a href="#contact" className="w-full text-center py-4 rounded-xl font-bold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                                            קבע פגישת היכרות
                                        </a>
                                        <p className="text-xs text-center mt-3 text-text-muted">שיחת אפיון ראשונית ללא התחייבות</p>
                                    </motion.div>

                                    {/* Frontal Card 2 (POPULAR) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="animated-border-card-popular relative"
                                    >
                                        <div className="bg-surface h-full rounded-[calc(1.5rem-2px)] p-10 flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-1/2 translate-x-1/2 bg-gradient-to-r from-energy to-energy-light text-white text-xs font-bold px-6 py-1.5 rounded-b-lg tracking-widest uppercase">
                                                הנבחר ביותר
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2 mt-4">הליווי האינטנסיבי</h3>
                                            <p className="text-text-muted mb-8">תזונה + אימונים פנים מול פנים. הליווי הצמוד ביותר שתומר מציע.</p>

                                            <div className="space-y-4 mb-10 flex-grow">
                                                {[
                                                    "כל מה שכלול בליווי הפרונטלי",
                                                    "תכנית אימונים אישית: 20 דקות, 3 פעמים בשבוע",
                                                    "סרטוני הדרכה לכל תרגיל + משקלים מדויקים",
                                                    "עדכון תכנית אימונים כל חודש לפי התקדמות",
                                                    "מעקב ביצועים באפליקציה: סטים, חזרות, עומסים"
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <CheckCircle2 size={18} className="text-energy shrink-0 mt-0.5" />
                                                        <span className="text-sm text-white/90">{item}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex justify-between items-center text-white/80 pb-3 border-b border-white/5">
                                                    <span>4 מפגשים</span>
                                                    <span className="font-bold">₪5,580</span>
                                                </div>
                                                <div className="flex justify-between items-center text-white pb-3">
                                                    <span>8 מפגשים</span>
                                                    <span className="font-bold text-lg text-energy">₪8,580 (₪1,073/מפגש)</span>
                                                </div>
                                            </div>

                                            <a href="#contact" className="w-full text-center py-4 rounded-xl font-bold bg-energy text-white hover:bg-energy-light transition-colors shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)]">
                                                מתחיל עכשיו
                                            </a>
                                            <p className="text-xs text-center mt-3 text-text-muted">פגישה ראשונה ארוכה (75 דק׳) — אפיון מלא של מטרות, מגבלות והעדפות</p>
                                        </div>
                                    </motion.div>
                                </div>
                                
                                {/* Info Note */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-blue-200/80"
                                >
                                    <Info className="text-blue-400 shrink-0" size={24} />
                                    <div className="flex-grow">
                                        <p className="text-sm leading-relaxed">
                                            <strong className="text-blue-300 font-bold">שימו לב:</strong> הפגישה הראשונה ארוכה מן הרגיל. שאר פגישות המעקב אורכות כ-5 דקות ומתקיימות בטווח של כ-3 שבועות אחת מהשנייה למעקב אידיאלי.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* MFU Note */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between"
                                >
                                    <div className="mb-4 md:mb-0 text-center md:text-right">
                                        <h4 className="text-white font-bold mb-1">מדידות מעקב (MFU)</h4>
                                        <p className="text-sm text-text-muted">לשמירה על תוצאות - מיועד רק למי שעבר תהליך פרונטלי מלא.</p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="text-xs text-text-muted mb-1">4 קפיצות מדידה</div>
                                        <div className="text-xl font-bold text-white">₪520</div>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {activeTab === 'phone' && (
                            <div className="max-w-2xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
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
                                            <span className="text-3xl font-black text-energy">₪{SITE_DATA.services.phone.basePrice.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center w-full bg-surface border border-white/5 rounded-2xl p-6">
                                            <span className="text-sm text-text-muted">כל דקה נוספת</span>
                                            <span className="font-bold text-xl text-white">₪{SITE_DATA.services.phone.additionalMinutePrice}</span>
                                        </div>

                                        <a href="#contact" className="w-full mt-4 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF4D00] to-[#CC3D00] text-white hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:scale-[1.02]">
                                            תיאום שיחה
                                        </a>
                                        <p className="text-xs text-center mt-3 text-text-muted">בלי התחייבות. שלם רק על הזמן שאתה צורך.</p>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
