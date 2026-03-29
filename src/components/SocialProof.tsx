export default function SocialProof() {
  const logos = [
    { name: "Superhuman", src: "https://api.builder.io/api/v1/image/assets/TEMP/d4b42bd6ed4e032868adf4cb20f9c19881a97504" },
    { name: "Sirion", src: "https://api.builder.io/api/v1/image/assets/TEMP/6c1ea805c2f6bc0ae21e858275662112a496da17" },
    { name: "ActivTrak", src: "https://api.builder.io/api/v1/image/assets/TEMP/29be8c74b1526db41a8dcea9b994d231c827ea8c" },
    { name: "Logo 4", src: "https://api.builder.io/api/v1/image/assets/TEMP/d57b6362234fc67f5dd5a6010e02340710f11bdf" },
    { name: "Logo 5", src: "https://api.builder.io/api/v1/image/assets/TEMP/6c1ea805c2f6bc0ae21e858275662112a496da17" },
  ];

  return (
    <div className="w-full py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="anseru-section-tag">
            Trusted By Industry Leaders
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 md:gap-8 items-center justify-center flex-wrap">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-16 md:h-24 px-6 md:px-10 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-8 md:max-h-12 max-w-[120px] md:max-w-[150px] object-contain opacity-70 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
