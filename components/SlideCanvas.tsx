import React, { forwardRef } from "react";
import { SlideData, ThemeColors } from "../types";
import { Instagram, Linkedin, Mail } from "lucide-react";

interface Props {
  data: SlideData;
  theme: ThemeColors;
}

const SlideCanvas = forwardRef<HTMLDivElement, Props>(
  ({ data, theme }, ref) => {
    const canvasId = `canvas-${data.id.replace(/\./g, "-")}`;

    return (
      <div
        ref={ref}
        id={canvasId}
        className="poster-root relative w-full flex flex-col arabic-text-fix"
        style={{
          backgroundColor: theme.background,
          fontFamily: "var(--arabic-font)",
          minHeight: "625px",
          height: "auto",
          overflow: "visible",
        }}
      >
        <style>
          {`
          #${canvasId} .poster-name {
            font-weight: 900;
            line-height: 1.2 !important;
            font-size: 32px !important;
            padding: 8px 0 !important;
            letter-spacing: -0.02em;
          }
          #${canvasId} .poster-title {
            font-weight: 600;
            line-height: 1.4 !important;
            font-size: 13px !important;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            opacity: 0.9;
          }
          #${canvasId} .poster-subtitle {
            font-weight: 400;
            line-height: 1.7 !important;
            font-size: 13px !important;
            padding: 4px 20px !important;
            opacity: 0.85;
          }
          #${canvasId} .poster-headline {
            font-weight: 700;
            line-height: 1.5 !important;
            font-size: 17px !important;
            padding: 4px 12px 4px 4px !important;
            letter-spacing: -0.01em;
          }
          #${canvasId} .poster-item-text {
            font-weight: 400;
            line-height: 1.7 !important;
            font-size: 13px !important;
          }

          #${canvasId} .section-title {
            font-weight: 700;
            color: ${theme.primary};
          }

          ${data.customCss || ""}
        `}
        </style>

        {/* الرأس والصورة - Modern Header with Gradient Overlay */}
        <div className="relative h-[320px] w-full poster-header shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={data.profileImage}
              alt={data.name || "User"}
              className="w-full h-full object-cover grayscale-[0.05]"
              crossOrigin="anonymous"
            />
            {/* Modern gradient overlay */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}40 0%, ${theme.primary}20 50%, transparent 100%)`,
              }}
            />
            {/* Soft gradient from primary color */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-25 pointer-events-none blur-3xl"
              style={{
                background: `radial-gradient(circle at top right, ${theme.primary} 0%, transparent 70%)`,
              }}
            />
            {/* Subtle top-to-bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* الشعار - Modern Logo Badge */}
          {data.logo && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-white/95 backdrop-blur-xl px-4 py-3 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/60">
                <img
                  src={data.logo}
                  alt="Logo"
                  className="max-h-10 w-auto object-contain"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          )}

          {/* بطاقة الهوية المركزية - Modern Card Design */}
          <div className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 w-[90%] z-10">
            <div
              className="rounded-[32px] p-7 text-white text-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] backdrop-blur-sm"
              style={{ 
                backgroundColor: theme.primary,
                backgroundImage: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`
              }}
            >
              <p className="poster-title mb-1.5">{data.title}</p>
              <h2 className="poster-name mb-2.5">{data.name}</h2>
              <p className="poster-subtitle">{data.subtitle}</p>
            </div>
          </div>
        </div>

        {/* مساحة فاصلة للبطاقة */}
        <div className="h-[85px] shrink-0" />

        {/* منطقة المحتوى - Modern Content Area */}
        <div className="flex-grow px-9 py-8">
          <div className="flex flex-col gap-8">
            {data.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                {/* Section Header with Modern Indicator */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="h-7 w-2 rounded-full shadow-sm"
                    style={{ 
                      backgroundColor: theme.primary,
                      boxShadow: `0 2px 8px ${theme.primary}40`
                    }}
                  />
                  <h3 className="poster-headline section-title">
                    {section.title}
                  </h3>
                </div>
                {/* Modern Bullet Points */}
                <ul className="space-y-3.5 pr-4">
                  {section.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3.5 items-start text-gray-700"
                    >
                      <span
                        className="mt-2 w-2 h-2 shrink-0 rounded-full shadow-sm"
                        style={{ 
                          backgroundColor: theme.secondary,
                          opacity: 0.8
                        }}
                      />
                      <span className="flex-1 poster-item-text leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* التذييل الحديث - Modern Footer */}
        <div
          className="poster-footer w-full py-3 px-9 text-white flex justify-between items-center text-[10px] shrink-0 mt-2 border-t border-white/15"
          style={{ 
            backgroundColor: theme.primary,
            backgroundImage: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 100%)`
          }}
          dir="rtl"
        >
          <div className="footer-right flex-1 text-right">
            <span className="font-bold text-xs tracking-wide">منصة التاجر الرقمية</span>
          </div>
          <div className="footer-left flex-1 text-left" dir="ltr">
            <span className="font-mono font-bold tracking-wider opacity-90">
              al-tajer.digital
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default SlideCanvas;
