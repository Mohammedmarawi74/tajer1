import React, { forwardRef } from 'react';
import { SlideData, ThemeColors } from '../types';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface Props {
  data: SlideData;
  theme: ThemeColors;
}

const SlideCanvas = forwardRef<HTMLDivElement, Props>(({ data, theme }, ref) => {
  const canvasId = `canvas-${data.id.replace(/\./g, '-')}`;

  return (
    <div 
      ref={ref}
      id={canvasId}
      className="poster-root relative w-full flex flex-col arabic-text-fix"
      style={{ 
        backgroundColor: theme.background,
        fontFamily: "'IBM Plex Sans Arabic', sans-serif",
        minHeight: '625px',
        height: 'auto',
        overflow: 'visible'
      }}
    >
      <style>
        {`
          #${canvasId} .poster-name { 
            font-weight: 900; 
            line-height: 1.2 !important; 
            font-size: 32px !important; /* تقريب لـ 36px لتناسب عرض 500px */
            padding: 8px 0 !important;
          }
          #${canvasId} .poster-title { 
            font-weight: 700; 
            line-height: 1.2 !important; 
            font-size: 14px !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          #${canvasId} .poster-subtitle { 
            font-weight: 400; 
            line-height: 1.6 !important; 
            font-size: 14px !important;
            padding: 4px 20px !important;
            opacity: 0.9;
          }
          #${canvasId} .poster-headline { 
            font-weight: 700; 
            line-height: 1.4 !important; 
            font-size: 18px !important; /* كما هو مطلوب 18px */
            padding: 4px 12px 4px 4px !important;
          }
          #${canvasId} .poster-item-text { 
            font-weight: 400; 
            line-height: 1.6 !important;
            font-size: 13px !important; /* موازنة للنصوص الطويلة */
          }
          
          #${canvasId} .section-title {
            font-weight: 700;
            color: ${theme.primary};
          }

          ${data.customCss || ''}
        `}
      </style>

      {/* الرأس والصورة */}
      <div className="relative h-[320px] w-full poster-header shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={data.profileImage} 
            alt={data.name || 'User'} 
            className="w-full h-full object-cover grayscale-[0.05]"
            crossOrigin="anonymous"
          />
          <div 
            className="absolute top-0 right-0 w-80 h-80 opacity-30 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at top right, ${theme.primary} 0%, transparent 70%)` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* الشعار */}
        {data.logo && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
            <img
              src={data.logo}
              alt="Logo"
              className="max-h-14 w-auto object-contain drop-shadow-2xl bg-white/30 backdrop-blur-lg p-2 rounded-2xl border border-white/40"
              crossOrigin="anonymous"
            />
          </div>
        )}

        {/* بطاقة الهوية المركزية */}
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[92%] z-10">
          <div 
            className="rounded-[24px] p-8 text-white text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
            style={{ backgroundColor: theme.primary }}
          >
            <p className="poster-title mb-1">{data.title}</p>
            <h2 className="poster-name mb-2">{data.name}</h2>
            <p className="poster-subtitle">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* مساحة فاصلة للبطاقة */}
      <div className="h-[90px] shrink-0" />

      {/* منطقة المحتوى - تمدد تلقائي بالكامل */}
      <div className="flex-grow px-10 py-10">
        <div className="flex flex-col gap-10">
          {data.sections.map((section) => (
            <div key={section.id} className="space-y-5">
              <div className="flex items-center gap-4">
                 <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                 <h3 className="poster-headline section-title">
                   {section.title}
                 </h3>
              </div>
              <ul className="space-y-4 pr-5">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-gray-800">
                    <span 
                      className="mt-2.5 w-2 h-2 shrink-0 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.secondary }}
                    />
                    <span className="flex-1 poster-item-text leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* التذييل الاحترافي */}
      <div
        className="poster-footer w-full py-6 px-10 text-white flex justify-between items-center text-[11px] shrink-0 mt-8 border-t border-white/10"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="footer-right">
          <span className="font-bold text-sm">منصة المستثمر الاقتصادية</span>
        </div>
        <div className="footer-left">
          <span className="font-mono font-bold tracking-wider">al-investor.com</span>
        </div>
      </div>
    </div>
  );
});

export default SlideCanvas;