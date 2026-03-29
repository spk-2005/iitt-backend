import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

import slide1Img from "../assets/Intro Page.png";
import slide2Img from "../assets/Intro Page (3).png";
import slide3Img from "../assets/Intro Page (8).png";
import slide4Img from "../assets/Intro Page (1).png";
import bulletIcon from "../assets/Vector (2).png";
import noiseImage from "../assets/noise.png";
import watermark from "../assets/Group 1437253216.png";

const slideData = [
  {
    id: 0,
    title: "1. Connect your knowledge",
    description:
      "Your single living source of truth. Anseru connects to where your knowledge already lives. Sync Google Drive, SharePoint, Teams, Jira, Slack, and Dropbox or upload your internal documents directly. Your answer library builds itself and stays current automatically.",
    gradientClass: "card-gradient-a1",
    image: slide1Img,
    bulletStyle: "starburst" as const,
    cardSubtitle: [
      { text: "Connect", isBold: true },
      { text: " - ", isBold: true },
      { text: "Upload", isBold: false },
      { text: " - ", isBold: false },
      { text: "Respond", isBold: false },
      { text: " - ", isBold: false },
      { text: "Approve", isBold: false },
    ],
    cardTitle: "Turn complex RFPs into clear, winning responses",
    bullets: [
      "Indexes past RFPs, security docs, and compliance content automatically",
      "Integrates with your existing storage and communication systems",
      "Improves continuously as your team uses and approves new answers",
    ],
  },
  {
    id: 1,
    title: "2. Upload RFPs & Security Questionnaires",
    description:
      "Drop in any document in any format. Anseru reads the full document, identifies every requirement, and maps each question to your verified knowledge base, in seconds.",
    gradientClass: "card-gradient-a2",
    image: slide2Img,
    bulletStyle: "starburst" as const,
    cardSubtitle: [
      { text: "Connect", isBold: false },
      { text: " - ", isBold: false },
      { text: "Upload", isBold: true },
      { text: " - ", isBold: true },
      { text: "Respond", isBold: false },
      { text: " - ", isBold: false },
      { text: "Approve", isBold: false },
    ],
    cardTitle: "Turn complex RFPs into clear, winning responses",
    bullets: [
      "Accepts PDF, DOCX, XLSX documents.",
      "Automatically identifies and classifies every question and sub-requirement",
      "Maps each item to your verified answer library before you begin",
    ],
  },
  {
    id: 2,
    title: "3. Generate AI Draft Responses",
    description:
      "Anseru generates a full response draft using your verified documentation and past approved answers. Every answer is traceable to a real source, so drafts arrive ready for review, not ready to be rewritten from scratch.",
    gradientClass: "card-gradient-a3",
    image: slide3Img,
    bulletStyle: "starburst" as const,
    cardSubtitle: [
      { text: "Connect", isBold: false },
      { text: " - ", isBold: false },
      { text: "Upload", isBold: false },
      { text: " - ", isBold: false },
      { text: "Respond", isBold: true },
      { text: " - ", isBold: true },
      { text: "Approve", isBold: false },
    ],
    cardTitle: "Turn complex RFPs into clear, winning responses",
    bullets: [
      "Drafts complete responses from your verified internal knowledge base",
      "Flags low-confidence answers for SME review before submission",
      "Saves hours of manual writing and cross-referencing per deal",
    ],
  },
  {
    id: 3,
    title: "4. SME Review & Approval",
    description:
      "Anseru focuses your experts on what only they can answer. Standard questions arrive pre-drafted and ready to approve. Novel, flagged, and high-risk items are surfaced for review before anything leaves the building.",
    gradientClass: "card-gradient-a4",
    image: slide4Img,
    bulletStyle: "starburst" as const,
    cardSubtitle: [
      { text: "Connect", isBold: false },
      { text: " - ", isBold: false },
      { text: "Upload", isBold: false },
      { text: " - ", isBold: false },
      { text: "Respond", isBold: false },
      { text: " - ", isBold: false },
      { text: "Approve", isBold: true },
    ],
    cardTitle: "Turn complex RFPs into clear, winning responses",
    bullets: [
      "Routes only flagged and novel questions to subject matter experts",
      "Full audit trail of every review, edit, and approval decision",
      "Every submission is clean, compliant, and signed off before it goes out",
    ],
  },
];

const NAVBAR_HEIGHT = 12;

const SLIDE_COUNT = slideData.length;
const INDICATORS = ["Connect", "Upload", "Respond", "Approve"];

// Minimum accumulated scroll (px) required to trigger a slide change.
// Raise this number to make it less sensitive.
const SCROLL_THRESHOLD = 80;

/* ── Starburst icon ─────────────────────────────────────────────── */
const StarburstIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 28 26"
    fill="none"
    className="flex-shrink-0 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 0L14.1938 11.3187C14.2016 11.774 14.7911 12.0007 15.1434 11.6839L23.8995 3.80761L15.4174 11.9384C15.0762 12.2654 15.3203 12.8129 15.8106 12.8201L28 13L15.8106 13.1799C15.3203 13.1872 15.0762 13.7346 15.4174 14.0617L23.8995 22.1924L15.1434 14.3161C14.7911 13.9993 14.2016 14.226 14.1938 14.6813L14 26L13.8063 14.6813C13.7985 14.226 13.2089 13.9993 12.8567 14.3161L4.1005 22.1924L12.5827 14.0617C12.9239 13.7346 12.6797 13.1872 12.1894 13.1799L0 13L12.1894 12.8201C12.6797 12.8129 12.9239 12.2654 12.5827 11.9384L4.1005 3.80761L12.8567 11.6839C13.2089 12.0007 13.7985 11.774 13.8063 11.3187L14 0Z"
      fill="#a1a1aa"
    />
  </svg>
);

/* ── Bullet point ───────────────────────────────────────────────── */
const BulletPoint = ({
  text,
  style,
}: {
  text: string;
  style: "cross" | "starburst";
}) => (
  <div className="flex gap-3 items-start">
    {style === "cross" ? (
      <img
        src={bulletIcon}
        alt=""
        width="14"
        height="14"
        className="flex-shrink-0 opacity-60 mt-1"
      />
    ) : (
      <StarburstIcon />
    )}
    <span className="text-[#666666] text-[14px] md:text-[15px] font-normal leading-relaxed">
      {text}
    </span>
  </div>
);

/* ── Step indicator pills ───────────────────────────────────────── */
const StepIndicators = ({
  activeSlide,
  onGoTo,
}: {
  activeSlide: number;
  onGoTo: (i: number) => void;
}) => (
  <div className="flex justify-center items-center gap-0 max-w-[580px] mx-auto px-4">
    {INDICATORS.map((label, i) => (
      <div key={i} className="flex items-center">
        <button
          onClick={() => onGoTo(i)}
          className={`text-[13px] sm:text-[15px] font-medium transition-colors cursor-pointer px-3 sm:px-4 py-2 rounded-full ${
            activeSlide === i
              ? "text-black bg-gray-100"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {label}
        </button>
        {i < INDICATORS.length - 1 && (
          <div className="w-5 sm:w-10 h-[1px] bg-gray-200 -mx-1 sm:-mx-2" />
        )}
      </div>
    ))}
  </div>
);

/* ── Gradient card ──────────────────────────────────────────────── */
const GradientCard = ({
  slide,
  className = "",
}: {
  slide: (typeof slideData)[0];
  className?: string;
}) => (
  <div
    className={`text-white w-full flex flex-col justify-start relative overflow-hidden shadow-lg rounded-[10px] ${slide.gradientClass} ${className}`}
  >
    <img
      src={watermark}
      alt=""
      className="absolute top-0 right-0 w-[40%] h-[40%] object-contain pointer-events-none z-10"
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${noiseImage})`,
        backgroundSize: "200px 200px",
        mixBlendMode: "overlay",
      }}
    />
    <div className="relative z-20 p-6 md:p-8 space-y-2">
      <h2 className={`font-medium ${slide.id < 1 ? 'max-w-[360px]' : 'max-w-[340px]'} text-[17px] md:text-[21px] leading-snug`}>
        {slide.cardTitle}
      </h2>
    </div>
    <div className="absolute z-10 bottom-0 right-0 flex justify-end">
      <img
        src={slide.image}
        alt={slide.title}
        className={`h-auto w-[50%] object-top rounded-b-[10px] ${slide.id >= 2 ? "w-[85%]" : "w-[75%]"}`}
      />
    </div>
  </div>
);

/* ── Slide text ─────────────────────────────────────────────────── */
const SlideText = ({ slide }: { slide: (typeof slideData)[0] }) => (
  <div className="space-y-5">
    <div className="space-y-3">
      <h2 className="font-normal text-[#111111] text-[19px] md:text-[23px] leading-snug">
        {slide.title}
      </h2>
      <p className="anseru-section-description text-[14px] md:text-[15px] leading-relaxed max-w-[95%]">
        {slide.description}
      </p>
    </div>
    <div className="space-y-3 pt-1">
      {slide.bullets.map((text, i) => (
        <BulletPoint key={i} text={text} style={slide.bulletStyle} />
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   MOBILE  –  native horizontal snap scroll
══════════════════════════════════════════════════════════════════ */
const MobileCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: i * container.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollLeft / container.clientWidth);
      setActiveSlide(idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full bg-white pb-10">
      <div className="pt-6 pb-4 px-4 text-center">
        <p className="anseru-section-tag">How It Works</p>
        <h2 className="anseru-section-title mt-1 mb-5 px-2">
          How Anseru Turns Knowledge Into Winning Deals
        </h2>
        <StepIndicators activeSlide={activeSlide} onGoTo={goTo} />
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {slideData.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 snap-center snap-always w-[100vw] px-4 sm:px-6"
          >
            <SlideText slide={slide} />
            <div className="mt-5 h-[300px] sm:h-[360px]">
              <GradientCard slide={slide} className="h-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {slideData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              activeSlide === i ? "w-5 h-2 bg-gray-700" : "w-2 h-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   DESKTOP  –  scroll-driven horizontal slide, with delta accumulator
               so small / fast trackpad flicks don't skip slides
══════════════════════════════════════════════════════════════════ */
const DesktopCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const isSnappingRef = useRef(false);
  // Accumulated scroll delta – resets after each slide change
  const accDeltaRef = useRef(0);
  // Timestamp of last wheel event used to detect pauses and reset accumulator
  const lastWheelTimeRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const slideIndexSpring = useSpring(0, {
    stiffness: 260,
    damping: 32,
    mass: 0.6,
  });
  const xOffset = useTransform(
    slideIndexSpring,
    [0, 1],
    ["0%", `-${((SLIDE_COUNT - 1) / SLIDE_COUNT) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    slideIndexSpring.set(latest);
    const idx = Math.round(latest * (SLIDE_COUNT - 1));
    setActiveSlide((prev) => (idx !== prev ? idx : prev));
  });

  const goTo = useCallback((index: number) => {
    if (!targetRef.current) return;
    accDeltaRef.current = 0;
    isSnappingRef.current = true;
    window.scrollTo({
      top: targetRef.current.offsetTop + index * window.innerHeight,
      behavior: "smooth",
    });
    setTimeout(() => {
      isSnappingRef.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!targetRef.current || isSnappingRef.current) return;
      if (!window.matchMedia("(hover: hover)").matches) return;

      const offsetTop = targetRef.current.offsetTop;
      const scrollY = window.scrollY;
      const vh = window.innerHeight - NAVBAR_HEIGHT;
      const totalH = targetRef.current.clientHeight;

      // Only intercept while inside the section
      if (scrollY < offsetTop || scrollY > offsetTop + totalH - vh) return;

      e.preventDefault();

      const now = Date.now();

      // If the user paused scrolling for >300 ms, reset the accumulator so
      // they have to build up momentum again from zero.
      if (now - lastWheelTimeRef.current > 300) {
        accDeltaRef.current = 0;
      }
      lastWheelTimeRef.current = now;

      accDeltaRef.current += e.deltaY;

      // Only advance a slide once the accumulated delta exceeds the threshold
      if (Math.abs(accDeltaRef.current) < SCROLL_THRESHOLD) return;

      const direction = accDeltaRef.current > 0 ? 1 : -1;
      accDeltaRef.current = 0; // reset after triggering

      const currentIndex = Math.round((scrollY - offsetTop) / vh);
      const nextIndex = Math.max(
        0,
        Math.min(currentIndex + direction, SLIDE_COUNT - 1),
      );

      if (nextIndex === currentIndex) return;

      isSnappingRef.current = true;
      window.scrollTo({ top: offsetTop + nextIndex * vh, behavior: "smooth" });
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={targetRef}
      className="relative w-full bg-white"
      style={{ height: `${SLIDE_COUNT * 100}vh` }}
    >
      <div
        className="sticky w-full bg-white overflow-hidden"
        style={{ top: `${NAVBAR_HEIGHT}px`, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        {/* Header */}
        <div className="relative z-20 pt-6 pb-2">

          <div className="text-center">
            <p className="anseru-section-tag">How It Works</p>
            <h2 className="anseru-section-title mt-2 mb-4">
              How Anseru Turns Knowledge
              <br />
              Into Winning Deals
            </h2>
            <StepIndicators activeSlide={activeSlide} onGoTo={goTo} />
          </div>
        </div>

        {/* Sliding content strip */}
        <div
          className="absolute left-0 right-0 bottom-0 overflow-hidden"
          style={{ top: "180px" }}
        >
          <motion.div
            style={{
              x: xOffset,
              width: `${SLIDE_COUNT * 100}vw`,
              willChange: "transform",
            }}
            className="flex h-full"
          >
            {slideData.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 h-full"
                style={{ width: "100vw" }}
              >
                <div className="max-w-[1300px] mx-auto h-full px-8 xl:px-16">
                  <div className="grid grid-cols-[5fr_7fr] gap-8 xl:gap-14 h-full py-5">
                    <div className="flex items-center min-h-0">
                      <motion.div
                        className="w-full"
                        animate={{
                          opacity: activeSlide === slide.id ? 1 : 0.2,
                          y: activeSlide === slide.id ? 0 : 16,
                        }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <SlideText slide={slide} />
                      </motion.div>
                    </div>

                    <motion.div
                      className="min-h-0 flex"
                      animate={{
                        opacity: activeSlide === slide.id ? 1 : 0.4,
                        scale: activeSlide === slide.id ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <GradientCard slide={slide} className="flex-1 min-h-0" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   ROOT export
══════════════════════════════════════════════════════════════════ */
export default function Carousel() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <MobileCarousel /> : <DesktopCarousel />;
}
