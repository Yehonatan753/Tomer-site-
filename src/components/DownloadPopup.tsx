import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function DownloadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [resourceName, setResourceName] = useState('');

  useEffect(() => {
    const handleOpenDownload = (e: CustomEvent) => {
      setResourceName(e.detail.resourceName);
      setIsOpen(true);
      setHasSubmitted(false);
    };

    window.addEventListener('openDownloadPopup', handleOpenDownload as EventListener);
    return () => window.removeEventListener('openDownloadPopup', handleOpenDownload as EventListener);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Download requested:', { ...formData, resourceName });
    setHasSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-bg border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="h-32 bg-gradient-to-br from-energy to-orange-600 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/image7.jpg')] mix-blend-overlay opacity-30 bg-cover bg-center"></div>
              <FileText size={48} className="text-white relative z-10" />
            </div>

            <div className="p-8">
              {!hasSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      קבלת גישה ל: {resourceName}
                    </h3>
                    <p className="text-text-muted text-sm">
                      השאר פרטים והקובץ יישלח אליך למייל באופן מיידי.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors" 
                        placeholder="שם פרטי" 
                      />
                    </div>
                    <div>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-energy transition-colors text-right" 
                        placeholder="your@email.com" 
                        dir="ltr" 
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full btn-magnetic bg-energy text-white px-8 py-4 rounded-xl font-bold shadow-[0_10px_30px_-10px_rgba(255,77,0,0.4)] flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      <span>שלח לי את הקובץ</span>
                    </button>
                    <p className="text-xs text-text-muted/50 text-center mt-3">
                      אני שונא ספאם בדיוק כמוך. הפרטים שלך בטוחים אצלי.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">נשלח בהצלחה!</h3>
                  <p className="text-text-muted">
                    הקובץ בדרך למייל שלך. בדוק גם בתיקיית קידומי מכירות או ספאם.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
