"use client";
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
// import LeafletMap from "@/components/Map";
import { useLanguage } from '@/contexts/LanguageContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './page.module.scss';
import Footer from '@/components/Footer/Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import GlassButton from '@/components/UI/GlassButton';

const LeafletMap = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div>Loading map...</div>
});

gsap.registerPlugin(ScrollTrigger);

interface MapProps {
    popupContent?: React.ReactNode;
}

export default function Contact() {
    const { language } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);
    const markers = [
        { position: [37.507354705539, 127.05723030406], title: "하이브로빌딩" }
    ];

    const mainRef = useRef(null);
    const contactContainerRef = useRef(null);
    const heroVideoRef = useRef<HTMLVideoElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Check if window is defined to avoid SSR issues
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth <= 768);
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

 
    return (
        <main ref={mainRef} className={`${isVisible ? styles.fadeEffect : ''} `}>
         <div className='h-screen w-full overflow-hidden bg-[#FFF8F3] p-16 md:p-32'>
          {/* Same inset-card framing as the homepage Hero — the video sits
              as a rounded card with the page's own cream showing at the
              edges, instead of a full-bleed background. */}
          <div className='relative h-full w-full overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem]'>
            {/* One of our own short-form animation productions, used as a
                living showcase of the work behind "content globalization"
                rather than a generic stock loop. */}
            <video
                ref={heroVideoRef}
                className='absolute inset-0 h-full w-full object-cover'
                src='/videos/contact-hero.mp4'
                autoPlay
                loop
                muted
                playsInline
            />
            <div
                className='absolute inset-0'
                style={{ background: 'linear-gradient(180deg, rgb(0 0 0 / 55%) 0%, rgba(55, 75, 115, 0.35) 45%, rgb(0 0 0 / 65%) 100%)' }}
            />
            {/* Centered with flex against the card's own height, not a
                fixed `mt-[35vh]` — that was sized against the full
                viewport, so once the card got smaller (more outer padding)
                it no longer lined up with the card's actual center. */}
            <div className='absolute inset-0 z-10 flex items-center justify-center px-6'>
            <div className='max-w-screen-xl mx-auto flex flex-col  gap-4'>

            <div className='relative z-10 text-white text-center'>
                <p className='z-50 md:text-6xl font-medium text-4xl uppercase text-center '>
                 <span className=''>Stella& Inc.</span> Entertainment
                </p>
                { language === 'en' ?
                                <p className='md:text-xl text-[14px] mt-5'> Looking to discuss a project? <br/>
                                    Please get in touch using the form on this page. <br/>
                                    Generally, We&apos;re able to reply to all inquiries within 48 hours.
                                 </p>
                                : <p className='md:text-xl text-[14px] mt-5'>
                                    스텔라앤은 콜라보레이션에 항상 열려 있습니다. <br/>
                                    문의에 대해 48시간 내에 신속한 답변을 드립니다.
                                </p>
                }
                <div className='flex justify-center mt-8'>
                    <GlassButton onClick={handleOpen} videoRef={heroVideoRef} videoSrc='/videos/contact-hero.mp4'>Contact Us</GlassButton>
                </div>
            </div>
            </div>
          </div>
         </div>
        </div>
        {/* text-pink-500 */}
        <div className='h-[10vh]'></div>
        <div ref={contactContainerRef} className="max-w-screen-lg mx-auto contact-container">
            <h1 className="text-4xl font-bold text-center uppercase pt-40 " >
                Contact
            </h1>
            <div className='w-16 h-[3px] bg-[#FF8197] mt-4 mx-auto rounded-full' />
            <div className="flex md:flex-row flex-col items-center justify-center pt-20">
                <LeafletMap
                markers={markers.map(marker => ({
                lat: marker.position[0],
                lng: marker.position[1],
                title: marker.title
                }))}
                width={isMobile ? "70%" : "50%"}
                height="500px"
                coordinates={[37.507354705539, 127.05723030406]}
               >
               </LeafletMap>
             <div className="w-1/2 flex flex-col h-full justify-around md:gap-36 md:ml-20 ml-0 md:mt-0 mt-20 md:mb-0 mb-40"> 
                  <div className="flex flex-col gap-4">
                    <p className="font-bold uppercase">Address</p> 
                    <p>
                       { language == 'en' ?
                        <> 503 Teheran-ro (Hibrow Building), Gangnam-gu, <br/>
                        Seoul, Republic of Korea </>
                        : <> 강남구 테헤란로 503 하이브로빌딩, 서울특별시, 대한민국 </>
                        }
                        {/* Business Registration No: 221-88-02281 */}
                    </p>
                    <p className="font-bold uppercase">Phone</p>
                    <a href="tel:+8226952793">+82 02-6952-7933</a>
                    <p className="font-bold uppercase">Email</p>
                    <a href="mailto:hello@stelland.io">hello@stelland.io</a>

                    <button onClick={handleOpen} className='md:w-[250px] w-[200px] rounded-full bg-[#374B73] text-white px-10 py-2 mt-5 hover:bg-[#FF8197] transition-colors duration-300'>
                       {language == 'en' ? 'Send Message' : '메시지 보내기'}
                    </button>
                  </div>
            </div>
        </div>
        </div>
      <div className='h-[50vh]'></div>
      <Footer />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                 position: 'absolute',
                 top: '50%',
                 left: '50%',
                 transform: 'translate(-50%, -50%)',
                 width: 400,
                 bgcolor: 'background.paper',
                 boxShadow: '0 20px 60px rgba(55,75,115,0.25)',
                 p: 6,
                 borderRadius: '16px',
                 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {language === 'en' ? 'About General Inquiry,' : '일반 문의'}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                {language === 'en' ? <>You can email us at <span className='text-[#FF8197] font-semibold'>hello@stelland.io</span></> 
                                   : <><span className='text-[#FF8197] font-semibold'>hello@stelland.io</span> 로 이메일을 보내세요.</>}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {language === 'en' ? 'IP and Copyright,' : 'IP 및 저작권 문의'}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                {language === 'en' ? <>Email to <span className='text-[#FF8197] font-semibold'>lisa@stelland.io</span> <br/> for more information. <br/> <br />
                We are looking for a collaboration with you, thank you.</> 
                : <> <span className='text-[#FF8197] font-semibold'>lisa@stelland.io</span> 로 이메일을 보내세요. <br/> 더 많은 정보를 알려드리겠습니다. <br/> <br />
                우리는 당신과 협업을 찾고 있습니다. <br/>감사합니다.</>}
            </Typography>
            <Button 
            // sx={{ 
            //     mt: 2, 
            //     mb: 2, 
            //     color: '#fff', 
            //     backGround: 'black', 
            //     "&:hover": { 
            //         background: 'white',
            //         color: '#000'
            //     } 
            // }} 
            onClick={handleClose} 
            className='bg-[#374B73] text-white hover:bg-[#FF8197] transition-colors duration-300 rounded-full capitalize'>
                Close
            </Button>
            </Box>
        </Modal>
    </main>
    )
}