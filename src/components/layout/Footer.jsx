import logoSrc from '../../assets/logo-400.webp';

export function Footer() {
  return (
    <footer className="w-full bg-[#f4f4f5]">
      <div className="flex justify-center pt-8 md:pt-12 mb-5">
        <img src={logoSrc} alt="Anseru Logo" className="h-8 md:h-10 object-contain" loading="lazy" />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-[14px] text-gray-500">© 2026 Anseru Inc. All rights reserved.</p>
        <div className="flex gap-6 text-[14px]">
          <a href="#" className="text-gray-500 hover:text-black transition">Terms of Service</a>
          <a href="#" className="text-gray-500 hover:text-black transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
