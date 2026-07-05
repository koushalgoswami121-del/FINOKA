import { motion, AnimatePresence } from "motion/react";
import { X, Check, ShieldCheck, Sparkles, Leaf, Activity } from "lucide-react";
import { Flavor } from "../types";
import TransparentImage from "./TransparentImage";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavor: Flavor;
  onAddToCart: (flavorId: number, packSize: "single" | "6-pack" | "12-pack", qty: number) => void;
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  flavor,
  onAddToCart,
}: ProductDetailsModalProps) {
  const benefitIcons = [
    <Leaf className="w-4 h-4 text-emerald-400" />,
    <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    <Sparkles className="w-4 h-4 text-emerald-400" />,
    <Activity className="w-4 h-4 text-emerald-400" />,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-stone-950 border border-white/10 rounded-[32px] w-full max-w-4xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row text-white"
              id="details-modal"
            >
              {/* Absolute Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:bg-white/5 transition-colors z-30"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column - Bottle showcase with dynamic colored background bloom */}
              <div className="md:w-1/2 pt-12 px-6 pb-6 md:p-12 flex flex-col justify-center items-center relative overflow-hidden bg-black/40 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                {/* Backdrop color bloom */}
                <div
                  className="absolute w-80 h-80 blur-[100px] opacity-20 rounded-full z-0 transition-colors duration-1000"
                  style={{ backgroundColor: flavor.color }}
                />

                <div className="relative z-10 w-32 h-[220px] md:w-44 md:h-[380px] flex items-center justify-center">
                  <TransparentImage
                    src={flavor.image}
                    alt={flavor.name}
                    className="h-full w-auto object-contain hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative z-10 mt-6 text-center">
                  <span
                    className="text-[10px] tracking-[0.4em] font-bold font-geist uppercase"
                    style={{ color: flavor.color }}
                  >
                    PREMIUM VOLCANIC SODA
                  </span>
                  <h3 className="font-bebas text-4xl tracking-widest uppercase mt-1">
                    {flavor.name}
                  </h3>
                </div>
              </div>

              {/* Right Column - Deep Details */}
              <div className="md:w-1/2 p-8 md:p-12 space-y-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
                <div className="space-y-6">
                  {/* Title Info */}
                  <div className="space-y-2 pr-10">
                    <span className="text-xs uppercase font-geist tracking-widest text-gray-400 font-bold">
                      {flavor.tagline}
                    </span>
                    <p className="text-gray-400 text-sm leading-relaxed font-hanken">
                      {flavor.desc}
                    </p>
                  </div>

                  {/* Nutrition Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
                    <div className="text-center">
                      <span className="block text-[10px] uppercase font-geist tracking-wider text-gray-500 font-bold">
                        Calories
                      </span>
                      <span className="block text-xl font-bold font-geist text-white mt-1">
                        {flavor.nutrition.calories} kcal
                      </span>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <span className="block text-[10px] uppercase font-geist tracking-wider text-gray-500 font-bold">
                        Carbohydrates
                      </span>
                      <span className="block text-xl font-bold font-geist text-white mt-1">
                        {flavor.nutrition.carbs}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] uppercase font-geist tracking-wider text-gray-500 font-bold">
                        Sodium
                      </span>
                      <span className="block text-xl font-bold font-geist text-white mt-1">
                        {flavor.nutrition.sodium}
                      </span>
                    </div>
                  </div>

                  {/* Nutrition Bars (Sweetness, Fruit Intensity, Carbonation) */}
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase font-bebas tracking-widest text-gray-400">
                      FLAVOR PROFILE SENSORS
                    </h4>
                    <div className="space-y-3">
                      {/* Sweetness */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-geist">
                          <span className="text-gray-400">Sweetness Balance</span>
                          <span className="font-bold text-white">{flavor.nutrition.sweetness} / 5</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <div
                              key={val}
                              className="flex-1 transition-all duration-1000"
                              style={{
                                backgroundColor:
                                  val <= flavor.nutrition.sweetness
                                    ? flavor.color
                                    : "rgba(255, 255, 255, 0.05)",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Fruit Intensity */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-geist">
                          <span className="text-gray-400">Fruit Intensity</span>
                          <span className="font-bold text-white">{flavor.nutrition.fruitIntensity} / 5</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <div
                              key={val}
                              className="flex-1 transition-all duration-1000"
                              style={{
                                backgroundColor:
                                  val <= flavor.nutrition.fruitIntensity
                                    ? flavor.color
                                    : "rgba(255, 255, 255, 0.05)",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Carbonation */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-geist">
                          <span className="text-gray-400">Fizzy Carbonation</span>
                          <span className="font-bold text-white">{flavor.nutrition.carbonation} / 5</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <div
                              key={val}
                              className="flex-1 transition-all duration-1000"
                              style={{
                                backgroundColor:
                                  val <= flavor.nutrition.carbonation
                                    ? flavor.color
                                    : "rgba(255, 255, 255, 0.05)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients & Benefits */}
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    {/* Ingredients list */}
                    <div className="space-y-3">
                      <h4 className="text-sm uppercase font-bebas tracking-widest text-gray-400">
                        INGREDIENTS
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-300 font-hanken">
                        {flavor.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: flavor.color }} />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits list */}
                    <div className="space-y-3">
                      <h4 className="text-sm uppercase font-bebas tracking-widest text-gray-400">
                        WELLNESS ACCENTS
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-300 font-hanken">
                        {flavor.benefits.map((ben, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="shrink-0 p-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                              {benefitIcons[idx % benefitIcons.length]}
                            </div>
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Purchase buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="text-left shrink-0 sm:pr-4">
                    <span className="block text-[10px] uppercase font-geist text-gray-500 font-bold">
                      PRICE
                    </span>
                    <span className="text-2xl font-black font-geist text-white">
                      ${flavor.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full flex gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(flavor.id, "single", 1);
                        onClose();
                      }}
                      className="flex-1 bg-white hover:bg-stone-200 text-black py-3.5 px-6 rounded-full font-geist font-black text-xs tracking-widest transition-all text-center uppercase"
                      id="modal-add-single-btn"
                    >
                      ADD SINGLE
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(flavor.id, "6-pack", 1);
                        onClose();
                      }}
                      className="flex-1 border border-white/20 hover:border-white hover:bg-white/5 text-white py-3.5 px-6 rounded-full font-geist font-bold text-[10px] sm:text-xs tracking-widest transition-all text-center uppercase"
                      id="modal-add-six-btn"
                    >
                      6-PACK (-10%)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
