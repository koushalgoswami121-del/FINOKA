import { motion } from "motion/react";
import { Sparkles, Shield, Droplet, Leaf, Earth } from "lucide-react";
import { useState } from "react";
import purityStandards from "../assets/images/finoka_purity_standards.webp";

export default function Ingredients() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Volcanic Spring Water",
      description: "Naturally filtered through thousands of layers of pristine volcanic rock. This multi-decade slow filtration provides an unmatched mineral profile rich in silica, magnesium, and calcium.",
      icon: <Droplet className="w-5 h-5 text-sky-400" />,
      detail: "Sourced from high-elevation springs directly at the base of active vents.",
    },
    {
      title: "Organic Stevia Leaf",
      description: "Our zero-calorie sweetness is derived entirely from organic whole leaf Stevia Rebaudiana, extracted using pure water without artificial solvents or chemical processing.",
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      detail: "Provides clean sweet notes that perfectly complement our botanical infusions.",
    },
    {
      title: "Sustainably Harvested Botanicals",
      description: "Every lemon, berry, and blood orange in our flavor catalog is hand-sourced from certified biodynamic family orchards that practice climate-resilient water farming.",
      icon: <Earth className="w-5 h-5 text-amber-400" />,
      detail: "100% trace-to-source supply chain verification with carbon-offset logistics.",
    },
  ];

  return (
    <section className="bg-stone-900 py-24 md:py-32 relative overflow-hidden text-white" id="ingredients">
      {/* Dynamic light glows */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 blur-[150px] opacity-10 rounded-full bg-emerald-500/20 z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 blur-[150px] opacity-10 rounded-full bg-sky-500/20 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12 items-center">
          {/* Left Column - Core text & interactive detail blocks */}
          <div className="col-span-12 md:col-span-6 space-y-10">
            <div className="space-y-4">
              <span className="font-geist text-xs uppercase tracking-widest text-primary font-bold">
                OUR PURITY STANDARDS
              </span>
              <h2 className="font-bebas text-5xl md:text-6xl tracking-widest leading-none uppercase">
                PURE. POTENT. <br />
                <span className="text-gray-500">UNCOMPROMISED.</span>
              </h2>
            </div>

            <div className="space-y-5">
              {cards.map((card, idx) => {
                const isActive = activeCard === idx;
                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveCard(idx)}
                    onMouseLeave={() => setActiveCard(null)}
                    className={`bg-white/[0.02] border rounded-[28px] p-6 md:p-8 transition-all duration-300 relative cursor-default ${
                      isActive
                        ? "border-white/20 bg-white/[0.04] shadow-lg shadow-black/30"
                        : "border-white/5"
                    }`}
                    id={`ingredient-card-${idx}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shrink-0 mt-0.5">
                        {card.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bebas text-2xl tracking-wider uppercase">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-hanken">
                          {card.description}
                        </p>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] font-bold font-geist text-primary uppercase tracking-wider flex items-center gap-1.5 pt-2"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {card.detail}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Premium High-Fidelity Citrus splash image and badges */}
          <div className="col-span-12 md:col-span-6 flex justify-center relative">
            <div className="relative w-full aspect-square max-w-lg">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Citrus splash image */}
              <img
                alt="Fresh citrus splash with floating oranges, lemons, and limes in clean water droplets"
                className="w-full h-full object-cover rounded-[40px] shadow-2xl relative z-10 border border-white/10 select-none hover:scale-102 transition-transform duration-700"
                src={purityStandards}
                referrerPolicy="no-referrer"
              />

              {/* Float badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-stone-950 border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] tracking-wider font-bold uppercase text-gray-500 font-geist">
                    CERTIFIED PURE
                  </span>
                  <span className="block text-xs font-bold text-white uppercase tracking-wide mt-0.5 font-hanken">
                    USDA Organic Base
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
