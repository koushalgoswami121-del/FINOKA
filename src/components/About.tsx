import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Sparkles, Wind, RefreshCw, Thermometer, Database, Droplet, ArrowRight, CheckCircle2 } from "lucide-react";

export default function About() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      phase: "PHASE I",
      title: "Basalt Filtering",
      tagline: "THERMODYNAMIC GEOTHERMAL SEEPAGE",
      description: "Rain and glacial runoff seep deep into active volcanic vents, filtering slowly through thousands of feet of mineral-dense basalt rock over 30 years.",
      longDescription: "Under immense deep-earth pressure, the water absorb vital trace elements including premium magnesium, silica, and calcium. This pristine geothermal route strips away any surface sediment, resulting in a perfectly balanced pH profile of 8.2 and unparalleled clarity.",
      icon: <Layers className="w-5 h-5" />,
      specs: [
        { label: "Duration", value: "30 Years" },
        { label: "Filtering depth", value: "3,400 feet" },
        { label: "pH Level", value: "8.2 Alkaline" },
        { label: "Mineral Density", value: "340 ppm" },
      ],
      color: "#e2e8f0",
    },
    {
      num: "02",
      phase: "PHASE II",
      title: "Wild Harvesting",
      tagline: "ESTATE BOTANICAL EXTRACTION",
      description: "We cold-press wild Sicilian lemons, arctic blueberries, and blood oranges sourced exclusively from family-run biodynamic estates.",
      longDescription: "Each ingredient is meticulously hand-picked at peak ripeness when solar saturation is maximized. The delicate skins are pressed under cold gas atmospheres to preserve volatile aromatic compounds, ensuring a brilliant natural bouquet without any synthetic additives.",
      icon: <Sparkles className="w-5 h-5" />,
      specs: [
        { label: "Estate Source", value: "Sicilian Slopes" },
        { label: "Press Temp", value: "4°C Cold Gas" },
        { label: "Aroma Retention", value: "99.8%" },
        { label: "Purity Index", value: "100% Organic" },
      ],
      color: "#a3e635",
    },
    {
      num: "03",
      phase: "PHASE III",
      title: "Glacial Bubbling",
      tagline: "HIGH-DENSITY ISOTHERMAL INFUSION",
      description: "Infusing high-density carbonation at a precise temperature of 1.5°C to preserve extreme crispness and champagne-grade bubble structure.",
      longDescription: "Using custom micro-nozzle technology, pure CO2 gas is dissolved into the alkaline water at high atmospheric pressures. This creates microscopic bubbles that dissolve slower and pop cleanly, releasing refreshing carbonation on the palate rather than bloating the stomach.",
      icon: <Wind className="w-5 h-5" />,
      specs: [
        { label: "Infusion Temp", value: "1.5°C Isothermal" },
        { label: "Carbonation", value: "4.8 Vol" },
        { label: "Bubble Size", value: "Microscopic (0.2mm)" },
        { label: "Dissolve Rate", value: "2x Standard" },
      ],
      color: "#38bdf8",
    },
    {
      num: "04",
      phase: "PHASE IV",
      title: "Zero-Waste Bottling",
      tagline: "UV-PROTECTED PYREX SYSTEM",
      description: "Poured exclusively into durable, UV-protected custom glass bottles with biodegradable labels and aluminum crown seals.",
      longDescription: "Our production runs operate on 100% solar and geothermal power. Every premium container is manufactured from 85% recycled glass and fully light-shielded to prevent any flavor degradation, resulting in a completely closed-loop carbon neutral journey.",
      icon: <RefreshCw className="w-5 h-5" />,
      specs: [
        { label: "Energy Source", value: "100% Solar-Geo" },
        { label: "Glass Build", value: "85% Recycled UV-P" },
        { label: "Seal Type", value: "Air-Tight Crown" },
        { label: "Carbon Footprint", value: "Net Zero Certified" },
      ],
      color: "#fb923c",
    },
  ];

  return (
    <section className="bg-stone-950 py-24 md:py-36 relative overflow-hidden text-white" id="about">
      {/* Dynamic graphic background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin duration-100000" />
        <div className="absolute top-1/2 left-1/2 w-[1400px] h-[1400px] border border-dashed border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-reverse-spin duration-[180s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
          <div className="space-y-4">
            <span className="font-geist text-xs uppercase tracking-widest text-lime-400 font-bold block">
              THE FINOKA MOLECULAR ARCHITECTURE
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl tracking-widest uppercase leading-none">
              OUR SACRED PROCESS
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md font-hanken">
            Crafting the ultimate beverage requires merging raw planetary thermodynamics with high-precision organic harvesting. Here is how every bottle is born.
          </p>
        </div>

        {/* Interactive Master Dashboard */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Timeline Selector Tabs (Left Column) */}
          <div className="col-span-12 md:col-span-4 flex flex-col justify-between gap-4">
            <div className="relative flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none" id="about-timeline-selector">
              {/* Glowing vertical connector line */}
              <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-white/10 pointer-events-none hidden md:block">
                <motion.div
                  className="absolute top-0 left-0 w-full rounded-full"
                  style={{ backgroundColor: steps[activeStep].color }}
                  animate={{
                    height: `${(activeStep / (steps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-[220px] md:w-full shrink-0 text-left flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 relative group focus:outline-none cursor-pointer ${
                      isActive
                        ? "bg-white/5 border border-white/10"
                        : "bg-transparent border border-transparent hover:bg-white/[0.02]"
                    }`}
                    id={`about-tab-${idx}`}
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border shrink-0 z-10 ${
                        isActive
                          ? "bg-stone-900 border-white text-white shadow-lg"
                          : "bg-stone-950 border-white/10 text-gray-500 group-hover:border-white/30 group-hover:text-white"
                      }`}
                      style={isActive ? { boxShadow: `0 0 12px ${step.color}55` } : {}}
                    >
                      {isActive ? (
                        <div className="animate-pulse" style={{ color: step.color }}>{step.icon}</div>
                      ) : (
                        <span className="font-geist font-bold text-xs">{step.num}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <span className="block text-[9px] font-geist font-bold text-gray-500 uppercase tracking-widest">
                        {step.phase}
                      </span>
                      <h3
                        className={`font-bebas text-xl md:text-2xl tracking-wider uppercase transition-colors duration-300 ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                        }`}
                        style={isActive ? { color: step.color } : {}}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Real-time Telemetry Card */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-3 hidden md:block">
              <div className="flex items-center gap-2 text-xs font-geist text-gray-400 uppercase tracking-widest font-bold">
                <Database className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                SYSTEM TELEMETRY
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-mono">
                ISO 14001 carbon footprint verified. Extraction lines operate at full environmental equilibrium. Pure extraction monitored in real-time.
              </p>
            </div>
          </div>

          {/* Detailed Stage Content Area (Right Column) */}
          <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Corner visual accent */}
            <div
              className="absolute -top-32 -right-32 w-64 h-64 blur-[80px] opacity-10 rounded-full transition-colors duration-500"
              style={{ backgroundColor: steps[activeStep].color }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                {/* Phase Title Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-geist font-black tracking-widest uppercase"
                      style={{
                        backgroundColor: `${steps[activeStep].color}12`,
                        color: steps[activeStep].color,
                        border: `1px solid ${steps[activeStep].color}25`,
                      }}
                    >
                      {steps[activeStep].phase}
                    </span>
                    <span className="text-gray-500 font-mono text-xs">/ IN PROCESS</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-geist font-bold uppercase tracking-[0.25em] text-gray-400 block">
                      {steps[activeStep].tagline}
                    </span>
                    <h3 className="font-bebas text-4xl md:text-6xl text-white tracking-widest uppercase">
                      {steps[activeStep].title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-hanken">
                    {steps[activeStep].description}
                  </p>

                  <div className="p-4 bg-stone-900/50 rounded-2xl border border-white/5">
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed italic font-hanken">
                      "{steps[activeStep].longDescription}"
                    </p>
                  </div>
                </div>

                {/* Technical Specs Dashboard */}
                <div className="space-y-4 mt-6">
                  <span className="text-[10px] font-geist font-bold tracking-[0.2em] text-gray-500 uppercase block">
                    MOLECULAR DATA LOGS
                  </span>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps[activeStep].specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-stone-900/40 border border-white/5 p-4 rounded-xl space-y-1 hover:border-white/10 transition-colors"
                      >
                        <span className="block text-[9px] text-gray-500 font-geist font-bold uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span
                          className="block text-sm md:text-base font-bebas tracking-wide"
                          style={{ color: steps[activeStep].color }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
