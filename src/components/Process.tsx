import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "1",
      title: "אפיון והגדרת מטרות",
      desc: "פגישת היכרות מעמיקה להבנת אורח החיים שלך, היסטוריה רפואית, העדפות תזונתיות והגדרת יעדים ריאליים ומדויקים.",
      note: "בשלב זה אני אוסף את כל המידע הדרוש כדי לתפור את החליפה המושלמת עבורך."
    },
    {
      num: "2",
      title: "התאמה מדעית",
      desc: "בניית תפריט תזונה ותכנית אימונים מבוססי מחקר, המותאמים אישית לפיזיולוגיה שלך ולסדר היום שלך.",
      note: "התאמה אישית היא המפתח להתמדה. התכנית צריכה להתאים לחיים שלך, לא להפך."
    },
    {
      num: "3",
      title: "מעקב ואופטימיזציה",
      desc: "ליווי צמוד, שקילות, מדידות ועדכוני תכנית שוטפים כדי להבטיח התקדמות מתמדת ושבירת תקיעויות.",
      note: "הגוף משתנה ומסתגל, ולכן התכנית חייבת להיות דינמית ולהשתנות יחד איתו."
    }
  ];

  return (
    <section id="process" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
      {/* Floating Dumbbells Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[5%] opacity-10"
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M6.5 6.5h11" />
            <path d="M6.5 17.5h11" />
            <path d="m14 6.5-4 11" />
            <path d="m10 6.5 4 11" />
            <rect x="2" y="5" width="3" height="14" rx="1" />
            <rect x="19" y="5" width="3" height="14" rx="1" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-[10%] opacity-10"
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-energy">
            <path d="M6.5 6.5h11" />
            <path d="M6.5 17.5h11" />
            <path d="m14 6.5-4 11" />
            <path d="m10 6.5 4 11" />
            <rect x="2" y="5" width="3" height="14" rx="1" />
            <rect x="19" y="5" width="3" height="14" rx="1" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="text-energy font-bold tracking-widest uppercase text-sm mb-4">תהליך העבודה איתי</div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main">
            מובנה, שקוף <span className="text-energy">וממוקד-תוצאות</span>
          </h2>
          <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
            השותפות שלנו מתחילה באפיון אסטרטגי וממשיכה באופטימיזציה מתמדת. אני לא מספק פתרון 'זבנג וגמרנו', אלא אנחנו בונים יחד הרגלים לכל החיים.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block"></div>
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-energy to-orange-500 -translate-x-1/2 hidden md:block origin-top shadow-[0_0_15px_rgba(255,77,0,0.8)]"
            style={{ height: lineHeight }}
          ></motion.div>

          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 !== 0;
              // Calculate when this specific step should light up based on scroll progress
              const stepProgressStart = idx * 0.33;
              const stepProgressEnd = stepProgressStart + 0.1;
              
              const isActive = useTransform(
                scrollYProgress,
                [stepProgressStart, stepProgressEnd],
                [0, 1]
              );

              const glowOpacity = useTransform(
                scrollYProgress,
                [stepProgressStart, stepProgressEnd],
                [0.2, 1]
              );

              const borderColor = useTransform(
                scrollYProgress,
                [stepProgressStart, stepProgressEnd],
                ["rgba(255,255,255,0.1)", "rgba(255,77,0,1)"]
              );

              const scale = useTransform(
                scrollYProgress,
                [stepProgressStart, stepProgressEnd],
                [1, 1.1]
              );

              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className="glass-panel p-8 rounded-3xl hover-trigger hover:border-energy/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.15)] group">
                      <h3 className="text-2xl font-heading font-bold text-text-main mb-3 group-hover:text-energy transition-colors">{step.title}</h3>
                      <p className="text-text-muted mb-4">{step.desc}</p>
                      <p className="text-sm text-energy/80 italic">"{step.note}"</p>
                    </div>
                  </motion.div>

                  {/* Center Node */}
                  <div className="hidden md:flex relative z-10 items-center justify-center w-16 h-16 shrink-0">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-energy/20 blur-md"
                      style={{ opacity: glowOpacity }}
                    />
                    <motion.div 
                      className="relative flex items-center justify-center w-14 h-14 rounded-full bg-bg text-white font-bold text-xl z-10 transition-colors hover-trigger"
                      style={{ 
                        borderColor: borderColor,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        scale: scale
                      }}
                      whileHover={{ scale: 1.2, boxShadow: "0 0 20px rgba(255,77,0,0.6)", borderColor: "rgba(255,77,0,1)" }}
                    >
                      <motion.span
                        style={{
                          color: useTransform(scrollYProgress, [stepProgressStart, stepProgressEnd], ["#ffffff", "#FF4D00"])
                        }}
                      >
                        {step.num}
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Mobile Node (Static) */}
                  <div className="md:hidden relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-bg border-2 border-energy text-energy font-bold text-xl shrink-0 shadow-[0_0_20px_rgba(255,77,0,0.3)]">
                    {step.num}
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block flex-1 w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
