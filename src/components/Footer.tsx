interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 border-t border-white/5 py-12 text-white" id="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Logo and Subtitle */}
        <button
          onClick={() => onScrollToSection("hero")}
          className="flex flex-col items-start text-left focus:outline-none cursor-pointer group"
          id="footer-logo-btn"
        >
          <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-stone-300 transition-colors">
            FINOKA
          </span>
          <span className="block text-[8px] tracking-[0.3em] font-medium text-gray-600 uppercase mt-0.5">
            SINCE 2024
          </span>
        </button>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-bebas tracking-widest text-gray-500">
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 uppercase"
            id="privacy-link"
          >
            PRIVACY POLICY
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors duration-300 uppercase"
            id="terms-link"
          >
            TERMS OF SERVICE
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 uppercase"
            id="instagram-link"
          >
            INSTAGRAM
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 uppercase"
            id="twitter-link"
          >
            TWITTER
          </a>
        </div>

        {/* Copyright */}
        <p className="font-geist text-[10px] md:text-xs text-gray-600 tracking-wider">
          © {currentYear} FINOKA COLD DRINK. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
