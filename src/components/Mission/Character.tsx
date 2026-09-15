'use client'
import { useScroll, useTransform, motion, AnimatePresence, MotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/components/Mission/style.module.scss';
import { useLanguage } from '@/contexts/LanguageContext';
import Globe from '@/components/Mission/Globe';
import GlassCard from '@/components/UI/GlassCard';
import { Globe2, Clapperboard, Languages } from 'lucide-react';

const BRAND_NAVY_LIGHT = '#75819D';
const BRAND_PINK = '#FF8197';
const BRAND_NAVY = '#374b73';

// Moved here from the hero — reads better floating over the globe (its
// own rich, colorful visual) than over hero footage that already had
// enough going on.
const PHRASES_KO = ['웹툰을 21개 언어로', '웹소설을 숏폼 영상으로', '당신의 이야기를 세계로'];
const PHRASES_EN = ['Webtoons, in 21 languages', 'Web novels, as short-form video', 'Your story, told worldwide'];
const PHRASE_ICONS = [Languages, Clapperboard, Globe2];
// Hoisted to keep a stable object identity across renders — Globe's effect
// depends on this object by reference, and a new literal every render would
// re-trigger it (see the comment above Globe's own DEFAULT_DOTS).
const GLOBE_DOTS = { color: BRAND_NAVY_LIGHT, size: 4, density: 7, allDots: false, gradientTo: BRAND_PINK };

export default function Character() {

  const { language } = useLanguage();

  const phrases = language === 'ko' ? PHRASES_KO : PHRASES_EN;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);

  // Types the current phrase out one character at a time, holds it fully
  // visible for a beat, then hands off to the phrase-advance effect below.
  useEffect(() => {
    setTypedLength(0);
    const full = phrases[phraseIndex]?.length ?? 0;
    let i = 0;
    const typeId = setInterval(() => {
      i += 1;
      setTypedLength(i);
      if (i >= full) clearInterval(typeId);
    }, 65);
    return () => clearInterval(typeId);
  }, [phraseIndex, phrases]);

  useEffect(() => {
    const full = phrases[phraseIndex]?.length ?? 0;
    const holdId = setTimeout(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, full * 65 + 1500);
    return () => clearTimeout(holdId);
  }, [phraseIndex, phrases]);

  const paragraph = language == 'en' ?
                  "Our mission is to realize your desires, to grow together, to make your dreams come true."
                  : "우리는 평범한 일상을 넘어, 더 특별하고 즐거운 순간을 선물합니다. 여러분의 꿈을 이루어 보세요."

  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = paragraph.split(" ");
  // Force a line break after these specific words (by their raw text)
  // instead of leaving wrapping to the container width — keeps the
  // requested 3-line shape regardless of viewport.
  const breakAfter = language == 'ko' ? ['넘어,', '선물합니다.'] : ['desires,', 'true.'];
  // "더 특별하고 즐거운 순간" gets its own light-pink highlight behind it.
  const highlightWords = language == 'ko' ? ['더', '특별하고', '즐거운', '순간을'] : [];
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden md:min-h-[85vh]">
      {/* A rotating dotted globe on the right, in brand colors — replaces
          the flat halftone map. Pink ocean + navy continents, mixing the
          two brand colors rather than leaning on just one. */}
      <div className="absolute -right-[9%] top-1/2 h-[108%] w-[86%] -translate-y-1/2 md:-right-[11%] md:h-[122%] md:w-[74%]">
        <Globe
          speed={1.4}
          smoothing={8}
          scale={7.3}
          direction="left"
          stopOnHover
          dots={GLOBE_DOTS}
          fill="dots"
          oceanColor={`${BRAND_PINK}1a`}
          outlineColor={`${BRAND_PINK}dd`}
          showOutline
          graticuleColor={`${BRAND_NAVY_LIGHT}22`}
          graticuleColorTo={`${BRAND_PINK}22`}
          showGrid
          outlineWidth={1}
          initialLatitude={15}
          initialLongitude={40}
        />
      </div>

      {/* The hero's glass card, relocated here — reads better floating
          over the globe's own colorful motion than it did over the hero
          video. Desktop only, matching the globe's own breakpoint. */}
      <motion.div
        className="pointer-events-none absolute right-[4%] top-[22%] z-[5] hidden w-[30vw] max-w-[400px] md:block"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          <GlassCard className="px-10 py-11">
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <span
                  className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${BRAND_PINK}, #FFD0A5)` }}
                >
                  {(() => {
                    const Icon = PHRASE_ICONS[phraseIndex];
                    return <Icon className="h-5 w-5" style={{ color: '#FDFCFB' }} />;
                  })()}
                </span>
                <p
                  className="bg-clip-text text-xl font-bold leading-snug text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${BRAND_NAVY}, ${BRAND_PINK})` }}
                >
                  {phrases[phraseIndex].slice(0, typedLength)}
                  <motion.span
                    className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] align-middle"
                    style={{ backgroundColor: BRAND_PINK }}
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.5, 1] }}
                  />
                </p>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </motion.div>

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <p
          ref={container}
          className={styles.paragraph}
        >
        {
          (() => {
            // Group consecutive highlighted words under one wrapper so the
            // pink background reads as a single continuous strip behind the
            // whole phrase, not a separate pill per word.
            const nodes: React.ReactNode[] = [];
            let i = 0;
            const renderWord = (i: number) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              const word = words[i];
              return (
                <React.Fragment key={i}>
                  <Word progress={scrollYProgress} range={[start, end]}>{word}</Word>
                  {breakAfter.includes(word) && <span className={styles.lineBreak} />}
                </React.Fragment>
              );
            };
            while (i < words.length) {
              if (highlightWords.includes(words[i])) {
                const runStart = i;
                while (i < words.length && highlightWords.includes(words[i])) i++;
                nodes.push(
                  <span key={`hl-${runStart}`} className={styles.highlight}>
                    {Array.from({ length: i - runStart }, (_, j) => renderWord(runStart + j))}
                    {/* Caret lives inside the highlight box itself, right at
                        its trailing edge, so the box reads as cut off
                        exactly there instead of trailing a gap after it. */}
                    <span className={styles.caret} aria-hidden />
                  </span>
                );
              } else {
                nodes.push(renderWord(i));
                i++;
              }
            }
            return nodes;
          })()
        }
        </p>
      </div>
    </div>
  )
}

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const amount = range[1] - range[0];
  const step = amount / React.Children.toArray(children).length;
  return (
    <span className={styles.word}>
      {
        React.Children.toArray(children).map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step);
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>;
        })
      }
    </span>
  )
}

const Char = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  // More than a plain fade: each character rises, unblurs, and settles
  // to full scale as the scroll progress sweeps through its own slice of
  // the range — a lot more "motion graphic" than opacity alone.
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [18, 0]);
  const scale = useTransform(progress, range, [0.82, 1]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    <>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity, y, scale, filter, display: 'inline-block' }}>{children}</motion.span>
    </>
  )
}
