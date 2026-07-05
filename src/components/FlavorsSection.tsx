import { useState } from "react";
import { motion } from "motion/react";
import { FLAVORS } from "../data";
import { ShoppingBag, ArrowRight, Eye, Sparkles } from "lucide-react";
import TransparentImage from "./TransparentImage";

interface FlavorsSectionProps {
  onAddToCart: (flavorId: number, packSize: "single" | "6-pack" | "12-pack", qty: number) => void;
  onOpenCart: () => void;
  onOpenDetailsOfFlavor: (index: number) => void;
}

export default function FlavorsSection({
  onAddToCart,
  onOpenCart,
  onOpenDetailsOfFlavor,
}: FlavorsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-stone-950 py-24 md:py-36 relative overflow-hidden" id="flavors-catalog">
      {/* Background visual texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-geist text-xs uppercase tracking-widest text-lime-400 font-bold block">
            THE FIVE VOLCANIC FORMULAS
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl tracking-widest uppercase leading-none">
            THE FLAVOR SPECTRUM
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-hanken">
            Hover over each masterfully balanced volcanic blend to analyze its atomic profile, acidity levels, and exquisite botanical base.
          </p>
        </div>

        {/* Expansive Horizontal Accordion (Desktop) & Grid (Mobile) */}
        <div className="hidden lg:flex gap-4 h-[580px] w-full" id="flavors-accordion">
          {FLAVORS.map((flavor, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;
            // Width allocation: if hovered, expand to 3x, others shrink. If none hovered, equal width.
            const flexVal = isHovered ? "flex-[3]" : isAnyHovered ? "flex-[0.7]" : "flex-[1]";
            const floatClass = idx === 0 ? "animate-float-bottle" : idx === 1 ? "animate-float-bottle-delay-1" : idx === 2 ? "animate-float-bottle-delay-2" : idx === 3 ? "animate-float-bottle-delay-3" : "animate-float-bottle-delay-4";

            return (
              <div
                key={flavor.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  borderColor: isHovered ? `${flavor.color}55` : "rgba(255, 255, 255, 0.05)",
                  backgroundColor: isHovered ? `${flavor.color}08` : "rgba(255, 255, 255, 0.01)",
                }}
                className={`relative rounded-[32px] border transition-all duration-700 ease-out overflow-hidden flex flex-col justify-between p-8 group ${flexVal}`}
              >
                {/* Background glow in active cards */}
                <div
                  className={`absolute -bottom-48 -right-48 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none transition-all duration-700 ${
                    isHovered ? "scale-125 opacity-25" : "scale-75"
                  }`}
                  style={{ backgroundColor: flavor.color }}
                />

                {/* Vertical Text Heading for collapsed state */}
                {!isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500">
                    <span
                      style={{ color: flavor.color }}
                      className="font-bebas text-4xl xl:text-5xl tracking-widest rotate-90 uppercase whitespace-nowrap opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all"
                    >
                      {flavor.name}
                    </span>
                  </div>
                )}

                {/* Top Label & Sparkle (Only if hovered) */}
                <div
                  className={`flex justify-between items-center transition-all duration-500 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  <span className="font-geist text-xs font-bold text-gray-500 uppercase tracking-widest">
                    FORMULA 0{flavor.id + 1}
                  </span>
                  <Sparkles className="w-4 h-4" style={{ color: flavor.color }} />
                </div>

                {/* Central Bottle Display */}
                <div className="relative flex-1 flex items-center justify-center my-4">
                  <div
                    className={`relative h-full transition-all duration-700 ${
                      isHovered ? "scale-110 -translate-y-2" : "scale-75 translate-y-2 opacity-30 group-hover:opacity-60"
                    }`}
                  >
                    <div 
                      onClick={() => onOpenDetailsOfFlavor(idx)}
                      className={`${floatClass} cursor-zoom-in`}
                      title="Click to view details"
                    >
                      <TransparentImage
                        src={flavor.image}
                        alt={flavor.name}
                        className="h-[270px] w-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {isHovered && (
                      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-32 h-6 bg-black/60 blur-xl rounded-full -z-10" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Area (Bottom Section) */}
                <div
                  className={`space-y-6 transition-all duration-500 ${
                    isHovered ? "opacity-100 -translate-y-3" : "opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden"
                  }`}
                >
                  <div className={`space-y-1 transition-all duration-500 transform ${
                    isHovered ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-4"
                  }`}>
                    <h3 className="font-bebas text-4xl tracking-widest uppercase text-white leading-none">
                      FINOKA {flavor.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-hanken line-clamp-2">
                      {flavor.desc}
                    </p>
                  </div>

                  {/* Flavor profiles slider metrics */}
                  <div className={`grid grid-cols-3 gap-2.5 bg-black/25 p-3 rounded-2xl border border-white/5 transition-all duration-500 transform ${
                    isHovered ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-4"
                  }`}>
                    <div className="text-center">
                      <span className="block text-[8px] text-gray-500 tracking-wider font-geist font-bold">SWEETNESS</span>
                      <span className="font-bebas text-sm text-white">{flavor.nutrition.sweetness}/5</span>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <span className="block text-[8px] text-gray-500 tracking-wider font-geist font-bold">FRUITINESS</span>
                      <span className="font-bebas text-sm text-white">{flavor.nutrition.fruitIntensity}/5</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[8px] text-gray-500 tracking-wider font-geist font-bold">BUBBLES</span>
                      <span className="font-bebas text-sm text-white">{flavor.nutrition.carbonation}/5</span>
                    </div>
                  </div>

                  {/* Quick purchase and specification buttons */}
                  <div className={`flex gap-2 mb-3 transition-all duration-500 transform ${
                    isHovered ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-4"
                  }`}>
                    <button
                      onClick={() => {
                        onAddToCart(flavor.id, "single", 1);
                        onOpenCart();
                      }}
                      style={{ backgroundColor: flavor.color }}
                      className="flex-1 inline-flex items-center justify-center gap-2 hover:brightness-110 text-black font-geist font-black text-[10px] tracking-widest py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 hover:shadow-lg hover:shadow-white/5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      ADD — ${flavor.price.toFixed(2)}
                    </button>
                    <button
                      onClick={() => onOpenDetailsOfFlavor(idx)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                      title="View specs"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Grid for Smaller Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden" id="flavors-catalog-grid">
          {FLAVORS.map((flavor, idx) => {
            const floatClass = idx === 0 ? "animate-float-bottle" : idx === 1 ? "animate-float-bottle-delay-1" : idx === 2 ? "animate-float-bottle-delay-2" : idx === 3 ? "animate-float-bottle-delay-3" : "animate-float-bottle-delay-4";
            return (
              <div
                key={flavor.id}
                className="bg-white/[0.01] border border-white/5 hover:border-white/10 p-6 rounded-3xl flex flex-col justify-between gap-6 relative overflow-hidden group"
              >
              <div
                className="absolute -top-32 -right-32 w-64 h-64 blur-[80px] opacity-5 rounded-full pointer-events-none group-hover:opacity-10 transition-colors"
                style={{ backgroundColor: flavor.color }}
              />

              <div className="flex justify-between items-center">
                <span className="font-geist text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                  FORMULA 0{flavor.id + 1}
                </span>
                <span
                  className="text-xs font-geist font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5"
                  style={{ color: flavor.color }}
                >
                  {flavor.name}
                </span>
              </div>

              {/* Central Bottle Image */}
              <div className="h-36 flex items-center justify-center my-2">
                <div 
                  onClick={() => onOpenDetailsOfFlavor(idx)}
                  className={`${floatClass} h-full flex items-center justify-center cursor-zoom-in`}
                  title="Click to view details"
                >
                  <TransparentImage
                    src={flavor.image}
                    alt={flavor.name}
                    className="h-32 w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Texts */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bebas text-2xl tracking-wider text-white uppercase">
                    FINOKA {flavor.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-hanken line-clamp-2">
                    {flavor.desc}
                  </p>
                </div>

                {/* Purchase Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(flavor.id, "single", 1);
                      onOpenCart();
                    }}
                    style={{ backgroundColor: flavor.color }}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-black font-geist font-black text-[10px] tracking-widest py-3 rounded-xl hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 hover:shadow-lg hover:shadow-white/5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    ADD — ${flavor.price.toFixed(2)}
                  </button>
                  <button
                    onClick={() => onOpenDetailsOfFlavor(idx)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl text-gray-300 font-geist font-bold text-[10px] tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    SPECS
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      {/* Faded Bottom Overlay Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
