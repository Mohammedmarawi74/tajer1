
import React, { useState, useRef } from 'react';
import { SlideData, ThemeColors } from '../types';
import { THEME_COLORS, CSS_SNIPPETS } from '../constants';
import { enhanceText } from '../services/geminiService';
import { Sparkles, Trash2, Plus, Upload, Palette, Type, Code2, UserCircle, RefreshCcw, Pipette, Image as ImageIcon } from 'lucide-react';

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
    handleUpdate({ sections: newSections });
  };

  const addSection = () => {
    const newSec = { id: Math.random().toString(), title: 'عنوان جديد', items: ['نقطة جديدة'] };
    handleUpdate({ sections: [...slide.sections, newSec] });
  };

  const removeSection = (id: string) => {
    handleUpdate({ sections: slide.sections.filter(s => s.id !== id) });
  };

  const addSnippet = (snippetCode: string) => {
    const currentCss = slide.customCss || '';
    handleUpdate({ customCss: currentCss + '\n' + snippetCode });
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
    <div className="w-96 bg-[#0f172a] text-gray-300 h-full flex flex-col overflow-hidden border-l border-gray-800">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-around border-b border-gray-800 bg-[#1e293b]/50">
        <button 
          onClick={() => setActiveTab('intelligence')}
          className={`flex flex-col items-center py-4 px-2 flex-1 gap-1 transition-all ${activeTab === 'intelligence' ? 'text-emerald-400 bg-[#1e293b]' : 'hover:bg-[#1e293b]'}`}
        >
          <Sparkles size={18} />
          <span className="text-[10px] font-bold text-center">الذكاء</span>
        </button>
        <button 
          onClick={() => setActiveTab('text')}
          className={`flex flex-col items-center py-4 px-2 flex-1 gap-1 transition-all ${activeTab === 'text' ? 'text-emerald-400 bg-[#1e293b]' : 'hover:bg-[#1e293b]'}`}
        >
          <Type size={18} />
          <span className="text-[10px] font-bold text-center">النصوص</span>
        </button>
        <button 
          onClick={() => setActiveTab('design')}
          className={`flex flex-col items-center py-4 px-2 flex-1 gap-1 transition-all ${activeTab === 'design' ? 'text-emerald-400 bg-[#1e293b]' : 'hover:bg-[#1e293b]'}`}
        >
          <Palette size={18} />
          <span className="text-[10px] font-bold text-center">التصميم</span>
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          className={`flex flex-col items-center py-4 px-2 flex-1 gap-1 transition-all ${activeTab === 'custom' ? 'text-emerald-400 bg-[#1e293b]' : 'hover:bg-[#1e293b]'}`}
        >
          <Code2 size={18} />
          <span className="text-[10px] font-bold text-center">تخصيص</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-800">
        {activeTab === 'text' && (
          <>
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCircle className="text-emerald-500" size={20} />
                <h3 className="text-sm font-bold text-white">الهوية الشخصية</h3>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">الاسم الكامل</label>
                <input 
                  type="text" 
                  value={slide.name} 
                  onChange={(e) => handleUpdate({ name: e.target.value })}
                  className="w-full p-2 bg-[#1e293b] border border-gray-700 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none text-sm text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">اللقب / الوظيفة</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={slide.title} 
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                    className="w-full p-2 bg-[#1e293b] border border-gray-700 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none pl-10 text-sm text-white text-right"
                  />
                  <button 
                    onClick={() => handleAIImprove('title')}
                    disabled={isEnhancing === 'title'}
                    className="absolute left-2 top-2 text-emerald-500 hover:bg-[#2d3748] p-1 rounded transition disabled:opacity-50"
                  >
                    <Sparkles size={14} />
                  </button>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-2 mt-4">
                <label className="text-xs font-medium text-gray-400">شعار المنصة (Logo)</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => logoInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-[#1e293b] border border-dashed border-gray-600 rounded-xl hover:border-emerald-500 transition-all text-xs"
                  >
                    {slide.logo ? (
                      <img src={slide.logo} alt="Preview" className="h-5 w-auto object-contain" />
                    ) : (
                      <ImageIcon size={16} className="text-emerald-500" />
                    )}
                    <span>{slide.logo ? 'تغيير الشعار' : 'رفع شعار'}</span>
                  </button>
                  {slide.logo && (
                    <button 
                      onClick={() => handleUpdate({ logo: '' })}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20"
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
            
            <hr className="border-gray-800" />

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">الأقسام والمحتوى</h3>
                <button 
                  onClick={addSection}
                  className="text-emerald-500 hover:bg-emerald-500/10 p-1 px-2 rounded flex items-center gap-1 text-[10px] font-bold border border-emerald-500/20"
                >
                  <Plus size={12} /> إضافة قسم
                </button>
              </div>
              {slide.sections.map((section) => (
                <div key={section.id} className="p-4 bg-[#1e293b]/50 border border-gray-700 rounded-lg space-y-3 relative group">
                  <button 
                    onClick={() => removeSection(section.id)}
                    className="absolute top-2 left-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                  <input 
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionUpdate(section.id, { title: e.target.value })}
                    className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-emerald-500/50 text-white text-right"
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
                        className="w-full p-2 text-[11px] bg-[#0f172a] border border-gray-700 rounded outline-none resize-none text-gray-300 text-right"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab === 'design' && (
          <section className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest text-right">ثيمات الألوان (THEMES)</h3>
              <div className="grid grid-cols-2 gap-3">
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
                      className={`relative flex items-center justify-between p-3 bg-[#1e293b] border rounded-xl transition-all h-14 ${
                        isActive ? 'border-cyan-400 ring-1 ring-cyan-400/30' : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {theme.label}
                      </span>
                      <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden border border-gray-800">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 h-full" style={{ backgroundColor: theme.primary }} />
                          <div className="w-1/2 h-full" style={{ backgroundColor: theme.secondary }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-gray-800" />

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right">تخصيص دقيق</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 block">اللون الأساسي</label>
                  <div className="flex items-center gap-2 p-2 bg-[#1e293b] border border-gray-700 rounded-lg">
                    <input 
                      type="color" 
                      value={customTheme.primary}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomTheme({ ...customTheme, primary: e.target.value });
                      }}
                      className="w-10 h-6 bg-transparent cursor-pointer rounded overflow-hidden"
                    />
                    <span className="text-[10px] font-mono uppercase">{customTheme.primary}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 block">لون الخلفية/الظلال</label>
                  <div className="flex items-center gap-2 p-2 bg-[#1e293b] border border-gray-700 rounded-lg">
                    <input 
                      type="color" 
                      value={customTheme.secondary}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomTheme({ ...customTheme, secondary: e.target.value });
                      }}
                      className="w-10 h-6 bg-transparent cursor-pointer rounded overflow-hidden"
                    />
                    <span className="text-[10px] font-mono uppercase">{customTheme.secondary}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsUsingCustom(false)}
                className={`w-full py-2 text-xs rounded-lg transition-all ${isUsingCustom ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-500 pointer-events-none'}`}
              >
                العودة للثيمات الجاهزة
              </button>
            </div>
          </section>
        )}

        {activeTab === 'custom' && (
          <section className="space-y-6">
            <div>
              <h3 className="text-emerald-500 text-sm font-bold mb-4">قوالب جاهزة (SNIPPETS)</h3>
              <div className="grid grid-cols-2 gap-2">
                {CSS_SNIPPETS.map((snippet) => (
                  <button
                    key={snippet.name}
                    onClick={() => addSnippet(snippet.code)}
                    className="p-2 text-[11px] bg-[#1e293b] border border-gray-700 rounded-lg text-right text-gray-300 hover:border-emerald-500 hover:text-white transition-all"
                  >
                    + {snippet.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-emerald-500 text-sm font-bold mb-1">محرر CSS المتقدم</h3>
              <textarea
                dir="ltr"
                value={slide.customCss}
                onChange={(e) => handleUpdate({ customCss: e.target.value })}
                className="w-full h-80 bg-[#020617] border border-gray-800 rounded-xl p-4 font-mono text-xs text-blue-300 focus:border-emerald-500/50 outline-none"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
