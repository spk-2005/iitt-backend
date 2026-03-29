import { useState } from "react";

import IconLiving from "../assets/living.png";
import IconFrame from "../assets/Frame.png";
import IconEvidence from "../assets/evidence.png";
import IconGovernance from "../assets/governance.png";

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const stripedStyle = {
    backgroundImage:
      "repeating-linear-gradient(90deg, #f3f4f6 0px, #f3f4f6 1px, transparent 1px, transparent 12px)",
  };

  const features = [
    {
      title: "Living\nKnowledge Graph",
      shortDescription:
        "Your always-on Deal knowledge graph that learns as you win.",
      longDescription:
        "Centralize and continuously improve your RFP knowledge.",
      blueHex: "#1C36E4",
      iconPos: "top-left",
      textPos: "bottom",
      bullets: [
        "Automatically indexes RFPs, security docs, proposals, and internal content",
        "Stays current with real-time source updates — no manual maintenance",
        "Gets smarter with every deal, surfacing the most relevant past responses",
      ],
      iconPng: IconLiving,
    },
    {
      title: "Cross-Team\nCollaboration",
      shortDescription:
        "Align sales, legal, security, and SMEs around every Deal in one place",
      longDescription:
        "Align sales, legal, security, and SMEs around every Deal in one place",
      blueHex: "#1C36E4",
      iconPos: "bottom-right",
      textPos: "top",
      bullets: [
        "Assign sections to the right SMEs with role-based task management",
        "Real-time co-editing with full version history and audit trail",
        "Integrated review workflows to finalize proposals faster",
      ],
      iconPng: IconFrame,
    },
    {
      title: "Evidence & Citation\nEngine",
      shortDescription:
        "Answers you can trust with sources to prove it.",
      longDescription:
        "Answers you can trust — with sources to prove it.",
      blueHex: "#1C36E4",
      iconPos: "top-right",
      textPos: "bottom",
      bullets: [
        "Every response is automatically linked to the source document it was drawn from",
        "Highlights low-confidence answers for human review before submission",
        "Builds evaluator trust with transparent, auditable response generation",
      ],
      iconPng: IconEvidence,
    },
    {
      title: "Governance &\nAnalytics",
      shortDescription:
        "Full visibility into every Deal from first draft to final submission",
      longDescription:
        "Full visibility into every Deal — from first draft to final submission",
      blueHex: "#1C36E4",
      iconPos: "bottom-right",
      textPos: "top",
      bullets: [
        "Track RFP status, completion rates, and submission deadlines in real time",
        "Analyze win/loss patterns to improve future proposal strategy",
        "Enforce content standards with approval workflows and compliance controls",
      ],
      iconPng: IconGovernance,
    },
  ];

  const AsteriskIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A1A1AA"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 mt-[2px]"
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
    </svg>
  );

  return (
    <div className="w-full pt-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-5 md:mb-10 gap-6 md:gap-8">
          <div className="space-y-3">
            <p className="anseru-section-tag">Platform Features</p>
            <h2 className="anseru-section-title">
              Powerful Capabilities for
              <br className="hidden md:block" /> Modern Deal Teams
            </h2>
          </div>
          <p className="text-base md:text-lg text-black/60 max-w-md leading-tight">
            Centralize knowledge, generate accurate responses, and collaborate
            seamlessly across teams.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-4">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                className={`relative bg-[#f8f9fa] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden w-full cursor-pointer lg:h-[480px] ${
                  isHovered
                    ? "min-h-[400px] lg:min-h-0"
                    : "min-h-[200px] lg:min-h-0"
                }`}
                style={{
                  flex: hoveredIndex === -1 ? 1 : isHovered ? 2.8 : 0.85,
                }}
              >
                <div className="flex flex-col flex-grow h-full">
                  {feature.textPos === "top" && !isHovered ? (
                    <>
                      <div className={`p-6 md:p-8 flex-grow transition-all duration-500 ${isHovered ? "pl-12 md:pl-16" : ""}`}>
                        <h3 className="font-medium text-gray-900 mb-3 whitespace-pre-line leading-tight">
                          {feature.title}
                        </h3>

                        <p className={`text-sm md:text-[15px] text-gray-500 leading-relaxed`}>
                          {isHovered
                            ? feature.longDescription
                            : feature.shortDescription}
                        </p>

                        <div
                          className={`grid transition-all duration-500 ${
                            isHovered
                              ? "grid-rows-[1fr] mt-6 opacity-100"
                              : "grid-rows-[0fr] mt-0 opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="flex flex-col gap-4 pb-4">
                              {feature.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <AsteriskIcon />
                                  <span className="text-sm md:text-[15px] text-gray-600">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="h-20 md:h-[104px] flex w-full mt-auto">
                        <div className="flex-grow" style={stripedStyle}></div>
                        <div
                          className="w-20 md:w-[104px] flex items-center justify-center"
                          style={{ backgroundColor: feature.blueHex }}
                        >
                          <img src={feature.iconPng} className="w-10 md:w-16" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-20 md:h-[104px] flex w-full">
                        <div
                          className="w-20 md:w-[104px] flex items-center justify-center"
                          style={{ backgroundColor: feature.blueHex }}
                        >
                          <img src={feature.iconPng} className="w-10 md:w-16" />
                        </div>
                        <div className="flex-grow" style={stripedStyle}></div>
                      </div>

                      <div className={`p-6 md:p-8 flex flex-col justify-end flex-grow transition-all duration-500 ${isHovered ? "pl-12 md:pl-16" : ""}`}>
                        <h3 className="font-medium text-gray-900 mb-3 whitespace-pre-line leading-tight">
                          {feature.title}
                        </h3>

                        <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed whitespace-pre-line">
                          {isHovered
                            ? feature.longDescription
                            : feature.shortDescription}
                        </p>

                        <div
                          className={`grid transition-all duration-500 ${
                            isHovered
                              ? "grid-rows-[1fr] mt-6 opacity-100"
                              : "grid-rows-[0fr] mt-0 opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="flex flex-col gap-4 pb-4">
                              {feature.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <AsteriskIcon />
                                  <span className="text-sm md:text-[15px] text-gray-600">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}