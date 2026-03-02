
import { SlideData } from './types';

export const INITIAL_SLIDE: SlideData = {
  id: '1',
  name: 'عبدالرحمن بن أحمد الحربي',
  title: 'السيرة الذاتية لمعالي الأستاذ',
  subtitle: 'والذي صدر الأمر الملكي الكريم بتعيينه (سفيراً لخادم الحرمين الشريفين لدى جمهورية الصين الشعبية) بالمرتبة الممتازة.',
  profileImage: 'https://picsum.photos/seed/saudi/600/600',
  logo: '', // Initial empty logo
  customCss: '',
  sections: [
    {
      id: 'sec1',
      title: 'المؤهلات:',
      items: [
        'حاصل على شهادة البكالوريوس في نظم المعلومات الإدارية من جامعة الملك فهد للبترول والمعادن',
        'لديه العديد من شهادات الاستثمار والدورات القيادية والإدارية من الجامعات والمعاهد الدولية ومنها هارفارد وكلية لندن للأعمال'
      ]
    },
    {
      id: 'sec2',
      title: 'تقلد العديد من المناصب أبرزها:',
      items: [
        'محافظ الهيئة العامة للتجارة الخارجية بالمرتبة الممتازة 2019 - 2022',
        'وكيل وزارة التجارة والاستثمار للتجارة الخارجية 2016م',
        'يرأس حالياً الفريق التفاوضي السعودي ويشغل منصب المنسق العام للمفاوضات في الأمانة العامة لمجلس التعاون لدول الخليج العربية',
        'عضو مجلس إدارة هيئة تنمية الصادرات السعودية'
      ]
    }
  ],
  footer: {
    instagram: 'Saudi.decisions',
    linkedin: 'Saudi-decisions',
    twitter: 'SaudiDecisions',
    telegram: 'SaudiDecisions',
    email: 'SaudiDecisions@nawafeth.sa'
  }
};

export const THEME_COLORS = {
  investor: {
    label: 'المستثمر',
    primary: '#2dd4bf', // Cyan 400
    secondary: '#134e4a', // Teal 900
    accent: '#5eead4',
    background: '#ffffff',
    text: '#111827'
  },
  luxury: {
    label: 'فخامة',
    primary: '#fbbf24', // Amber 400
    secondary: '#111827', // Dark
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#111827'
  },
  trust: {
    label: 'الثقة',
    primary: '#3b82f6', // Blue 500
    secondary: '#1e3a8a', // Blue 900
    accent: '#60a5fa',
    background: '#ffffff',
    text: '#111827'
  },
  growth: {
    label: 'النمو',
    primary: '#84cc16', // Lime 500
    secondary: '#064e3b', // Emerald 900
    accent: '#a3e635',
    background: '#ffffff',
    text: '#111827'
  },
  energy: {
    label: 'الطاقة',
    primary: '#ef4444', // Red 500
    secondary: '#7f1d1d', // Red 900
    accent: '#f87171',
    background: '#ffffff',
    text: '#111827'
  },
  vision: {
    label: 'الرؤية',
    primary: '#a855f7', // Purple 500
    secondary: '#4c1d95', // Purple 900
    accent: '#c084fc',
    background: '#ffffff',
    text: '#111827'
  },
  official: {
    label: 'رسمي',
    primary: '#94a3b8', // Slate 400
    secondary: '#0f172a', // Slate 900
    accent: '#cbd5e1',
    background: '#ffffff',
    text: '#111827'
  },
  modernity: {
    label: 'حداثة',
    primary: '#f97316', // Orange 500
    secondary: '#431407', // Brown 900
    accent: '#fb923c',
    background: '#ffffff',
    text: '#111827'
  }
};

export const CSS_SNIPPETS = [
  { name: 'ذهبي فاخر', code: '.poster-name { color: #d4af37; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }' },
  { name: 'عنوان مفرغ', code: '.poster-headline { background: none !important; -webkit-text-stroke: 1px #064e3b; color: transparent !important; }' },
  { name: 'صورة دائرية', code: '.poster-image { border-radius: 50%; width: 200px !important; height: 200px !important; margin: 20px auto; border: 5px solid white; }' },
];
