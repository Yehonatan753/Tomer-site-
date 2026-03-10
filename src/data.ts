/**
 * Tomer Fridman Nutritionist - Backend Data Store
 * This file contains all the structured data for services, pricing, courses, and site configuration.
 * Separating this ensures the HTML UI can easily map to this data, and it acts as a single source of truth.
 */

export const SITE_DATA = {
  profile: {
      name: "תומר פרידמן",
      title: "תזונאי קליני וספורט",
      email: "tf.nutritionist@gmail.com",
      phone: "054-669-9574",
      phoneInternational: "+972546699574",
      hours: "א׳-ה׳ 10:00 - 19:00",
      socials: {
          instagram: "https://www.instagram.com/tommy_fridman/",
          youtube: "https://www.youtube.com/channel/UCSvq2JfGK-oEXk5TGPC_nDA",
          facebook: "https://www.facebook.com/people/%D7%AA%D7%95%D7%9E%D7%A8-%D7%A4%D7%A8%D7%99%D7%93%D7%9E%D7%9F-%D7%AA%D7%96%D7%95%D7%A0%D7%90%D7%99-%D7%A7%D7%9C%D7%99%D7%A0%D7%99-%D7%95%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%95%D7%9E%D7%90%D7%9E%D7%9F-%D7%9B%D7%95%D7%A9%D7%A8/100047997926036/",
          whatsapp: "https://api.whatsapp.com/send?phone=972546699574",
          linkedin: "https://www.linkedin.com/in/tomer-fridman-a5101694/%20"
      }
  },

  hero: {
      eyebrow: "דיאטות לא עובדות. משמעת עצמית נגמרת.",
      badge: "הגיע הזמן למערכת שעובדת בשבילך",
      description: "אני לא מחלק תפריטים גנריים. אני בונה מערכת תזונה ואימונים מותאמת אישית, מבוססת מדע, שמשתלבת בחיים שלך ולא להפך. המטרה? תוצאות שנשארות לתמיד."
  },

  philosophy: [
      {
          id: "nutrition",
          title: "תזונה",
          icon: "dna",
          description: "החלק העיקרי והמשמעותי ביותר בהשגת כל מטרה. ביכולתה של תזונתנו להפחית סיכון למחלות ולשמש כחלק מהכלים בטיפול בהם.",
          bullets: [
              "פרקטיקה מבוססת מחקר וידע עדכני.",
              "התאמה אישית לגנטיקה, בריאות והעדפות."
          ]
      },
      {
          id: "training",
          title: "פעילות גופנית",
          icon: "barbell",
          description: "המרכיב המשלים המוביל לשיפור אדיר באיכות החיים. הקפדה על תכנית המותאמת אישית יוצרת סינרגיה מושלמת להשגת יעדים קליניים ואסתטיים.",
          bullets: [
              "התאמה לפיזולוגיה ומגבלות המתאמן.",
              "תקופתיות באימונים (Periodization) מתקדמת."
          ]
      }
  ],

  services: {
      categories: ["אונליין", "פרונטלי", "ייעוץ טלפוני"],

      online: [
          {
              id: "online-nf",
              title: "תזונה בלבד (NF)",
              description: "מעקב חודשי שוטף דרך האתר / המייל",
              isPopular: false,
              pricing: [
                  { period: "1 חודש", price: 1200 },
                  { period: "3 חודשים", price: 2580 },
                  { period: "6 חודשים", price: 4200 }
              ]
          },
          {
              id: "online-nt",
              title: "תזונה ותכנית אימונים (N&T)",
              description: "מעטפת שלמה להשגת תוצאות מקסימליות משני העולמות",
              isPopular: true,
              pricing: [
                  { period: "1 חודש", price: 1620 },
                  { period: "3 חודשים", price: 3660 },
                  { period: "6 חודשים", price: 6480 }
              ]
          }
      ],

      frontal: [
          {
              id: "frontal-nf",
              title: "תזונה בלבד (NF)",
              description: "מפגש כל 2-3 שבועות בקליניקה",
              isPopular: false,
              pricing: [
                  { period: "4 מפגשים", price: 4200 },
                  { period: "8 מפגשים", price: 6240 }
              ]
          },
          {
              id: "frontal-nt",
              title: "תזונה ואימונים (N&T)",
              description: "המקיף ביותר - לליווי מקצועי צמוד",
              isPopular: true,
              pricing: [
                  { period: "4 מפגשים", price: 5580 },
                  { period: "8 מפגשים", price: 8580 }
              ]
          },
          {
              id: "frontal-mfu",
              title: "מדידות מעקב (MFU)",
              description: "לשמירה על תוצאות - 3/4 דקות פגישה",
              isPopular: false,
              pricing: [
                  { period: "4 קפיצות מדידה", price: 520 }
              ]
          }
      ],

      phone: {
          title: "ייעוץ טלפוני ממוקד",
          description: "יש לך שאלות נקודתיות? אפשר לתאם שיחה מראש לייעוץ קצר וקולע ולחסוך זמן יקר.",
          basePrice: { minutes: 10, price: 200 },
          additionalMinutePrice: 20
      }
  },

  courses: [
      {
          id: "course-sports-nutrition",
          title: "תזונת ספורט - בסיס העקרונות במאמץ פיזיולוגי",
          type: "Masterclass",
          image: "/image9.jpg",
          freeValue: "הורד סיכום הרצאה חינם"
      },
      {
          id: "course-supplements",
          title: "תוספי תזונה אפקטיביים להיפרטרופיה ושיפור ביצועים",
          type: "Seminar",
          image: "/image10.jpg",
          freeValue: "קבל רשימת תוספים מומלצת"
      },
      {
          id: "course-iifym",
          title: "גמישות תזונתית - IIFYM (If It Fits Your Macros)",
          type: "Workshop",
          image: "/image11.jpg",
          freeValue: "מחשבון מאקרו חינמי"
      },
      {
          id: "course-myths",
          title: "מיתוסים בעולם התזונה במאבחן מבוסס ראיות",
          type: "Lecture",
          image: "/image12.jpg",
          freeValue: "מדריך ניפוץ מיתוסים"
      }
  ],

  testimonials: [
      {
          id: 1,
          name: "שם לקוח/ה",
          text: "התהליך עם תומר שינה לי את החיים. מעבר לתוצאות הפיזיות, למדתי איך לאכול נכון ולהתאמן חכם בלי לסבול.",
          result: "ירידה של 10 ק״ג"
      },
      {
          id: 2,
          name: "שם לקוח/ה",
          text: "תומר מקצועי ברמות הכי גבוהות שיש. התפריט היה מותאם בדיוק לאורח החיים העמוס שלי, והתוצאות לא איחרו לבוא.",
          result: "חיטוב וירידה באחוזי שומן"
      },
      {
          id: 3,
          name: "שם לקוח/ה",
          text: "בתור ספורטאי, התזונה היא קריטית. תומר עזר לי לדייק את התזונה לפני ואחרי אימונים, והביצועים שלי השתפרו משמעותית.",
          result: "שיפור ביצועים"
      },
      {
          id: 4,
          name: "שם לקוח/ה",
          text: "הייתי סקפטי בהתחלה, אבל הגישה המדעית של תומר הוכיחה את עצמה. לא עוד דיאטות כסאח, אלא שינוי אמיתי באורח החיים.",
          result: "ירידה של 15 ק״ג"
      },
      {
          id: 5,
          name: "שם לקוח/ה",
          text: "האפליקציה פשוט גאונית! הכל מרוכז במקום אחד, קל לעקוב אחרי התפריט והאימונים, ותומר תמיד זמין לכל שאלה.",
          result: "עלייה במסת שריר"
      },
      {
          id: 6,
          name: "שם לקוח/ה",
          text: "אחרי שנים של תסכול מדיאטות שלא עובדות, סוף סוף מצאתי מסגרת שמתאימה לי. תומר מבין עניין ויודע להתאים את התהליך אישית.",
          result: "ירידה של 8 ק״ג ושיפור במדדים"
      }
  ],

  appShowcase: {
      title: "שליטה מלאה בכף היד שלך",
      subtitle: "התפריט, תכנית האימונים והמעקב - הכל באפליקציה אחת נוחה וזמינה בכל מקום ובכל זמן.",
      features: [
          {
              title: "תפריט תזונה דינמי",
              description: "גישה נוחה לתפריט היומי, תחליפי מזון ומתכונים בלחיצת כפתור.",
              icon: "utensils"
          },
          {
              title: "תכנית אימונים חכמה",
              description: "מעקב אחר משקלים, סרטוני הדרכה לתרגילים ורישום התקדמות.",
              icon: "dumbbell"
          },
          {
              title: "מעקב מדדים והתקדמות",
              description: "גרפים ברורים המציגים את הירידה במשקל, אחוזי השומן והיקפים.",
              icon: "line-chart"
          },
          {
              title: "קשר ישיר וזמינות",
              description: "צ'אט מובנה לשאלות, התייעצויות ועדכונים שוטפים בזמן אמת.",
              icon: "message-circle"
          }
      ]
  },

  faq: [
      {
          question: "האם התהליך מתאים גם למי שלא מתאמן?",
          answer: "בהחלט. התזונה היא המפתח העיקרי לשינוי הרכב הגוף והבריאות. גם ללא אימונים, נבנה תפריט שיביא אותך לתוצאות."
      },
      {
          question: "מה קורה אם אני טס לחו״ל או יוצא לחופשה?",
          answer: "השיטה שלי דוגלת בגמישות. תקבל כלים איך להתמודד עם חופשות, מסעדות ואירועים, כדי שתוכל ליהנות בלי להרוס את ההתקדמות."
      },
      {
          question: "האם אני חייב לאכול מאכלים שאני לא אוהב?",
          answer: "ממש לא. התפריט נבנה סביב ההעדפות האישיות שלך. אם לא תאהב את האוכל, לא תתמיד בו. אנחנו נמצא את השילוב המנצח עבורך."
      },
      {
          question: "תוך כמה זמן אראה תוצאות?",
          answer: "זה משתנה מאדם לאדם, אבל רוב הלקוחות שלי מרגישים הבדל באנרגיה כבר בשבוע הראשון, ורואים שינוי ויזואלי תוך 2-4 שבועות."
      },
      {
          question: "האם יש החזרים מקופות החולים?",
          answer: "כן, בהתאם לפוליסת הביטוח האישית שלך. אני מספק קבלות מוכרות שניתן להגיש לחברות הביטוח ולקופות החולים לקבלת החזר."
      },
      {
          question: "איך עובד מסלול האונליין?",
          answer: "לאחר שיחת אפיון ומילוי שאלון מקיף, אני בונה עבורך תוכנית תזונה ואימונים. המעקב מתבצע דרך האפליקציה שלי, עם שקילות שבועיות וזמינות מלאה לשאלות."
      },
      {
          question: "האם אפשר לשנות מסלול באמצע התהליך?",
          answer: "כן, ניתן לעבור ממסלול אונליין לפרונטלי או להפך, בהתאם לזמינות ולצרכים המשתנים שלך."
      }
  ]
};
