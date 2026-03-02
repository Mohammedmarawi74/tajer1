import React, { useState, useMemo, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import SlideCanvas from './components/SlideCanvas';
import { INITIAL_SLIDE, THEME_COLORS } from './constants';
import { SlideData, ThemeColors } from './types';
import { Download, LayoutPanelLeft, Plus, ChevronRight, ChevronLeft, Loader2, Menu, Search } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

const App: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([INITIAL_SLIDE]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [themeKey, setThemeKey] = useState<keyof typeof THEME_COLORS>('investor');
  const [isPreview, setIsPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const [isUsingCustom, setIsUsingCustom] = useState(false);
  const [customTheme, setCustomTheme] = useState<ThemeColors>({
    primary: '#2dd4bf',
    secondary: '#134e4a',
    accent: '#5eead4',
    background: '#ffffff',
    text: '#111827'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentSlide = slides[activeIndex] || INITIAL_SLIDE;

  const effectiveTheme = useMemo(() => {
    if (isUsingCustom) return customTheme;
    return THEME_COLORS[themeKey] || THEME_COLORS.investor;
  }, [isUsingCustom, themeKey, customTheme]);

  const updateCurrentSlide = useCallback((newData: SlideData) => {
    setSlides(prev => {
      const newSlides = [...prev];
      newSlides[activeIndex] = newData;
      return newSlides;
    });
  }, [activeIndex]);

  const addSlide = () => {
    const newSlide = { 
      ...INITIAL_SLIDE, 
      id: Math.random().toString(), 
      name: `شريحة ${slides.length + 1}`,
      sections: [],
      customCss: ''
    };
    setSlides([...slides, newSlide]);
    setActiveIndex(slides.length);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    setIsDownloading(true);
    
    try {
      // 1. التمهيد: وقت إضافي لضمان استقرار العناصر
      await new Promise(resolve => setTimeout(resolve, 1200));

      // 2. التحقق من صحة الاسم (تجنب trim على undefined)
      const slideName = currentSlide?.name ? String(currentSlide.name) : 'تصميم';
      const safePrefix = slideName.substring(0, 15).trim().replace(/\s+/g, '-') || 'slide';

      // 3. خيارات تصدير محسنة لتجنب أخطاء CSS الداخلية في المكتبة
      const options = {
        pixelRatio: 2, // تقليل النسبة قليلاً لضمان الاستقرار (2 كافية جداً)
        backgroundColor: effectiveTheme.background,
        cacheBust: true,
        // هذا الإعداد يمنع الخطأ "trim of undefined" الذي يحدث غالباً عند محاولة معالجة الخطوط الخارجية
        fontEmbedCSS: '', 
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          display: 'flex',
          height: 'auto',
          width: '500px'
        },
      };

      // 4. استخدام toPng مع فلتر لاستبعاد أي عناصر قد تسبب مشاكل
      const dataUrl = await htmlToImage.toPng(canvasRef.current, options);
      
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('فشل توليد محتوى الصورة');
      }

      const link = document.createElement('a');
      link.download = `Carousel-${safePrefix}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err: any) {
      console.error('Download error:', err);
      
      // 5. محاولة بديلة في حالة الفشل (Fallback)
      try {
        const fallbackUrl = await htmlToImage.toPng(canvasRef.current!, {
          skipFonts: true, // تخطي الخطوط كلياً كحل أخير
          pixelRatio: 1,
          cacheBust: true
        });
        const link = document.createElement('a');
        link.download = `تصميم-سريع-${Date.now()}.png`;
        link.href = fallbackUrl;
        link.click();
      } catch (innerErr) {
        alert('حدث خطأ تقني غير متوقع. يرجى تجربة تحديث الصفحة أو استخدام متصفح آخر.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0c] overflow-hidden text-white font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {!isPreview && isSidebarOpen && (
        <Sidebar 
          slide={currentSlide} 
          setSlide={updateCurrentSlide} 
          currentThemeKey={themeKey}
          setThemeKey={setThemeKey}
          customTheme={customTheme}
          setCustomTheme={setCustomTheme}
          isUsingCustom={isUsingCustom}
          setIsUsingCustom={setIsUsingCustom}
        />
      )}

      <main className="flex-1 flex flex-col items-center p-8 overflow-y-auto relative bg-[#0f0f12] custom-scrollbar">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none opacity-40" />

        <header className="w-full max-w-5xl flex justify-between items-center mb-10 bg-[#18181b]/95 backdrop-blur-2xl p-5 px-10 rounded-[32px] border border-white/10 z-20 shadow-2xl shrink-0">
          {/* Right side - Hamburger Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-white/10 rounded-xl text-emerald-400 transition-all hover:scale-110"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3 bg-emerald-500/20 px-5 py-2.5 rounded-2xl text-emerald-400 border border-emerald-500/30">
              <LayoutPanelLeft size={22} />
              <span className="text-sm font-black uppercase tracking-widest">منصة التصميم</span>
            </div>
          </div>

          {/* Center - Slide Navigation */}
          <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
             <button
              onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="p-2.5 hover:bg-white/10 rounded-xl disabled:opacity-20 text-emerald-400 transition-all hover:scale-110"
             >
               <ChevronRight size={24} />
             </button>
             <span className="text-sm font-black text-gray-200 min-w-[4rem] text-center font-mono">
               {activeIndex + 1} / {slides.length}
             </span>
             <button
              onClick={() => setActiveIndex(Math.min(slides.length - 1, activeIndex + 1))}
              disabled={activeIndex === slides.length - 1}
              className="p-2.5 hover:bg-white/10 rounded-xl disabled:opacity-20 text-emerald-400 transition-all hover:scale-110"
             >
               <ChevronLeft size={24} />
             </button>
          </div>

          {/* Left side - Search and Actions */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="بحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-32"
              />
            </div>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`px-8 py-3 rounded-2xl text-sm font-black transition-all border ${
                isPreview
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/15'
              }`}
            >
              {isPreview ? 'الوضع التحريري' : 'عرض المعاينة'}
            </button>
            
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-3 px-10 py-3.5 bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-[0_15px_35px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Download size={20} />
              )}
              {isDownloading ? 'جاري التجهيز...' : 'حفظ كـ PNG'}
            </button>
          </div>
        </header>

        <div 
          className={`relative transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isPreview ? 'scale-[1.02] shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)]' : 'scale-[0.95] shadow-2xl'
          } rounded-[32px] border border-white/10 mb-20 overflow-visible`}
          style={{ width: 'min(100%, 500px)', height: 'auto' }}
        >
          <SlideCanvas 
            ref={canvasRef}
            data={currentSlide} 
            theme={effectiveTheme} 
          />
        </div>

        {!isPreview && (
          <button 
            onClick={addSlide}
            className="mb-20 flex items-center gap-4 px-10 py-4 bg-[#1e293b] text-emerald-400 rounded-3xl text-sm font-black border border-emerald-500/20 hover:bg-[#2d3748] hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all group"
          >
            <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" />
            إضافة شريحة جديدة
          </button>
        )}
      </main>
    </div>
  );
};

export default App;