
export interface ContentSection {
  id: string;
  title: string;
  items: string[];
}

export interface SlideData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  profileImage: string;
  logo?: string; // Base64 or URL for the logo
  sections: ContentSection[];
  customCss?: string;
  footer: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    email?: string;
  };
}

export type ThemeColors = {
  label?: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};
