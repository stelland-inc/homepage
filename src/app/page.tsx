'use client'
import { useEffect, useState, } from "react";
import Footer from "@/components/Footer/Footer";
import Intro from "@/components/Intro";
import Section from "@/components/Intro/Section"; 
import Character from "@/components/Mission/Character";
import CardContainer from '@/components/Card/CardContainer';
import Loading from "./loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
        <Intro />
        <div style={{height: "30vh"}}></div>
        {/* mission paragraph */}
        <div className="md:mb-0 mb-[40vh]">
        <Character />
        </div>
        <CardContainer />
         <div style={{height: "30vh"}}></div>
        <Section />
        <Footer />
    </div>
  );
}
