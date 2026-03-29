import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Import your custom bullet point assets
import salesBullet from "../assets/Group.png";
import securityBullet from "../assets/Group (1).png";
import complianceBullet from "../assets/Group (2).png";

interface Team {
  id: string;
  title: ReactNode;
  description: string;
  gradient: string;
  bulletIcon: string;
  features: (string | ReactNode)[];
  icon: ReactNode;
}

const TeamCard = ({ team }: { team: Team }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    // Only flip on true pointer (mouse), not touch-emulated events
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
    }
  };
  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    // On touch devices, toggle flip on tap
    if (!window.matchMedia("(hover: hover)").matches) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative h-[480px] md:h-[540px] w-full cursor-default"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full bg-[#F8F9FB] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          {/* Top Grid Lines */}
          <div
            className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)`,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }}
          />

          {/* Bottom Grid Lines */}
          <div
            className="absolute inset-x-0 bottom-0 h-[25%] pointer-events-none opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)`,
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            }}
          />

          {/* Gradient Side Bar */}
          <div
            className={`absolute bottom-0 right-0 w-[24px] h-[55%] bg-gradient-to-b ${team.gradient}`}
          />

          {/* Content */}
          <div className="relative p-8 md:p-10 h-full w-full flex flex-col z-10">
            <h3 className="font-normal text-[#111827] mb-3">{team.title}</h3>
            <p className="anseru-section-description pr-4">
              {team.description}
            </p>
            <div className="flex justify-center items-center mt-auto mb-6 pt-6">
              <div className="w-[75%] h-[200px] opacity-90 flex items-center justify-center">
                {team.icon}
              </div>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full bg-[#F8F9FB] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            willChange: "transform",
          }}
        >
          {/* Top Grid Lines */}
          <div
            className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-100"
            style={{
              backgroundImage: `repeating-linear-gradient(to right, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)`,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }}
          />

          {/* Gradient Side Bar */}
          <div
            className={`absolute bottom-0 right-0 w-[24px] h-[55%] bg-gradient-to-b ${team.gradient}`}
          />

          {/* Content */}
          <div className="relative p-8 md:p-10 h-full w-full flex flex-col z-10 mt-10">
            <h3 className="font-normal text-[#111827] mb-10">{team.title}</h3>
            <div className="flex flex-col gap-6 pr-4">
              {team.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-4">
                  <img
                    src={team.bulletIcon}
                    alt="bullet point"
                    className="w-6 h-6 object-contain mt-[2px] shrink-0"
                  />
                  <p className="anseru-section-description leading-[1.5]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProblemSection() {
  const teams = [
    {
      id: "sales",
      title: (
        <>
          Sales
          <br />
          Teams
        </>
      ),
      description:
        "Responding to RFPs and RFIs requires collecting information from different teams & documents, which slows down deal cycles.",
      gradient: "from-[#11119A] to-[#4A86E8]",
      bulletIcon: salesBullet, // Group.png
      features: [
        "Auto-assemble deal context from CRM data, call transcripts, and competitive insights",
        "Detect requirements and map proof points to your strongest capabilities",
        <span key="sales-3">
          Reduce proposal assembly time by{" "}
          <span className="text-[#2C48DB] font-semibold">60%+</span> with
          AI-generated first drafts
        </span>,
      ],
      icon: (
        <svg
          viewBox="0 22 220 246"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
        >
          <path d="M23 36H197" stroke="black" strokeWidth="2" />
          <path d="M52 94H168" stroke="black" strokeWidth="2" />
          <path d="M81 152H139" stroke="black" strokeWidth="2" />
          <path
            d="M110 227.4C119.609 227.4 127.4 219.609 127.4 210C127.4 200.39 119.609 192.6 110 192.6C100.39 192.6 92.5996 200.39 92.5996 210C92.5996 219.609 100.39 227.4 110 227.4Z"
            stroke="black"
            strokeWidth="2"
          />
          <path d="M110 36V192.6" stroke="#888888" strokeDasharray="4 4" />
        </svg>
      ),
    },
    {
      id: "security",
      title: (
        <>
          Security
          <br />
          Teams
        </>
      ),
      description:
        "Vendor security questionnaires require detailed answers about policies, compliance, and infrastructure.",
      gradient: "from-[#D53B44] to-[#3B82F6]",
      bulletIcon: securityBullet, // Group (1).png
      features: [
        "Auto-draft security responses from your verified security documentation",
        "Ground answers in verified security evidence",
        "Cut security review time from hours to minutes",
      ],
      icon: (
        <svg
          viewBox="0 20 285 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block scale-125"
        >
          <path
            d="M142.5 178.125C162.175 178.125 178.125 162.175 178.125 142.5C178.125 122.825 162.175 106.875 142.5 106.875C122.825 106.875 106.875 122.825 106.875 142.5C106.875 162.175 122.825 178.125 142.5 178.125Z"
            stroke="black"
            strokeWidth="2.85"
          />
          <path
            d="M142.5 206.625C177.915 206.625 206.625 177.915 206.625 142.5C206.625 107.085 177.915 78.375 142.5 78.375C107.085 78.375 78.375 107.085 78.375 142.5C78.375 177.915 107.085 206.625 142.5 206.625Z"
            stroke="#444444"
            strokeWidth="2.85"
          />
          <path
            d="M142.5 235.125C193.655 235.125 235.125 193.655 235.125 142.5C235.125 91.3446 193.655 49.875 142.5 49.875C91.3446 49.875 49.875 91.3446 49.875 142.5C49.875 193.655 91.3446 235.125 142.5 235.125Z"
            stroke="#666666"
            strokeWidth="2.85"
          />
          <path
            d="M142.5 263.625C209.395 263.625 263.625 209.395 263.625 142.5C263.625 75.6045 209.395 21.375 142.5 21.375C75.6045 21.375 21.375 75.6045 21.375 142.5C21.375 209.395 75.6045 263.625 142.5 263.625Z"
            stroke="#888888"
            strokeWidth="1.425"
            strokeDasharray="5.7 5.7"
          />
          <path
            d="M142.5 21.375V263.625"
            stroke="#999999"
            strokeWidth="1.425"
            strokeDasharray="5.7 5.7"
          />
        </svg>
      ),
    },
    {
      id: "compliance",
      title: (
        <>
          Compliance
          <br />
          Teams
        </>
      ),
      description:
        "Compliance teams spend hours preparing responses for audits, vendor reviews, and regulatory forms.",
      gradient: "from-[#658CA6] to-[#C9C21A]",
      bulletIcon: complianceBullet, // Group (2).png
      features: [
        "Generate compliance responses with source-backed citations",
        "Enforce mandatory human review for regulatory answers",
        "Maintain a complete audit trail for every response",
      ],
      icon: (
        <svg
          viewBox="0 22 333 333"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block scale-155"
        >
          <path
            d="M266.4 66.5996H66.5996V266.4H266.4V66.5996Z"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M133.199 66.5996V266.4"
            stroke="#666666"
            strokeWidth="1.665"
          />
          <path
            d="M199.801 66.5996V266.4"
            stroke="#666666"
            strokeWidth="1.665"
          />
          <path d="M66.5996 133.2H266.4" stroke="#666666" strokeWidth="1.665" />
          <path d="M66.5996 199.8H266.4" stroke="#666666" strokeWidth="1.665" />
          <path
            d="M66.5996 66.5996L266.4 266.4"
            stroke="#999999"
            strokeWidth="1.665"
            strokeDasharray="6.66 6.66"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full pt-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Header Area */}
        <div className="mb-14 md:mb-5">
          <p className="anseru-section-tag">Customer Problem</p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 text-left">
            <h2 className="anseru-section-title">
              Built for Teams Navigating <br className="hidden md:block" />{" "}
              Complex Deals
            </h2>
            <p className="anseru-section-description max-w-[420px] pb-1">
              Sales, security, and compliance teams rely on <br /> Anseru to
              generate accurate responses faster.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {teams.map((team, idx) => (
            <TeamCard key={idx} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
