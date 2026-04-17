import logoSrc from '../../assets/logo-400.webp';
import logoSrcset from '../../assets/logo-400.webp?w=200;400&format=webp&as=srcset';
export function Footer() {
  return (
    <footer className="w-full bg-[#f4f4f5]">
      <div className="flex justify-center pt-8 md:pt-12 mb-5">
        <img 
          src={logoSrc} 
          srcSet={logoSrcset}
          sizes="(max-width: 768px) 152px, 200px"
          alt="Anseru Logo" 
          width={152} 
          height={40} 
          className="h-8 md:h-10 object-contain" 
          loading="lazy" 
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-[14px] text-gray-600">© 2026 Anseru Inc. All rights reserved.</p>
        <div className="flex gap-6 text-[14px]">
          <a href="/terms-of-service" className="text-gray-600 hover:text-black transition">Terms of Service</a>
          <a href="/privacy-policy" className="text-gray-600 hover:text-black transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
