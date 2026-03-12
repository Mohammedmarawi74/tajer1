
import React, { useState, useRef } from 'react';
import { SlideData, ThemeColors } from '../types';
import { THEME_COLORS, CSS_SNIPPETS } from '../constants';
import { enhanceText } from '../services/geminiService';
import { Sparkles, Trash2, Plus, Upload, Palette, Type, Code2, UserCircle, RefreshCcw, Pipette, Image as ImageIcon } from 'lucide-react';
import './Sidebar.styles.css';

interface Props {
  slide: SlideData;
  setSlide: (data: SlideData) => void;
  currentThemeKey: keyof typeof THEME_COLORS;
  setThemeKey: (key: keyof typeof THEME_COLORS) => void;
  customTheme: ThemeColors;
  setCustomTheme: (theme: ThemeColors) => void;
  isUsingCustom: boolean;
  setIsUsingCustom: (val: boolean) => void;
}

type TabType = 'intelligence' | 'text' | 'design' | 'custom';

const Sidebar: React.FC<Props> = ({
  slide,
  setSlide,
  currentThemeKey,
  setThemeKey,
  customTheme,
  setCustomTheme,
  isUsingCustom,
  setIsUsingCustom
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Predefined logos list
  const PREDEFINED_LOGOS = [
    '/logos/logo-1.png',
    '/logos/logo-2.png',
    '/logos/logo-3.png',
    '/logos/logo-4.png',
  ];

  const handleUpdate = (updates: Partial<SlideData>) => {
    setSlide({ ...slide, ...updates });
  };

  const handleAIImprove = async (field: 'name' | 'title' | 'subtitle') => {
    setIsEnhancing(field);
    const newVal = await enhanceText(slide[field]);
    handleUpdate({ [field]: newVal });
    setIsEnhancing(null);
  };

  const handleSectionUpdate = (secId: string, updates: any) => {
    const newSections = slide.sections.map(s => s.id === secId ? { ...s, ...updates } : s);
    setSlide({ ...slide, sections: newSections });
  };

  const addSection = () => {
    const newSec = { id: Math.random().toString(), title: 'عنوان جديد', items: ['نقطة جديدة'] };
    setSlide({ ...slide, sections: [...slide.sections, newSec] });
  };

  const removeSection = (id: string) => {
    setSlide({ ...slide, sections: slide.sections.filter(s => s.id !== id) });
  };

  const addSnippet = (snippetCode: string) => {
    const currentCss = slide.customCss || '';
    setSlide({ ...slide, customCss: currentCss + '\n' + snippetCode });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar-container">
      {/* Navigation Tabs - Modern Design */}
      <div className="nav-tabs">
        <button
          onClick={() => setActiveTab('intelligence')}
          className={`nav-tab-button ${activeTab === 'intelligence' ? 'active' : ''}`}
        >
          <Sparkles size={18} />
          <span>الذكاء</span>
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`nav-tab-button ${activeTab === 'text' ? 'active' : ''}`}
        >
          <Type size={18} />
          <span>النصوص</span>
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`nav-tab-button ${activeTab === 'design' ? 'active' : ''}`}
        >
          <Palette size={18} />
          <span>التصميم</span>
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`nav-tab-button ${activeTab === 'custom' ? 'active' : ''}`}
        >
          <Code2 size={18} />
          <span>تخصيص</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-custom">
        {activeTab === 'text' && (
          <>
            <section className="section-spacing-xs">
              <div className="section-header">
                <UserCircle className="text-blue-500" size={20} />
                <h3 className="section-title">الهوية الشخصية</h3>
              </div>
              <div className="space-y-2">
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  value={slide.name}
                  onChange={(e) => handleUpdate({ name: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <label className="form-label">اللقب / الوظيفة</label>
                <div className="relative">
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                    className="form-input-rtl"
                  />
                  <button
                    onClick={() => handleAIImprove('title')}
                    disabled={isEnhancing === 'title'}
                    className="ai-enhance-btn"
                  >
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-2 mt-4">
                <label className="form-label">شعار المنصة (Logo)</label>

                {/* Predefined Logos Grid */}
                <div className="logo-grid">
                  {PREDEFINED_LOGOS.map((logoSrc, index) => (
                    <button
                      key={index}
                      onClick={() => handleUpdate({ logo: logoSrc })}
                      className={`logo-option ${slide.logo === logoSrc ? 'selected' : ''}`}
                    >
                      <img src={logoSrc} alt={`Logo ${index + 1}`} className="logo-option-img" />
                      {slide.logo === logoSrc && (
                        <div className="logo-checkmark">✓</div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Logo Upload */}
                <div className="flex items-center gap-2 my-2">
                  <div className="divider-line flex-1"></div>
                  <span className="text-xs text-gray-400">أو</span>
                  <div className="divider-line flex-1"></div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="logo-upload-btn"
                  >
                    {slide.logo && !PREDEFINED_LOGOS.includes(slide.logo) ? (
                      <img src={slide.logo} alt="Preview" className="h-5 w-auto object-contain" />
                    ) : (
                      <ImageIcon size={16} className="text-blue-500" />
                    )}
                    <span>{slide.logo ? 'تغيير الشعار' : 'رفع شعار'}</span>
                  </button>
                  {slide.logo && (
                    <button
                      onClick={() => handleUpdate({ logo: '' })}
                      className="logo-remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </section>

            <hr className="divider" />

            <section className="section-spacing-sm">
              <div className="section-actions">
                <h3 className="section-title-bold">الأقسام والمحتوى</h3>
                <button
                  onClick={addSection}
                  className="add-section-btn"
                >
                  <Plus size={12} /> إضافة قسم
                </button>
              </div>
              {slide.sections.map((section) => (
                <div key={section.id} className="section-card">
                  <button
                    onClick={() => removeSection(section.id)}
                    className="section-remove-btn"
                  >
                    <Trash2 size={12} />
                  </button>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(section.id, { title: e.target.value })}
                    className="section-title-input"
                  />
                  <div className="space-y-2">
                    {section.items.map((item, idx) => (
                      <textarea
                        key={idx}
                        value={item}
                        rows={2}
                        onChange={(e) => {
                          const newItems = [...section.items];
                          newItems[idx] = e.target.value;
                          handleSectionUpdate(section.id, { items: newItems });
                        }}
                        className="section-item-textarea"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab === 'design' && (
          <section className="section-spacing">
            <div>
              <h3 className="customization-title mb-4">ثيمات الألوان</h3>
              <div className="theme-grid">
                {(Object.keys(THEME_COLORS) as Array<keyof typeof THEME_COLORS>).map((key) => {
                  const theme = (THEME_COLORS as any)[key];
                  const isActive = !isUsingCustom && currentThemeKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setIsUsingCustom(false);
                        setThemeKey(key as any);
                      }}
                      className={`theme-button ${isActive ? 'active' : ''}`}
                    >
                      <span className={`theme-label ${isActive ? 'active' : 'inactive'}`}>
                        {theme.label}
                      </span>
                      <div className="theme-preview">
                        <div className="theme-preview-inner">
                          <div className="theme-color-half" style={{ backgroundColor: theme.primary }} />
                          <div className="theme-color-half" style={{ backgroundColor: theme.secondary }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="divider" />

            <div className="space-y-4">
              <h3 className="customization-title">تخصيص دقيق</h3>
              <div className="customization-grid">
                <div className="color-picker-wrapper">
                  <label className="color-picker-label">اللون الأساسي</label>
                  <div className="color-picker-input">
                    <input
                      type="color"
                      value={customTheme.primary}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomTheme({ ...customTheme, primary: e.target.value });
                      }}
                      className="color-picker"
                    />
                    <span className="color-code">{customTheme.primary}</span>
                  </div>
                </div>
                <div className="color-picker-wrapper">
                  <label className="color-picker-label">لون الخلفية/الظلال</label>
                  <div className="color-picker-input">
                    <input
                      type="color"
                      value={customTheme.secondary}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomTheme({ ...customTheme, secondary: e.target.value });
                      }}
                      className="color-picker"
                    />
                    <span className="color-code">{customTheme.secondary}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsUsingCustom(false)}
                className={`back-to-themes-btn ${isUsingCustom ? 'active' : 'inactive'}`}
              >
                العودة للثيمات الجاهزة
              </button>
            </div>
          </section>
        )}

        {activeTab === 'custom' && (
          <section className="section-spacing-sm">
            <div>
              <h3 className="css-editor-title mb-4">قوالب جاهزة</h3>
              <div className="snippets-grid">
                {CSS_SNIPPETS.map((snippet) => (
                  <button
                    key={snippet.name}
                    onClick={() => addSnippet(snippet.code)}
                    className="snippet-btn"
                  >
                    + {snippet.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="css-editor-title mb-1">محرر CSS المتقدم</h3>
              <textarea
                dir="ltr"
                value={slide.customCss}
                onChange={(e) => handleUpdate({ customCss: e.target.value })}
                className="css-editor"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
