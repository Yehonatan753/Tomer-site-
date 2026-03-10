import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download } from 'lucide-react';
import { SITE_DATA } from '../data';

export default function Courses() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <section id="courses" className="py-32 px-6 md:px-16 lg:px-24 bg-bg relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="overflow-hidden pb-4">
              <motion.h2 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-heading font-bold text-text-main tracking-tighter mb-4"
              >
                קורסים <span className="text-energy italic font-light">והרצאות</span>
              </motion.h2>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.p 
                variants={itemVariants}
                className="text-xl text-text-muted max-w-lg"
              >
                ידע מבוסס מחקר, מונגש בצורה פרקטית וברורה.
              </motion.p>
            </div>
          </div>
          
          <div className="overflow-hidden pb-2">
            <motion.button 
              variants={itemVariants}
              className="text-energy font-medium border-b border-energy pb-1 hover:text-energy-light transition-colors self-start md:self-auto"
            >
              צפה בכל הקורסים
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col relative">
          {/* Cursor Follower */}
          <div 
            className={`cursor-follower ${hoveredCourse !== null ? 'visible' : ''}`}
            style={{
              transform: `translate(${cursorPos.x - 160}px, ${cursorPos.y - 110}px) scale(${hoveredCourse !== null ? 1 : 0.8}) rotate(${hoveredCourse !== null ? '-2deg' : '0deg'})`,
              backgroundImage: hoveredCourse !== null ? `url(${SITE_DATA.courses[hoveredCourse].image})` : 'none'
            }}
          />

          {SITE_DATA.courses.map((course, idx) => (
            <motion.a
              href="#contact"
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredCourse(idx)}
              onMouseLeave={() => setHoveredCourse(null)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-10 border-b border-white/10 hover:border-energy/30 transition-colors cursor-pointer relative z-10"
            >
              <div className="flex flex-col gap-2 mb-4 sm:mb-0 transition-transform duration-500 ease-out group-hover:-translate-x-4">
                <span className="text-sm font-medium text-energy tracking-wider uppercase">
                  {course.type}
                </span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-text-main group-hover:text-energy transition-colors duration-300">
                  {course.title}
                </h3>
                {course.freeValue && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('openDownloadPopup', { detail: { resourceName: course.freeValue } }));
                    }}
                    className="flex items-center gap-2 mt-2 text-sm text-text-muted hover:text-energy transition-colors text-right"
                  >
                    <Download size={14} className="text-energy" />
                    <span>{course.freeValue}</span>
                  </button>
                )}
              </div>
              
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-energy group-hover:border-energy group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-2">
                <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
