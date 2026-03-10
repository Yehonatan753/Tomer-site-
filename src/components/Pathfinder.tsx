import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, ChevronLeft, CheckCircle2, ChevronRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'q1',
    title: 'מה המטרה העיקרית שלך?',
    hint: 'בחר את המטרה שהכי חשובה לך כרגע',
    options: [
      { id: 'fat-loss', label: 'ירידה בשומן וחיטוב', desc: 'שינוי הרכב הגוף והצרת היקפים' },
      { id: 'muscle', label: 'עלייה במסת שריר וכוח', desc: 'בניית שריר ושיפור ביצועים' },
      { id: 'health', label: 'שיפור בריאות ואנרגיה', desc: 'איזון מדדים, חיוניות ותפקוד יומיומי' },
      { id: 'habits', label: 'יציאה ממעגל הדיאטות', desc: 'בניית הרגלים לטווח ארוך בלי סבל' },
    ]
  },
  {
    id: 'q2',
    title: 'מה האתגר הכי גדול שלך כרגע?',
    hint: 'מה בדרך כלל גורם לך לעצור?',
    options: [
      { id: 'consistency', label: 'חוסר עקביות', desc: 'מתחיל חזק ואז מפסיק' },
      { id: 'emotional', label: 'אכילה רגשית / חוסר שליטה', desc: 'בעיקר בשעות הערב או בסטרס' },
      { id: 'confusion', label: 'בלבול מעודף מידע', desc: 'לא יודע למי להאמין ומה נכון' },
      { id: 'time', label: 'חוסר זמן', desc: 'לו"ז צפוף שמקשה על התארגנות' },
    ]
  },
  {
    id: 'q3',
    title: 'מה רמת הפעילות הגופנית שלך?',
    hint: 'כמה אימונים בשבוע בממוצע?',
    options: [
      { id: 'none', label: 'לא מתאמן כרגע', desc: 'או פעילות קלה מאוד פה ושם' },
      { id: 'low', label: '1-2 אימונים בשבוע', desc: 'משתדל לשמור על תנועה' },
      { id: 'med', label: '3-4 אימונים בשבוע', desc: 'שגרת אימונים קבועה ויציבה' },
      { id: 'high', label: 'מתאמן ברמה גבוהה', desc: '4+ אימונים עצימים בשבוע' },
    ]
  },
  {
    id: 'q4',
    title: 'מה הניסיון הקודם שלך עם תזונה?',
    hint: 'איך ניסית לפתור את זה בעבר?',
    options: [
      { id: 'never', label: 'אף פעם לא עשיתי תהליך מסודר', desc: 'זו פעם ראשונה שאני מחפש עזרה' },
      { id: 'yoyo', label: 'ניסיתי דיאטות ועליתי בחזרה', desc: 'אפקט היו-יו המוכר' },
      { id: 'know_stuck', label: 'יודע מה לעשות, לא מיישם', desc: 'הידע קיים, הביצוע חסר' },
      { id: 'good_stuck', label: 'אוכל טוב אבל התוצאות תקועות', desc: 'מרגיש שעושה הכל נכון ואין שינוי' },
    ]
  },
  {
    id: 'q5',
    title: 'איזו מסגרת ליווי תתאים לך עכשיו?',
    hint: 'מה יעזור לך להצליח?',
    options: [
      { id: 'premium', label: 'ליווי אישי וצמוד', desc: 'מעקב שבועי, התאמות וזמינות מלאה' },
      { id: 'independent', label: 'תוכנית מסודרת לעבודה עצמאית', desc: 'לקבל את הכלים ולרוץ לבד' },
      { id: 'consult', label: 'פגישת ייעוץ ודיוק', desc: 'לעשות סדר חד פעמי בבלאגן' },
      { id: 'unsure', label: 'לא בטוח', desc: 'אשמח להמלצה מקצועית' },
    ]
  }
];

function calculateResult(answers: Record<string, string>) {
  let score = 0;
  
  if (answers.q5 === 'premium') score += 3;
  if (answers.q5 === 'independent') score -= 2;
  if (answers.q3 === 'none') score += 1;
  if (answers.q4 === 'yoyo') score += 1;

  if (score >= 2) return getFrontalRecommendation();
  if (score >= -1) return getOnlineRecommendation();
  return getConsultationRecommendation();
}

function getFrontalRecommendation() {
  return {
    badge: 'ההמלצה שלי: מסלול פרונטלי',
    color: 'energy',
    title: 'אתה צריך מסגרת חזקה וליווי אישי קרוב.',
    body: 'לפי התשובות שלך, ניסית בעבר להתמודד לבד וזה לא החזיק מעמד. כדי לשבור את המעגל, אתה צריך מישהו שיהיה שם איתך, ימדוד, יעקוב ויתאים את התוכנית בזמן אמת.',
    points: [
      'מעקב צמוד בקליניקה שמונע "נפילות" בדרך',
      'התאמה אישית מדויקת למדדים הפיזיולוגיים שלך',
      'מסגרת מחייבת שעוזרת לשמור על משמעת לאורך זמן',
      'גישה מלאה לאפליקציית המעקב שלי'
    ],
    cta: 'המסלול הפרונטלי מיועד לרציניים בלבד. בוא נבדוק בשיחת ייעוץ קצרה אם אנחנו מתאימים לעבוד יחד.'
  };
}

function getOnlineRecommendation() {
  return {
    badge: 'ההמלצה שלי: מסלול אונליין',
    color: 'energy',
    title: 'יש לך את הדרייב, אתה רק צריך את המערכת הנכונה.',
    body: 'אתה יודע לעבוד עצמאית, אבל חסר לך הסדר והכוונה המקצועית. מסלול האונליין ייתן לך את כל הכלים, התפריטים ותוכניות האימון, עם מעקב שוטף מרחוק.',
    points: [
      'תוכנית תזונה ואימונים מותאמת אישית ללו"ז שלך',
      'מעקב שבועי מרחוק וזמינות לשאלות',
      'עצמאות בביצוע עם רשת ביטחון מקצועית',
      'גישה מלאה לאפליקציית המעקב שלי'
    ],
    cta: 'כדי להתאים לך את מסלול האונליין המדויק, נדרשת שיחת אפיון קצרה.'
  };
}

function getConsultationRecommendation() {
  return {
    badge: 'ההמלצה שלי: ייעוץ ממוקד',
    color: 'energy',
    title: 'המצב שלך טוב, אתה רק צריך דיוק.',
    body: 'נראה שיש לך בסיס טוב ואתה יודע מה לעשות, אבל משהו קטן עוצר אותך מלהגיע לתוצאה המושלמת. שיחת ייעוץ ממוקדת תעשה לך סדר בבלאגן.',
    points: [
      'מענה מדויק לשאלות ספציפיות שתוקעות אותך',
      'דיוק התפריט או תוכנית האימונים הקיימת שלך',
      'כלים פרקטיים ליישום מיידי',
      'בלי התחייבות לתהליך ארוך'
    ],
    cta: 'בוא נשב לשיחת ייעוץ ממוקדת ונדייק את מה שחסר לך כדי לפרוץ את המחסום. שימו לב: שיחת הייעוץ היא בדיוק כמו ייעוץ טלפוני - 10 דקות ראשונות ב-200₪, וכל דקה נוספת ב-20₪.'
  };
}

export default function Pathfinder() {
  const [currentStep, setCurrentStep] = useState(-1); // -1: intro, 0-4: questions, 5: lead, 6: calc, 7: result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });

  const handleStart = () => setCurrentStep(0);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 350);
    } else {
      setTimeout(() => setCurrentStep(QUESTIONS.length), 350);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(QUESTIONS.length + 1); // calculating
    setTimeout(() => {
      setCurrentStep(QUESTIONS.length + 2); // result
    }, 2000);
  };

  const result = currentStep === QUESTIONS.length + 2 ? calculateResult(answers) : null;

  return (
    <section id="pathfinder" className="py-24 px-6 md:px-16 lg:px-24 bg-bg relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {currentStep < QUESTIONS.length + 2 && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-text-main mb-4">
              בוא נבין מה באמת <span className="text-energy">מעכב אותך</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              אבחון תזונתי קצר שיגיד לך בדיוק מה המצב, מה עוצר אותך, ומה הצעד הבא שמתאים לך.
            </p>
          </div>
        )}

        <div className="glass-panel-dark rounded-3xl border border-white/5 p-8 md:p-12 min-h-[450px] flex flex-col justify-center relative overflow-hidden shadow-2xl">
          
          {/* Progress Bar */}
          {currentStep >= 0 && currentStep < QUESTIONS.length && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-energy"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* Intro Step */}
            {currentStep === -1 && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-energy/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-energy/20">
                  <Target size={32} className="text-energy" />
                </div>
                
                <div className="space-y-4 mb-10 text-right max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-text-muted">
                    <div className="w-2 h-2 rounded-full bg-energy"></div>
                    <span>5 שאלות קצרות, פחות מדקה</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <div className="w-2 h-2 rounded-full bg-energy"></div>
                    <span>תוצאה מותאמת אישית בסוף</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <div className="w-2 h-2 rounded-full bg-energy"></div>
                    <span>בלי מכירה, בלי ספאם, בלי שטויות</span>
                  </div>
                </div>

                <button 
                  onClick={handleStart}
                  className="btn-magnetic bg-energy text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)] inline-flex items-center gap-2 text-lg"
                >
                  <span>בוא נתחיל</span>
                  <ChevronLeft size={20} />
                </button>
              </motion.div>
            )}

            {/* Questions */}
            {currentStep >= 0 && currentStep < QUESTIONS.length && (
              <motion.div 
                key={`question-${currentStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-energy font-bold tracking-widest text-sm">שאלה {currentStep + 1} מתוך {QUESTIONS.length}</span>
                  {currentStep > 0 && (
                    <button onClick={() => setCurrentStep(prev => prev - 1)} className="text-text-muted hover:text-white flex items-center text-sm transition-colors">
                      <ChevronRight size={16} className="ml-1" /> חזור
                    </button>
                  )}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {QUESTIONS[currentStep].title}
                </h3>
                {QUESTIONS[currentStep].hint && (
                  <p className="text-text-muted mb-8 text-sm">{QUESTIONS[currentStep].hint}</p>
                )}
                
                <div className="space-y-3">
                  {QUESTIONS[currentStep].options.map((option) => {
                    const isSelected = answers[QUESTIONS[currentStep].id] === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleAnswer(QUESTIONS[currentStep].id, option.id)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-right
                          ${isSelected 
                            ? 'bg-energy/10 border-energy text-white shadow-[0_0_20px_rgba(255,77,0,0.15)]' 
                            : 'bg-white/5 border-white/10 text-text-muted hover:bg-white/10 hover:border-white/20 hover:text-white'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-energy bg-energy' : 'border-white/20'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-bg rounded-full"></div>}
                        </div>
                        <div>
                          <span className="text-lg font-medium block">{option.label}</span>
                          {option.desc && <span className="text-sm text-text-muted/80 block mt-0.5">{option.desc}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Lead Capture Step */}
            {currentStep === QUESTIONS.length && (
              <motion.div 
                key="lead"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-heading font-bold text-white mb-2">התוצאות שלך מוכנות</h3>
                  <p className="text-text-muted">השאר פרטים ותקבל את האבחון האישי שלך למייל</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">שם מלא</label>
                    <input required type="text" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors" placeholder="השם שלך" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">טלפון</label>
                    <input required type="tel" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors text-right" placeholder="050-0000000" dir="ltr" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted">אימייל</label>
                    <input required type="email" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors text-right" placeholder="your@email.com" dir="ltr" />
                  </div>
                  
                  <button type="submit" className="w-full btn-magnetic bg-energy text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)] mt-4">
                    קבל את התוצאות שלי
                  </button>
                  <p className="text-xs text-text-muted/60 text-center mt-4">הפרטים שלך לא יועברו לאף גורם חיצוני. ללא ספאם.</p>
                </form>
              </motion.div>
            )}

            {/* Calculating State */}
            {currentStep === QUESTIONS.length + 1 && (
              <motion.div 
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-energy rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">מנתח את התשובות שלך...</h3>
                <p className="text-text-muted">מתאים את האבחון המדויק עבורך</p>
              </motion.div>
            )}

            {/* Result Step */}
            {currentStep === QUESTIONS.length + 2 && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">
                    {leadData.name ? leadData.name.split(' ')[0] : 'היי'}, הנה מה שהאבחון מראה
                  </h3>
                </div>

                <div className={`border rounded-3xl p-8 mb-8 bg-bg relative overflow-hidden ${
                  result.color === 'red' ? 'border-red-500/30' : 
                  result.color === 'yellow' ? 'border-yellow-500/30' : 
                  'border-green-500/30'
                }`}>
                  <div className={`absolute top-0 right-0 w-full h-1 ${
                    result.color === 'red' ? 'bg-red-500' : 
                    result.color === 'yellow' ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}></div>
                  
                  <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest mb-6 ${
                    result.color === 'red' ? 'bg-red-500/10 text-red-500' : 
                    result.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-500' : 
                    'bg-green-500/10 text-green-500'
                  }`}>
                    {result.badge}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 leading-snug">{result.title}</h4>
                  <p className="text-text-muted leading-relaxed mb-8">{result.body}</p>
                  
                  <ul className="space-y-4">
                    {result.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-main/90 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                        <CheckCircle2 size={20} className={`shrink-0 mt-0.5 ${
                          result.color === 'red' ? 'text-red-500' : 
                          result.color === 'yellow' ? 'text-yellow-500' : 
                          'text-green-500'
                        }`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center bg-bg border border-white/5 rounded-3xl p-8">
                  <div className="text-xl font-bold text-white mb-3">הצעד הבא שלך</div>
                  <p className="text-text-muted mb-8 max-w-lg mx-auto">{result.cta}</p>
                  
                  <a 
                    href="#contact"
                    className="btn-magnetic bg-energy text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)] inline-block w-full sm:w-auto text-lg mb-4"
                  >
                    לקבוע שיחת ייעוץ איתי
                  </a>
                  
                  <p className="text-sm text-energy font-medium mb-2">
                    👩‍⚕️ דמי רצינות: 200₪ בלבד
                  </p>
                  <p className="text-xs text-text-muted/80 mb-6">שיחה של 10-15 דקות. בלי התחייבות. רק בדיקה אם זה מתאים.</p>
                  
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-sm text-text-muted/60 mb-1">לא מתאים לך עכשיו?</div>
                    <div className="text-sm text-energy font-medium">📱 אני אחזור אליך בוואטסאפ תוך 24 שעות עם הצעות נוספות</div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
