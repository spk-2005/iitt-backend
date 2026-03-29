import dropbox from "../assets/dropbox.png"
import drive from "../assets/drive.png"
import teams from "../assets/teams.png"
import slack from "../assets/slack.png"
import jira from "../assets/jira.png"
import circle from "../assets/circle.png"

export default function DealInfrastructure() {
  const icons = [
    { src: dropbox, className: "md:left-1/2 md:-translate-x-1/2 md:-top-24" },
    { src: jira, className: "md:left-[25%] md:top-[1%]" },
    { src: slack, className: "md:left-[10%] md:top-[30%]" },
    { src: drive, className: "md:right-[25%] md:top-[1%]" },
    { src: teams, className: "md:right-[10%] md:top-[30%]" },
  ];

  return (
    <section className="w-full py-20 md:py-40">
      <div className="max-w-7xl mx-auto px-6 text-center relative">

        {/* Integration Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 md:mb-0 md:absolute md:inset-0 md:block">
          {icons.map((icon, idx) => (
            <img
              key={idx}
              src={icon.src}
              alt="Integration Icon"
              className={`w-16 h-16 md:w-[100px] md:h-[100px] opacity-90 transition-transform hover:scale-105 md:absolute ${icon.className}`}
            />
          ))}
        </div>

        {/* Center Circle Image */}
        <div className="flex justify-center mb-8">
          <img
            src={circle}
            className="w-24 h-24 md:w-31 md:h-31 object-contain"
            alt="center circle"
          />
        </div>

        {/* Text */}
        <div className="space-y-4">
          <p className="text-gray-600 text-base md:text-lg">
            We are building next generation of
          </p>
          <h2 className="anseru-section-title">
            Deal Infrastructure
          </h2>
        </div>

      </div>
    </section>
  )
}
