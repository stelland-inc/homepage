import Roadmap from '@/components/Card/History/Roadmap';
import Link from 'next/link';

interface ProjectProps {
  progress: number;
  range: [number, number];
  i: number;
  className?: string;
}

const History = ({className}: ProjectProps) => {
  
  const roadmapData = [
    {
      title: '레진코믹스 지정 현지화 업체',
      title_en: 'Designated Localization Company for Lezhin Comics',
      description: '비브로스팀 지정 현지화 업체',
      description_en: 'Designated Localization Company for VBros Team',
      date: '2021'
    },
    {
      title: '스텔라앤 설립',
      title_en: 'Stella& Inc. Established',
      description: '고렘 팩토리 지정 현지화 업체, 브리드 컴퍼니 지정 현지화 업체, 락킨 코리아 지정 현지화 업체',
      description_en: 'Designated Localization Company for Golem Factory, Designated Localization Company for Breed Company, Designated Localization Company for Rockin Korea',
      date: '2022'
    },
    {
      title: '해외 유통 사업 개시',
      title_en: 'Global Distribution Business Started',
      description: '케나즈 지정 현지화 업체, 카카오 지정 현지화 업체, AI 현지화 솔루션 개발, 웹툰화 사업 개시, IP 개발 사업 개시',
      description_en: 'Designated Localization Company for KENAS, Designated Localization Company for Kakao, AI Localization Solution Development, Webtoon Business Started, IP Development Business Started',
      date: '2023'
    },
    {
      title: '해외 파트너사 확대',
      title_en: 'Global Partner Expansion',
      description: '아마존 재팬 지정 현지화 업체, 카카오 태국법인 지정 현지화 업체, 메디방, 라쿠텐 일본 사업 채결',
      description_en: 'Designated Localization Company for Amazon Japan, Designated Localization Company for Kakao Thailand, MediBang, Rakuten Japan Business Settlement',
      date: '2024'
    },
  ];
  
    return (
      <div className={`flex flex-col h-auto md:mb-0 ${className}`}>
        <div className='flex flex-col pb-10 '>
        <h1 className={`md:text-4xl text-3xl font-bold uppercase `}>
          {/* md:text-4xl text-3xl uppercase */}
            History 
        </h1>
        <Link href='/about'>
           <span className='md:hidden block text-[12px] text-gray-500'> Learn more &gt;</span>
        </Link>
      </div>
        <Roadmap data={roadmapData} className={className} />
      </div>
    );
  };
  
  export default History;
