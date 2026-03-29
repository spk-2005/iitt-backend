import { motion } from "framer-motion";

// Asset imports
import slack from "../assets/slack icon.png";
import notion from "../assets/notion icon.png";
import drive from "../assets/drive icon.png";
import hubspot from "../assets/Hubspot Icon.png";
import zendesk from "../assets/zendesk icon.png";
import teams from "../assets/teams icon.png";
import seismic from "../assets/seismic icon.png";
import onedrive from "../assets/onedrive icon.png";
import highspot from "../assets/highspot icon.png";
import gong from "../assets/gong icon.png";

export default function Integrations() {
  const col1 = [seismic, drive, zendesk, onedrive];
  const col2 = [highspot, slack, gong];
  const col3 = [hubspot, zendesk, notion, teams];

  // Duplicate arrays to create a seamless infinite loop effect
  const repeatedCol1 = [...col1, ...col1];
  const repeatedCol2 = [...col2, ...col2, ...col2]; // Tripled so it fills the height properly for down-scroll
  const repeatedCol3 = [...col3, ...col3];

  const Card = ({ logo }: { logo: string }) => (
    <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-xl md:rounded-2xl border border-gray-100 bg-[#F3F3F3] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow shrink-0">
      <img
        src={logo}
        alt="integration logo"
        className="w-8 h-8 md:w-10 md:h-10 object-contain"
      />
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
        
        {/* TEXT SECTION – order-first on mobile, order-last on md */}
        <div className="text-center md:text-left flex-1 order-first md:order-last">
          <p className="anseru-section-tag">
            Integrations
          </p>
          <h2 className="anseru-section-title">
            Connect to the Tools <br className="hidden md:block" />
            You Already Use
          </h2>
         
        </div>

        {/* FRAME CONTAINER – order-last on mobile, order-first on md */}
        <div className="w-full max-w-[420px] aspect-square bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center relative pointer-events-none order-last md:order-first">
          
          {/* Top & Bottom fade gradients for a polished look */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent z-10" />
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-10" />

          {/* LOGO GRID */}
          <div className="flex gap-3 md:gap-4 items-center h-[200%]">
            
            {/* Column 1 - Scrolling Up */}
            <div className="mt-10 md:mt-20 overflow-visible">
              <motion.div
                className="flex flex-col gap-3 md:gap-4"
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                {repeatedCol1.map((logo, i) => (
                  <Card key={`col1-${i}`} logo={logo} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 - Scrolling Down */}
            <div className="overflow-visible">
              <motion.div
                className="flex flex-col gap-3 md:gap-4"
                animate={{ y: ["-50%", "0%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {repeatedCol2.map((logo, i) => (
                  <Card key={`col2-${i}`} logo={logo} />
                ))}
              </motion.div>
            </div>

            {/* Column 3 - Scrolling Up */}
            <div className="mt-5 md:mt-10 overflow-visible">
              <motion.div
                className="flex flex-col gap-3 md:gap-4"
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {repeatedCol3.map((logo, i) => (
                  <Card key={`col3-${i}`} logo={logo} />
                ))}
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}