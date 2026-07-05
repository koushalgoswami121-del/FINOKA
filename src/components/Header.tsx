import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ cartCount, onOpenCart, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 30);

      if (isMobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const navItems = [
    { label: "HOME", targetId: "hero" },
    { label: "FLAVORS", targetId: "flavors-catalog" },
    { label: "ABOUT", targetId: "about" },
    { label: "INGREDIENTS", targetId: "ingredients" },
    { label: "SHOP", targetId: "shop-quiz" },
  ];

  const handleNavClick = (targetId: string) => {
    onScrollToSection(targetId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isScrolled
          ? "bg-stone-950/85 backdrop-blur-xl border-white/5 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-14">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex flex-col items-start text-left focus:outline-none cursor-pointer group"
          id="logo-btn"
        >
          <span className="font-bebas text-2xl tracking-wider text-white group-hover:text-stone-300 transition-colors">
            FINOKA
          </span>
          <span className="block text-[8px] tracking-[0.3em] font-medium text-gray-500 uppercase mt-0.5">
            COLD DRINK
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.targetId)}
              className="font-bebas text-sm text-gray-400 hover:text-white transition-colors tracking-widest focus:outline-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="font-geist text-xs border border-white/15 hover:border-white/30 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 relative group focus:outline-none cursor-pointer hover:shadow-lg hover:shadow-white/5"
            id="open-cart-header"
          >
            <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="font-bold">CART</span>
            <span className="bg-white/10 group-hover:bg-black/10 px-1.5 py-0.2 rounded-full font-semibold text-[10px] text-gray-300 group-hover:text-black shrink-0 font-geist">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-stone-950 border-b border-white/10 p-6 flex flex-col gap-5 text-left shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.targetId)}
              className="font-bebas text-lg text-gray-300 hover:text-white transition-colors tracking-widest text-left py-1 focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
