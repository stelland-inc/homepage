'use client'
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';


interface RoadmapItem {
  date: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
}

const Roadmap = ({ data, className }: { data: RoadmapItem[], className?: string }) => {
  const { language } = useLanguage();
  return (
    <div className={`roadmap ${className}`}>
      {data.map((item: RoadmapItem, index: number) => (
        <div key={index} className="roadmap-item border-l border-red-200 px-2">
          <div className="roadmap-point"/>
            <span className="roadmap-date relative right-[35px] border border-red-200 bg-red-200 rounded-full px-2 py-4">
              {language === 'ko' ? item.date : item.date}
            </span>
            <div className="roadmap-content p-10">
                <h3>{language === 'ko' ? item.title : item.title_en}</h3>
                <p>{language === 'ko' ? item.description : item.description_en}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;