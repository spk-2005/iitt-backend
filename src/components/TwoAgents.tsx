import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import knoxIcon from "../assets/Sud.png";
import kgIcon from "../assets/kg.png";
import noiseImage from "../assets/noise.png";
import frame9 from "../assets/Frame (9).png";
import frame10 from "../assets/Frame (10).png";

const agentData = {
  archer: {
    title: "RFP Agent - Archer",
    gradient: "linear-gradient(180deg, #201cae 0%, #6aa4ee 100%)",
    tags: [
      "Instant RFP breakdown",
      "Terminology translation",
      "Proposal-ready answers",
    ],
    stats: [
      {
        heading: "Instant RFP\nintelligence",
        detail:
          "Automatically extracts key requirements, timelines, stakeholders, and evaluation criteria.",
      },
      {
        heading: "Terminology\nmapping",
        detail:
          "Translates feature requirements to your internal product language.",
      },
      {
        heading: "Bid / No–\nBid clarity",
        detail: "Helps teams decide whether to pursue.",
      },
      {
        heading: "Structured proposal\ngeneration",
        detail:
          "Generates responses across technical, product, security, and legal sections with contextual intelligence.",
      },
    ],
    switchLabel: "Meet Knox",
    switchIcon: kgIcon,
    decorativeImage: frame9,
  },

  knox: {
    title: "Security\nQuestionnaire Agent - Knox",
    gradient: "linear-gradient(45deg, #1d80f9 0%, #e74f62 100%)",
    tags: ["Evidence-backed answers", "No contradictions", "Compliance-ready"],
    stats: [
      {
        heading: "95%+ response\naccuracy",
        detail: "Generated from verified security documentation.",
      },
      {
        heading: "70–90% faster\nreviews",
        detail: "Eliminates repetitive questionnaires saving SME time",
      },
      {
        heading: "Audit–ready\nanswers",
        detail: "Aligned with current policies and controls.",
      },
      {
        heading: "Evidence–backed\nresponses",
        detail:
          "Every answer is grounded in policies, certifications, and security evidence.",
      },
    ],
    switchLabel: "Meet Archer",
    switchIcon: knoxIcon,
    decorativeImage: frame10,
  },
};

/** Single agent card used by the mobile tab view */
const AgentCard = ({ agent }: { agent: typeof agentData.archer }) => {
  const headingclass = "anseru-card-title";
  const detailclass = "anseru-section-tag";

  return (
    <div className="border border-black/30 rounded-xl overflow-hidden flex flex-col">
      {/* Gradient panel */}
      <div className="p-3.5 bg-white border-b border-[#e5e7eb]">
        <div
          className="relative flex flex-col justify-between p-8 h-[360px] overflow-hidden"
          style={{ background: agent.gradient }}
        >
          <div
            className="absolute inset-0 opacity-100 pointer-events-none"
            style={{
              backgroundImage: `url(${noiseImage})`,
              backgroundSize: "200px 200px",
            }}
          />
          <div className="relative">
            <img
              src={agent.decorativeImage}
              alt=""
              className="w-28 h-auto opacity-90"
            />
          </div>
          <div className="relative mt-auto">
            <h3 className="anseru-card-title text-white mb-4 whitespace-pre-line leading-[1.3] md:leading-tight">
              {agent.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-white text-[13px] px-3 py-1 bg-white/20 rounded-[4px] border border-white/40 font-normal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats 2×2 */}
      <div className="p-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: "150px 150px",
          }}
        />
        <div className="grid grid-cols-2 grid-rows-2 bg-[#f4f4f5] relative z-10">
          {agent.stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 sm:p-8 min-h-[180px] flex flex-col justify-between
                ${i < 2 ? "border-b" : ""}
                ${i % 2 === 0 ? "border-r" : ""}
                border-[#e5e7eb]`}
            >
              <h4 className={headingclass}>{stat.heading}</h4>
              <p className={detailclass}>{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TwoAgents() {
  const [activeAgent, setActiveAgent] = useState<"archer" | "knox">("archer");
  const targetRef = useRef<HTMLDivElement>(null);
  const isSnappingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const slideIndexSpring = useSpring(0, {
    stiffness: 260,
    damping: 32,
    mass: 0.6,
  });

  const xOffset = useTransform(slideIndexSpring, [0, 1], ["0%", "-50%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const continuousIndex = latest;
    slideIndexSpring.set(continuousIndex);

    const discreteIndex = Math.round(continuousIndex);
    const newAgent = discreteIndex === 0 ? "archer" : "knox";
    if (newAgent !== activeAgent) setActiveAgent(newAgent);
  });

  const goTo = useCallback((index: number) => {
    if (!targetRef.current) return;
    const offsetTop = targetRef.current.offsetTop;
    const vh = window.innerHeight;
    isSnappingRef.current = true;
    window.scrollTo({ top: offsetTop + index * vh, behavior: "smooth" });
    setTimeout(() => {
      isSnappingRef.current = false;
    }, 500);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!targetRef.current || isSnappingRef.current) return;

      // Disable scroll jacking on mobile/tablet (no hover = no mouse wheel intent)
      if (!window.matchMedia("(hover: hover)").matches) return;

      const offsetTop = targetRef.current.offsetTop;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const totalH = targetRef.current.clientHeight;

      if (scrollY < offsetTop || scrollY > offsetTop + totalH - vh) return;

      e.preventDefault();

      const currentIndex = Math.round((scrollY - offsetTop) / vh);
      let nextIndex = currentIndex;

      if (e.deltaY > 0) nextIndex = currentIndex + 1;
      else nextIndex = currentIndex - 1;

      const maxIndex = Math.floor(totalH / vh) - 1;
      nextIndex = Math.max(0, Math.min(nextIndex, maxIndex));

      isSnappingRef.current = true;
      window.scrollTo({ top: offsetTop + nextIndex * vh, behavior: "smooth" });
      setTimeout(() => {
        isSnappingRef.current = false;
      }, 600);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const headingclass = "anseru-card-title";
  const detailclass = "anseru-section-tag";

  /* ── Tab button shared between mobile and desktop ── */
  const TabButtons = ({
    onClickArcher,
    onClickKnox,
  }: {
    onClickArcher: () => void;
    onClickKnox: () => void;
  }) => (
    <div className="inline-flex w-fit items-center gap-1 bg-gray-100 p-1 rounded-xl">
      <button
        onClick={onClickArcher}
        className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-medium text-sm md:text-[16px] transition-all cursor-pointer ${
          activeAgent === "archer"
            ? "bg-black text-white"
            : "bg-transparent text-black hover:bg-gray-200"
        }`}
      >
        Meet Archer
        <img
          src={knoxIcon}
          alt="archer"
          width="16"
          height="16"
          className={activeAgent === "archer" ? "brightness-0 invert" : ""}
        />
      </button>

      <button
        onClick={onClickKnox}
        className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-medium text-sm md:text-[16px] transition-all cursor-pointer ${
          activeAgent === "knox"
            ? "bg-black text-white"
            : "bg-transparent text-black hover:bg-gray-200"
        }`}
      >
        Meet Knox
        <img
          src={kgIcon}
          alt="knox"
          width="16"
          height="16"
          className={activeAgent === "knox" ? "brightness-0 invert" : ""}
        />
      </button>
    </div>
  );

  return (
    <>
      <div className="lg:hidden w-full bg-white pb-7 px-4 sm:px-6">
        <div className="max-w-[1200px]  mx-auto w-full">
          <div className="flex flex-col gap-4 mb-6">
            <div className="space-y-1">
              <p className="anseru-section-tag">Proven Results</p>
              <h2 className="anseru-section-title">Two Super Agents</h2>
            </div>
            <TabButtons
              onClickArcher={() => setActiveAgent("archer")}
              onClickKnox={() => setActiveAgent("knox")}
            />
          </div>

          {activeAgent === "archer" ? (
            <AgentCard agent={agentData.archer} />
          ) : (
            <AgentCard agent={agentData.knox} />
          )}
        </div>
      </div>

      <div
        ref={targetRef}
        className="hidden lg:block w-full bg-white relative h-[200vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col pt-16 pb-7 overflow-hidden">
          {/* Heading inside sticky */}
          <div className="max-w-[1200px] mx-auto px-6 w-full mb-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
              <div className="space-y-1">
                <p className="anseru-section-tag">Proven Results</p>
                <h2 className="anseru-section-title">Two Super Agents</h2>
              </div>
              <TabButtons
                onClickArcher={() => goTo(0)}
                onClickKnox={() => goTo(1)}
              />
            </div>
          </div>

          {/* Card inside sticky */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 w-full h-full">
              <div className="border border-black/30 rounded-xl overflow-hidden h-full">
                <motion.div
                  style={{ x: xOffset, willChange: "transform" }}
                  className="flex w-[200%] h-full"
                >
                  {Object.entries(agentData).map(([key, agent]) => (
                    <div
                      key={key}
                      className="w-1/2 flex flex-col lg:flex-row flex-shrink-0 items-stretch"
                    >
                      {/* LEFT */}
                      <div className="lg:w-[48%] p-3.5 bg-white border lg:border-b-0 lg:border-r border-[#e5e7eb] flex-shrink-0">
                        <div
                          className="relative flex flex-col justify-between p-10 h-full overflow-hidden"
                          style={{ background: agent.gradient }}
                        >
                          <div
                            className="absolute inset-0 opacity-100 pointer-events-none"
                            style={{
                              backgroundImage: `url(${noiseImage})`,
                              backgroundSize: "200px 200px",
                            }}
                          />
                          <div className="relative">
                            <img
                              src={agent.decorativeImage}
                              alt=""
                              className="w-36 h-auto opacity-90"
                            />
                          </div>
                          <div className="relative mt-auto">
                            <h3 className="anseru-card-title text-white mb-4 whitespace-pre-line leading-[1.3] md:leading-tight">
                              {agent.title}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                              {agent.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-white text-[13px] md:text-[14px] px-3.5 py-1.5 bg-white/20 rounded-[4px] border border-white/40 font-normal"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="p-4 relative overflow-hidden border border-l-black/60">
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.1]"
                          style={{
                            backgroundImage: `
                          linear-gradient(to right, #000 1px, transparent 1px),
                          linear-gradient(to bottom, #000 1px, transparent 1px)
                        `,
                            backgroundSize: "150px 150px",
                          }}
                        />
                        <div className="h-full grid grid-cols-2 grid-rows-2 bg-[#f4f4f5] relative z-10">
                          {agent.stats.map((stat, i) => (
                            <div
                              key={i}
                              className={`p-8 md:p-5 flex flex-col justify-between
                            ${i < 2 ? "border-b" : ""}
                            ${i % 2 === 0 ? "border-r" : ""}
                            border-[#e5e7eb]`}
                            >
                              <h4 className={headingclass}>{stat.heading}</h4>
                              <p className={detailclass}>{stat.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
