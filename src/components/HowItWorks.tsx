import intro from "../assets/Intro Page.png";

export default function HowItWorks() {
  const points = [
    "Automatically indexes past RFPs, security docs, and content",
    "Keeps responses accurate with up-to-date sources",
    "Improves continuously as teams use the platform",
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side - text content */}
          <div className="space-y-6 text-center md:text-left">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
              How it Works
            </p>
            <h2 className="anseru-section-title">Connect your knowledge</h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              Anseru AI offers a centralized hub for all your knowledge sources.
              Upload previous RFPs, relevant documents, and Q&A from legacy
              tools or spreadsheets. Seamlessly integrate with internal data
              systems like Google Drive, SharePoint, and more, pull information
              directly from your website.
            </p>

            <div className="space-y-4 pt-4 text-left">
              {points.map((point, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 28 26"
                    fill="none"
                    className="flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 0L14.1938 11.3187C14.2016 11.774 14.7911 12.0007 15.1434 11.6839L23.8995 3.80761L15.4174 11.9384C15.0762 12.2654 15.3203 12.8129 15.8106 12.8201L28 13L15.8106 13.1799C15.3203 13.1872 15.0762 13.7346 15.4174 14.0617L23.8995 22.1924L15.1434 14.3161C14.7911 13.9993 14.2016 14.226 14.1938 14.6813L14 26L13.8063 14.6813C13.7985 14.226 13.2089 13.9993 12.8567 14.3161L4.1005 22.1924L12.5827 14.0617C12.9239 13.7346 12.6797 13.1872 12.1894 13.1799L0 13L12.1894 12.8201C12.6797 12.8129 12.9239 12.2654 12.5827 11.9384L4.1005 3.80761L12.8567 11.6839C13.2089 12.0007 13.7985 11.774 13.8063 11.3187L14 0Z"
                      fill="#3D3D3D"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm md:text-base font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - integration showcase */}
          <div className="gradient-a3 rounded-2xl p-8 md:p-12 text-white min-h-[350px] md:min-h-[450px] flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 opacity-20 gradient-a3">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d26bb697857f6dfdecc5fd729678160d30796f2e?width=1114"
                alt="background"
                className="w-full h-full object-cover"
                style={{ mixBlendMode: "overlay" }}
              />
            </div>

            <div className="relative z-10 space-y-4">
              <p className="text-xs md:text-sm font-medium uppercase tracking-widest opacity-90">
                Ask. Find. Respond—instantly.
              </p>
              <h2 className="font-medium tracking-tight">
                Turn complex RFPs into clear, winning responses
              </h2>
            </div>

            <div className="relative mt-8 translate-y-4 md:translate-y-15 md:translate-x-15 z-10">
              <img
                src={intro}
                alt="Anseru Interface"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
