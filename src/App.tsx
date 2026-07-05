import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FlavorsSection from "./components/FlavorsSection";
import Ingredients from "./components/Ingredients";
import About from "./components/About";
import FlavorQuiz from "./components/FlavorQuiz";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { CartItem } from "./types";
import { FLAVORS } from "./data";

export default function App() {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("finoka-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  // Sync cart with local storage for durability
  useEffect(() => {
    localStorage.setItem("finoka-cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (flavorId: number, packSize: "single" | "6-pack" | "12-pack", quantity: number) => {
    setCart((prevCart) => {
      const itemId = `${flavorId}-${packSize}`;
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            flavorId,
            packSize,
            quantity,
          },
        ];
      }
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenDetailsOfFlavor = (idx: number) => {
    setCurrentFlavorIndex(idx);
    setIsDetailsOpen(true);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-stone-950 min-h-screen text-white font-sans selection:bg-white selection:text-black antialiased">
      {/* Floating Header */}
      <Header
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Showcase Hero Carousel */}
      <Hero
        currentFlavorIndex={currentFlavorIndex}
        onFlavorChange={setCurrentFlavorIndex}
        onOpenDetails={() => setIsDetailsOpen(true)}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 5 Premium Volcanic Flavors Accordion Showcase */}
      <FlavorsSection
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDetailsOfFlavor={handleOpenDetailsOfFlavor}
      />

      {/* Process History */}
      <About />

      {/* Ingredients Deep-dive */}
      <Ingredients />

      {/* Flavor Quiz Interactive Matchmaker */}
      <section className="bg-stone-950 py-24 md:py-32" id="shop-quiz">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="font-geist text-xs uppercase tracking-widest text-primary font-bold">
              THE CONNOISSEUR'S SELECTION
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl tracking-widest uppercase leading-tight">
              DETERMINE YOUR FLAVOR.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Every Finoka blend possesses unique structural notes, acidity percentages, and carbonation levels. Find your custom formula below.
            </p>
          </div>

          <FlavorQuiz
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Cart Sliding Panel Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Detailed Spec Modal */}
      <ProductDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        flavor={FLAVORS[currentFlavorIndex]}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
