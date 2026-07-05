import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, Leaf, Shield, Sparkles } from "lucide-react";
import { Flavor } from "../types";
import { FLAVORS } from "../data";
import TransparentImage from "./TransparentImage";

interface HeroProps {
  currentFlavorIndex: number;
  onFlavorChange: (index: number) => void;
  onOpenDetails: () => void;
  onAddToCart: (flavorId: number, packSize: "single" | "6-pack" | "12-pack", qty: number) => void;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({
  currentFlavorIndex,
  onFlavorChange,
  onOpenDetails,
  onAddToCart,
  onOpenCart,
  onScrollToSection,
}: HeroProps) {
  const [direction, setDirection] = useState<"left" | "right">("right");

  const [bubbles, setBubbles] = useState<{ id: number; size: number; x: number; delay: number; duration: number }[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  // Active flavor object
  const activeFlavor = FLAVORS[currentFlavorIndex];

  // Particle System (Bubbles)
  useEffect(() => {
    const generatedBubbles = Array.from({ length: 25 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 8 + 2,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 4,
    }));
    setBubbles(generatedBubbles);
  }, []);



  const handleNext = () => {
    setDirection("right");
    const nextIdx = (currentFlavorIndex + 1) % FLAVORS.length;
    onFlavorChange(nextIdx);
  };

  const handlePrev = () => {
    setDirection("left");
    const prevIdx = (currentFlavorIndex - 1 + FLAVORS.length) % FLAVORS.length;
    onFlavorChange(prevIdx);
  };

  const slideVariants = {
    initial: (dir: "left" | "right") => ({
      x: dir === "right" ? 120 : -120,
      opacity: 0,
      rotate: dir === "right" ? 15 : -15,
      scale: 0.8,
      filter: "blur(12px)",
    }),
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -120 : 120,
      opacity: 0,
      rotate: dir === "right" ? -15 : 15,
      scale: 0.8,
      filter: "blur(12px)",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    }),
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 md:pt-16 pb-12 overflow-hidden bg-stone-950 select-none text-white"
      id="hero"
    >
      {/* Floating Bubbles System */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-white/20 bottom-0 animate-float-up"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Glow Bloom */}
      <div
        className="absolute top-1/2 left-1/2 w-[600px] md:w-[850px] h-[600px] md:h-[850px] blur-[150px] md:blur-[220px] opacity-15 md:opacity-20 rounded-full z-0 pointer-events-none transition-colors duration-1000 transform -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: activeFlavor.color }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-12 gap-y-12 md:gap-x-8 items-center pt-8">
        {/* Left Column Content */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-start text-left gap-6 md:gap-8 order-2 md:order-1">
          <div className="flex flex-col gap-2">
            <span
              className="font-geist text-xs md:text-sm tracking-[0.25em] font-bold uppercase transition-colors duration-1000"
              style={{ color: activeFlavor.color }}
              id="hero-subtitle"
            >
              REFRESH YOUR WORLD
            </span>
            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl xl:text-9xl leading-none tracking-wider">
              FINOKA
            </h1>
            <span className="font-bebas text-3xl md:text-4xl text-gray-400 opacity-60 tracking-widest mt-1">
              COLD DRINK
            </span>
          </div>

          <p className="font-hanken text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
            Premium quality. Bold flavors. Pure refreshment. Made for those who choose an extraordinary lifestyle.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onScrollToSection("shop-quiz")}
              className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-white/30 px-6 py-3.5 rounded-full font-geist font-bold text-xs tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-95 hover:shadow-lg hover:shadow-white/5 group"
              id="explore-flavors-btn"
            >
              EXPLORE FLAVORS
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white transition-all" />
            </button>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-4 mt-4 bg-white/5 border border-white/5 p-4 rounded-2xl w-fit" id="benefit-badge">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Leaf className="w-5 h-5" style={{ color: activeFlavor.color }} />
            </div>
            <div>
              <p className="font-geist text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
                No Artificial Colors
              </p>
              <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                100% Premium Ingredients
              </p>
            </div>
          </div>
        </div>

        {/* Central Column Carousel */}
        <div className="col-span-12 md:col-span-4 relative flex justify-center items-center h-[280px] sm:h-[360px] md:h-[720px] order-1 md:order-2">
          {/* Nav chevrons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-8 lg:-left-12 z-30 w-12 md:w-14 h-12 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all focus:outline-none cursor-pointer"
            id="prev-flavor-btn"
          >
            <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-8 lg:-right-12 z-30 w-12 md:w-14 h-12 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all focus:outline-none cursor-pointer"
            id="next-flavor-btn"
          >
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          {/* Dynamic Bottle Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentFlavorIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"

                className="relative z-20 w-44 sm:w-56 md:w-80 h-[260px] sm:h-[320px] md:h-[640px] lg:h-[700px] flex items-center justify-center transform-gpu scale-110 md:scale-115 lg:scale-120"
              >
                <div 
                  onClick={onOpenDetails}
                  className="animate-float-bottle w-full h-full flex items-center justify-center cursor-zoom-in"
                  title="Click to view details"
                >
                  <TransparentImage
                    src={activeFlavor.image}
                    alt={activeFlavor.name}
                    className="h-full w-auto object-contain drop-shadow-[0_25px_60px_rgba(255,255,255,0.18)] hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Realistic Shadow */}
            <div className="absolute bottom-[4%] md:bottom-[2%] w-56 md:w-72 h-8 md:h-12 bg-black/70 blur-2xl rounded-full z-10" />
          </div>
        </div>

        {/* Right Column Content */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right gap-6 md:gap-7 order-3 md:order-3">
          <div className="flex flex-col gap-1 items-center md:items-end">
            <span className="font-geist text-xs text-gray-500 tracking-[0.3em]" id="flavor-index">
              0{activeFlavor.id + 1} / 05
            </span>
            <h2
              className="font-bebas text-5xl md:text-6xl tracking-widest transition-colors duration-1000"
              style={{ color: activeFlavor.color }}
              id="flavor-name"
            >
              {activeFlavor.name}
            </h2>
          </div>

          <p className="font-hanken text-gray-400 text-sm md:text-base leading-relaxed max-w-xs" id="flavor-desc">
            {activeFlavor.tagline} {activeFlavor.desc}
          </p>

          <div className="flex flex-col items-center md:items-end gap-3 mt-2">
            <button
              onClick={() => {
                onAddToCart(activeFlavor.id, "single", 1);
                onOpenCart();
              }}
              className="bg-white hover:bg-stone-200 text-black font-geist font-black text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-white/5 hover:-translate-y-0.5 active:scale-95"
              id="buy-btn"
            >
              BUY NOW — ${activeFlavor.price.toFixed(2)}
            </button>
            <button
              onClick={onOpenDetails}
              className="font-geist text-xs text-gray-400 hover:text-white border-b border-white/10 hover:border-white py-1 transition-all uppercase tracking-wider font-bold"
              id="view-details-btn"
            >
              VIEW ALL DETAILS
            </button>
          </div>

          {/* Color Switcher Swatches */}
          <div className="flex gap-4 mt-6">
            {FLAVORS.map((flavor, index) => {
              const isActive = index === currentFlavorIndex;
              return (
                <button
                  key={flavor.id}
                  onClick={() => {
                    setDirection(index > currentFlavorIndex ? "right" : "left");
                    onFlavorChange(index);
                  }}
                  className={`w-6 h-6 rounded-full transition-all duration-300 relative cursor-pointer ${
                    isActive ? "scale-130 border-2 border-white" : "opacity-40 hover:opacity-100 hover:scale-130"
                  }`}
                  style={{
                    backgroundColor: flavor.color,
                    boxShadow: isActive ? `0 0 20px ${flavor.color}, 0 0 8px ${flavor.color}88` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.boxShadow = `0 0 15px ${flavor.color}cc, 0 0 6px ${flavor.color}55`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                  title={flavor.name}
                  id={`swatch-${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-40 pointer-events-none hidden md:flex">
        <span className="font-geist text-[9px] tracking-[0.3em] uppercase">Scroll to Discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Faded Bottom Overlay Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none z-10" />
    </div>
  );
}
