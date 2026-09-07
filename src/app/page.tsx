'use client'
import { useEffect, useState, } from "react";
import Footer from "@/components/Footer/Footer";
import Intro from "@/components/Intro";
import Section from "@/components/Intro/Section";
import Character from "@/components/Mission/Character";
import CardContainer from '@/components/Card/CardContainer';
import Loading from "./loading";
import { useCursor } from "@/contexts/CursorContext";
import Marquee from "@/components/UI/Marquee";
import FeaturesWrapper from "@/components/UI/FeaturesWrapper";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { setCursorVariant } = useCursor()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);


  // cursor effect
  useEffect(() => {
    const handleMouseEnter = () => setCursorVariant("hover")
    const handleMouseLeave = () => setCursorVariant("default")

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [setCursorVariant])


  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className="bg-[#FDFCFB]">
      <Intro />
      {/* Bridges the hero's pink into the white below — picks up its exact
          bottom tone and eases out, so scrolling past the hero reads as one
          continuous color shift instead of a hard cut. */}
      <div style={{ height: "30vh", background: "linear-gradient(180deg, #FFDCE2 0%, #FDFCFB 100%)" }}></div>
      <div className="md:mb-0 mb-[40vh]">
        {/* the mission paragraph */}
        <Character />
      </div>
      <div className="md:h-[30vh] h-5" />
      <div className="w-full flex items-center justify-center">
        <FeaturesWrapper />
      </div>
      <Marquee />
      {/* <CardContainer /> */}
      <Section />
      <Footer />
    </div>
  );
}
