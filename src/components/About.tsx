import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-energy/20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/5]"
            >
              <img 
                src="/image5.jpg" 
                alt="תומר פרידמן - תזונאי קליני וספורט"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent"></div>

              {/* Floating Insurance Badge */}
              <div className="absolute bottom-8 right-8 bg-surface/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">החזרים מחברות הביטוח</p>
                  <p className="text-xs text-text-muted">כפוף לפוליסה האישית</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block font-heading text-sm font-bold tracking-widest text-energy uppercase mb-4">הסיפור מאחורי השיטה</span>
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-8 text-white">
              נעים מאוד, <span className="text-energy">תומר פרידמן</span>
            </h2>

            <div className="space-y-6 text-lg text-text-muted mb-10 leading-relaxed">
              <p>
                אני תזונאי קליני וספורט, ואני מלווה מאות מתאמנים, ספורטאים ואנשים שפשוט רוצים להיראות ולהרגיש הכי טוב שאפשר.
                לא תמצאו אצלי פתרונות קסם. אין לי תפריט הדפסה שתלוי על המקרר.
              </p>
              <p>
                <strong className="text-white font-medium">הגישה שלי שונה.</strong> אני מאמין בדיוק מדעי, בהתאמה אישית מלאה ובבניית הרגלים לטווח ארוך.
                דיאטות מהירות נכשלות כי הן דורשות ממך להילחם בעצמך כל יום מחדש. המערכת שאנחנו בונים ביחד מנצחת את משחק המשמעת העצמית.
              </p>
              <p>
                בתור עצמאי שעובד לבד, <span className="text-white border-b border-energy pb-0.5">אתם לא עוברים דרך מערך מתמחים.</span> אני זה שמנתח את הנתונים, אני זה שעונה בטלפון, ואני זה שבודק כל מדד וכל שקילה.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="font-heading font-black text-4xl text-white">500+</span>
                <span className="text-sm text-text-muted uppercase tracking-wider">לקוחות מרוצים</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-4xl text-white">B.Sc</span>
                <span className="text-sm text-text-muted uppercase tracking-wider">מדעי התזונה</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
