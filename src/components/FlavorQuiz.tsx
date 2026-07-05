import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, RefreshCw, ChevronRight, HelpCircle, ArrowRight } from "lucide-react";
import { FLAVORS } from "../data";
import TransparentImage from "./TransparentImage";

interface FlavorQuizProps {
  onAddToCart: (flavorId: number, packSize: "single" | "6-pack" | "12-pack", qty: number) => void;
  onOpenCart: () => void;
}

interface Question {
  text: string;
  options: {
    text: string;
    score: number; // maps to flavor ID
    desc: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    text: "Select your ideal taste profile:",
    options: [
      { text: "Timeless, bold, and botanical soda", score: 0, desc: "Classic robust carbonation with botanical hints" },
      { text: "Zesty, tart, and acidic citrus", score: 1, desc: "Sharp explosion of lemon-lime oils" },
      { text: "Sweet, rich, and wild forest berries", score: 2, desc: "Harvested at peak ripeness for intense depth" },
      { text: "Sun-kissed orange with a bitter rim", score: 3, desc: "Sophisticated blood orange citrus notes" },
      { text: "Glacial blue, light huckleberry-mint", score: 4, desc: "Ultra-crisp chilling hydration with mint finish" },
    ],
  },
  {
    text: "When do you crave a cold drink most?",
    options: [
      { text: "Powering through high-focus creative work", score: 4, desc: "Need cognitive clarity and smooth energy" },
      { text: "Directly after intense training or heavy workouts", score: 1, desc: "Require rapid hydration and citrus electrolytes" },
      { text: "Pairing with a gourmet dinner or spicy snack", score: 0, desc: "Desire a bold, fizzy palate-cleansing companion" },
      { text: "Unwinding on a terrace at golden hour", score: 2, desc: "Want a sweet, deeply luxurious forest berry blend" },
      { text: "Socializing under the sun or at poolside parties", score: 3, desc: "Love a bright, refreshing carbonated citrus punch" },
    ],
  },
  {
    text: "Select your carbonation and fizz preference:",
    options: [
      { text: "Glacial & effervescent (High fizz, super fizzy)", score: 0, desc: "Intense biting bubbles that wake you up" },
      { text: "Moderate & sparkling (Balanced fizz)", score: 1, desc: "Classic crisp bubbling action that is highly refreshing" },
      { text: "Smooth & gentle (Light, soft carbonation)", score: 2, desc: "Gentle effervescence that lets flavor shine" },
    ],
  },
  {
    text: "What is your main wellness focus?",
    options: [
      { text: "Pure volcanic minerals & clean organic ingredients", score: 0, desc: "Zero preservatives or artificial compounds" },
      { text: "Instant citrus-infused electrolyte replenishment", score: 1, desc: "Rich in vitamins C & B6 to combat fatigue" },
      { text: "High antioxidants & wild forest botanical defense", score: 2, desc: "Immune-boosting huckleberries and blackberries" },
      { text: "Blood orange vitamin C & gentle agave energy lift", score: 3, desc: "Clean focus boost without energy crashes" },
      { text: "Hydration with cognitive focus support (L-Theanine)", score: 4, desc: "Calms tension while keeping mind super sharp" },
    ],
  },
];

export default function FlavorQuiz({ onAddToCart, onOpenCart }: FlavorQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 is intro
  const [answers, setAnswers] = useState<number[]>([]);
  const [resultFlavorId, setResultFlavorId] = useState<number | null>(null);

  const handleStart = () => {
    setAnswers([]);
    setResultFlavorId(null);
    setCurrentStep(0);
  };

  const handleOptionSelect = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final matched flavor
      // Let's count frequencies of flavor IDs in the scores.
      const frequencies: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
      nextAnswers.forEach((id) => {
        frequencies[id] = (frequencies[id] || 0) + 1.2; // weight latest answers slightly more
      });

      // Find flavor ID with highest score
      let bestId = 0;
      let highestVal = -1;
      Object.keys(frequencies).forEach((key) => {
        const id = parseInt(key);
        if (frequencies[id] > highestVal) {
          highestVal = frequencies[id];
          bestId = id;
        }
      });

      setResultFlavorId(bestId);
      setCurrentStep(QUESTIONS.length); // go to result step
    }
  };

  const matchedFlavor = resultFlavorId !== null ? FLAVORS[resultFlavorId] : null;

  const handleAddResultToCart = () => {
    if (resultFlavorId !== null) {
      // Add a 6-pack to the cart
      onAddToCart(resultFlavorId, "6-pack", 1);
      onOpenCart();
    }
  };

  return (
    <div className="bg-stone-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden" id="flavor-quiz-section">
      {/* Decorative ambient radial bloom */}
      <div
        className="absolute -right-20 -bottom-20 w-96 h-96 blur-[150px] opacity-10 rounded-full transition-colors duration-1000"
        style={{
          backgroundColor: matchedFlavor ? matchedFlavor.color : "#FFFFFF",
        }}
      />

      <AnimatePresence mode="wait">
        {/* Step -1: Intro Screen */}
        {currentStep === -1 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="flex-1 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-primary font-geist font-bold">
                <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                INTERACTIVE MATCHMAKER
              </div>
              <h3 className="font-bebas text-4xl md:text-5xl tracking-widest leading-none text-white uppercase">
                FIND YOUR PERFECT <br />
                <span className="text-gray-400">VOLCANIC PALATE MATCH.</span>
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                Not sure which signature bottle to start with? Answer four simple lifestyle and taste preference questions, and our organic matching algorithm will customize your cold drink match.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStart}
                  className="bg-white hover:bg-stone-200 text-black font-geist font-black text-xs tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-3 shadow-lg hover:shadow-white/5"
                  id="quiz-start-btn"
                >
                  START SENSOR QUIZ
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden relative shrink-0 border border-white/10 bg-black/40 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent z-10" />
              <div className="relative z-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400 animate-pulse">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] tracking-widest uppercase font-geist text-gray-500 font-bold">
                    PRECISE ALGORITHM
                  </span>
                  <span className="block text-xs font-semibold text-gray-300 mt-1">
                    4 Questions • 5 Custom Outcomes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Steps 0 to 3: Questions */}
        {currentStep >= 0 && currentStep < QUESTIONS.length && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="space-y-6"
          >
            {/* Progress indicators */}
            <div className="flex justify-between items-center text-xs font-geist text-gray-400">
              <span className="uppercase font-bold tracking-widest text-primary">
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete</span>
            </div>

            <div className="h-1 bg-white/5 rounded-full overflow-hidden flex">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="space-y-6 text-left">
              <h4 className="font-hanken font-bold text-xl md:text-2xl text-white tracking-tight uppercase">
                {QUESTIONS[currentStep].text}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt.score)}
                    className="w-full text-left bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl p-5 hover:bg-white/[0.03] active:scale-99 transition-all flex justify-between items-center group"
                  >
                    <div className="space-y-1.5 pr-4">
                      <span className="block font-hanken font-bold text-sm text-gray-200 group-hover:text-white transition-colors">
                        {opt.text}
                      </span>
                      <span className="block text-xs text-gray-500 font-medium">
                        {opt.desc}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-white/40 flex items-center justify-center shrink-0 text-transparent group-hover:text-white/40 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Result Screen */}
        {currentStep === QUESTIONS.length && matchedFlavor && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            {/* Left Col - Matched Bottle Animation */}
            <div className="w-full md:w-2/5 aspect-[3/4] max-w-sm rounded-3xl overflow-hidden relative shrink-0 border border-white/10 bg-black/40 flex flex-col justify-center items-center p-8">
              {/* Dynamic matching glow */}
              <div
                className="absolute w-56 h-56 blur-[80px] opacity-25 rounded-full z-0 animate-pulse"
                style={{ backgroundColor: matchedFlavor.color }}
              />

              <div className="relative z-10 w-28 h-64 flex items-center justify-center">
                <div className="animate-float-bottle">
                  <TransparentImage
                    src={matchedFlavor.image}
                    alt={matchedFlavor.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-6 text-center">
                <span
                  className="text-[10px] tracking-[0.4em] font-bold font-geist uppercase"
                  style={{ color: matchedFlavor.color }}
                >
                  98.4% SCORE MATCH
                </span>
                <h4 className="font-bebas text-3xl tracking-wider uppercase mt-1 text-white">
                  {matchedFlavor.name}
                </h4>
              </div>
            </div>

            {/* Right Col - Result Showcase & Special Deal */}
            <div className="flex-1 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-geist font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                SENSORS CALIBRATED
              </div>

              <div className="space-y-2">
                <span className="text-gray-500 font-geist text-xs font-bold uppercase tracking-widest">
                  YOUR CUSTOMIZED BLEND IS:
                </span>
                <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-widest uppercase leading-none">
                  FINOKA {matchedFlavor.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                  Excellent choice. Based on your inputs, your palate highly values{" "}
                  <span className="text-white font-medium">{matchedFlavor.tagline.toLowerCase()}</span> {matchedFlavor.desc}
                </p>
              </div>

              {/* Unique Quiz Offer Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold font-geist text-green-400 tracking-wider uppercase">
                    EXCLUSIVE QUIZ PACK OFFER
                  </span>
                  <p className="text-xs text-gray-400 font-hanken">
                    Get a matched 6-pack box for just <span className="text-white font-bold">$21.68</span> instead of $25.50 (15% Off).
                  </p>
                </div>
                <button
                  onClick={handleAddResultToCart}
                  className="bg-white hover:bg-stone-200 text-black font-geist font-black text-[10px] sm:text-xs tracking-widest px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 uppercase shrink-0 w-full sm:w-auto text-center"
                  id="quiz-add-offer-btn"
                >
                  CLAIM & ADD 6-PACK
                </button>
              </div>

              {/* Action shortcuts */}
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={handleStart}
                  className="border border-white/10 hover:border-white/30 text-gray-300 hover:text-white font-geist font-bold text-xs tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                  id="quiz-retake-btn"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  RETAKE MATCHMAKER
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
