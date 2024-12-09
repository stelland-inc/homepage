"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import LeafletMap from "@/components/Map";
import { useLanguage } from '@/contexts/LanguageContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './page.module.scss';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const { language } = useLanguage();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const markers = [
        { position: [37.507392579613935, 127.05576783152004], title: "JS Tower" }
    ];

    const mainRef = useRef(null);
    const contactContainerRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useLayoutEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
      }, []);
      
      useGSAP(() => {
        if (contactContainerRef.current) {
          gsap.fromTo(contactContainerRef.current, 
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: contactContainerRef.current,
                start: 'top bottom-=100',
                end: 'bottom center',
                scrub: true,
                markers: false, // Remove this in production
              },
            }
          );
        }
      }, { scope: mainRef });
  

    return (
        <main ref={mainRef} className={`${isVisible ? styles.fadeEffect : ''} `}>
         <div className='h-screen w-full bg-[#FFF0EC]'>
            <div className='max-w-screen-xl mx-auto flex flex-col  gap-4'>
           
            <div className='text-black mt-[35vh] text-center'>
                <p className='z-50 md:text-6xl font-medium text-4xl uppercase text-center '>
                    {/*   margin-top: 35vh; */}
                 <span className=''>Stella&Inc.</span> Entertainment
                </p>
               { language === 'en' ? 
                                <p className='md:text-xl text-[14px] mt-5'> Looking to discuss a project? <br/>
                                    Please get in touch using the form on this page. <br/>
                                    Generally, We&apos;re able to reply to all inquiries within 48 hours.
                                 </p> 
                                : <p className='md:text-xl text-[14px] mt-5'> 
                                    스텔라앤은 콜라보레이션에 열려 있습니다. <br/>
                                    여러분의 다음 프로젝트를 스토리텔링 해드리겠습니다. <br/>
                                    문의에 대해 신속한 답변을 드릴 수 있도록 도와드릴께요.
                                </p> 
               }
                <Button
                sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                    '&:active': {
                        backgroundColor: 'white',
                        color: 'black',
                    }, 
                    fontSize: '14px',
                    padding: '5px 40px',
                    borderRadius: '100px',
                    marginTop: '1.25rem',
                }}
                onClick={handleOpen} className='z-50 hover:bg-white hover:text-black transition-all duration-300 uppercase'>
                <Link href="/contact">Contact Us</Link>
                </Button> 
            </div>
         </div>
        </div>
        {/* text-pink-500 */}
        <div className='h-[10vh]'></div>
        <div ref={contactContainerRef} className="max-w-screen-lg mx-auto contact-container">
            <h1 className="text-4xl font-bold text-center uppercase pt-40 " >
                Contact
            </h1>
            <div className=" flex md:flex-row flex-col items-center justify-center pt-20" >
                <LeafletMap
                popupContent={<p>JS Tower</p>}
                markers={markers.map(marker => ({
                lat: marker.position[0],
                lng: marker.position[1],
                title: marker.title
                }))}
                width={isMobile ? "70%" : "50%"}
                height="500px"
                coordinates={[37.507392579613935, 127.05576783152004]}
               >
               </LeafletMap>
             <div className="w-1/2 flex flex-col h-full justify-around md:gap-36 md:ml-20 ml-0 md:mt-0 mt-20 md:mb-0 mb-40"> 
                  <div className="flex flex-col gap-4">
                    <p className="font-bold uppercase">Address</p> 
                    <p>
                       { language == 'en' ? 
                        <> 6 Teheran-ro 79-gil, Gangnam-gu, <br/>
                        Seoul, Republic of Korea </>
                        : <> 6 테헤란로 79길 강남구, 서울특별시, 대한민국 </>
                        }   
                        {/* Business Registration No: 221-88-02281 */}
                    </p>
                    <p className="font-bold uppercase">Phone</p> 
                    <a href="mailto:info@example.com">+82 02-6952-7933</a>
                    <p className="font-bold uppercase">Email</p> 
                    <a href="mailto:info@example.com">hello@stelland.io</a>

                    <button onClick={handleOpen} className='md:w-[250px] w-[200px] rounded-full bg-black text-white px-10 py-2 mt-5 hover:bg-white hover:text-black transition-all duration-300'>
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
                 border: '2px solid gray',
                 boxShadow: 24,
                 p: 6,
                 borderRadius: '10px',
                 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                About General Inquiry,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                You can email us at <span className='text-red-300'>hello@stelland.io</span>
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                IP and Copyright,
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                Email to <span className='text-red-300'>lisa@stelland.io</span> <br/> for more information. <br/> <br />
                We are looking for a collaboration with you, thank you.
            </Typography>
          
           
            <Button 
            sx={{ mt: 2, mb: 2, color: '#000' }} 
            onClick={handleClose} 
            className='bg-black text-white hover:text-black transition-all duration-300'>
                Close
            </Button>
            </Box>
        </Modal>
    </main>
    )
}