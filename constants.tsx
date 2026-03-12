
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
      title: 'المؤهلات العلمية:',
      items: [
        'حاصل على شهادة البكالوريوس في نظم المعلومات الإدارية من جامعة الملك فهد للبترول والمعادن',
        'لديه العديد من شهادات الاستثمار والدورات القيادية والإدارية من الجامعات والمعاهد الدولية ومنها هارفارد وكلية لندن للأعمال'
      ]
    },
    {
      id: 'sec2',
      title: 'أبرز المناصب التي تقلدها:',
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
  altajer: {
    label: 'التاجر الرقمي',
    primary: '#2563EB', // Electric Blue
    secondary: '#0F172A', // Charcoal Black
    accent: '#3B82F6', // Lighter Blue
    background: '#FFFFFF',
    text: '#0F172A'
  },
  mint: {
    label: 'النعناع',
    primary: '#10B981', // Mint Green
    secondary: '#064E3B', // Dark Green
    accent: '#34D399', // Light Mint
    background: '#FFFFFF',
    text: '#0F172A'
  },
  purple: {
    label: 'الأرجواني',
    primary: '#8B5CF6', // Soft Purple
    secondary: '#4C1D95', // Dark Purple
    accent: '#A78BFA', // Light Purple
    background: '#FFFFFF',
    text: '#0F172A'
  },
  orange: {
    label: 'البرتقالي',
    primary: '#F97316', // Orange for alerts
    secondary: '#7C2D12', // Dark Orange
    accent: '#FB923C', // Light Orange
    background: '#FFFFFF',
    text: '#0F172A'
  },
  trust: {
    label: 'الثقة',
    primary: '#3B82F6', // Blue 500
    secondary: '#1E3A8A', // Blue 900
    accent: '#60A5FA',
    background: '#FFFFFF',
    text: '#0F172A'
  },
  vision: {
    label: 'الرؤية',
    primary: '#A855F7', // Purple 500
    secondary: '#4C1D95', // Purple 900
    accent: '#C084FC',
    background: '#FFFFFF',
    text: '#0F172A'
  },
  official: {
    label: 'رسمي',
    primary: '#475569', // Slate 600
    secondary: '#0F172A', // Slate 900
    accent: '#94A3B8',
    background: '#FFFFFF',
    text: '#0F172A'
  },
  modernity: {
    label: 'حداثة',
    primary: '#F97316', // Orange 500
    secondary: '#431407', // Brown 900
    accent: '#FB923C',
    background: '#FFFFFF',
    text: '#0F172A'
  }
};

export const CSS_SNIPPETS = [
  { name: 'عنوان عصري', code: '.poster-name { font-weight: 900; letter-spacing: -0.02em; }' },
  { name: 'نص خفيف', code: '.poster-subtitle { font-weight: 300; opacity: 0.85; }' },
  { name: 'صورة دائرية', code: '.poster-image { border-radius: 50%; width: 200px !important; height: 200px !important; margin: 20px auto; border: 5px solid white; }' },
  { name: 'ظلال ناعمة', code: '.poster-root { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }' },
];
