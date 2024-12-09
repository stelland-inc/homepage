"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language, Dictionary } from "@/components/Types"
import phrases from '@/utils/phrases';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: Dictionary;
  isRtl: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');
  const [dictionary, setDictionary] = useState<Dictionary>({});
  const [isRtl, setIsRtl] = useState("ltr");

useEffect(() => {

    const fetchPhrases = async () => {
      const dictionary = await phrases();
      setDictionary(dictionary);
    }
    fetchPhrases();
  }, [])


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language || 'ko';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    setIsRtl(language === 'ar' ? "rtl" : "ltr");
  }, [language]);

return (
  <LanguageContext.Provider value={{ language, setLanguage, dictionary, isRtl }}>
    {children}
  </LanguageContext.Provider>
);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};