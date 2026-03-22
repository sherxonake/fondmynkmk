'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'uz' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  uz: {
    // Navigation
    home: 'Bosh sahifa',
    about: 'Biz haqimizda',
    news: 'Yangiliklar',
    contact: 'Bog\'lanish',
    
    // Hero
    heroTitle: '"NKMK jamg\'armasi"',
    heroSubtitle: 'davlat muassasasi',
    heroLocation: 'Navoiy viloyati, O\'zbekiston',
    heroAbout: 'Biz haqimizda',
    heroNews: 'Yangiliklar',
    
    // News
    latestNews: 'So\'nggi yangiliklar',
    allNews: 'Barcha yangiliklar',
    readMore: 'Batafsil',
    relatedNews: 'O\'xshash yangiliklar',
    category: 'Kategoriya',
    backToNews: '← Barcha yangiliklar',
    allNewsPage: 'Barcha yangiliklar',
    newsDescription: 'NKMK Jamg\'armasi faoliyati haqida so\'nggi yangiliklar',
    
    // Directions
    directions: 'Faoliyat yo\'nalishlari',
    
    // Stats
    socialObjects: 'Ijtimoiy ob\'yektlar',
    employees: 'NKMK xodimlari',
    regions: 'Hududiy boshqarmalar',
    services: 'Xizmat turlari',
    
    // Footer
    copyright: '© 2026 NKMK Jamg\'armasi. Barcha huquqlar himoyalangan.',
  },
  ru: {
    // Navigation
    home: 'Главная',
    about: 'О нас',
    news: 'Новости',
    contact: 'Контакты',
    
    // Hero
    heroTitle: '"Фонд НГМК"',
    heroSubtitle: 'государственное учреждение',
    heroLocation: 'Навоийская область, Узбекистан',
    heroAbout: 'О нас',
    heroNews: 'Новости',
    
    // News
    latestNews: 'Последние новости',
    allNews: 'Все новости',
    readMore: 'Подробнее',
    relatedNews: 'Похожие новости',
    category: 'Категория',
    backToNews: '← Все новости',
    allNewsPage: 'Все новости',
    newsDescription: 'Последние новости о деятельности Фонда НГМК',
    
    // Directions
    directions: 'Направления деятельности',
    
    // Stats
    socialObjects: 'Социальные объекты',
    employees: 'Сотрудники НГМК',
    regions: 'Региональные управления',
    services: 'Виды услуг',
    
    // Footer
    copyright: '© 2026 Фонд НГМК. Все права защищены.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'uz' || saved === 'ru')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.uz] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
