import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, CheckCircle } from "lucide-react";
import { CartItem } from "../types";
import { FLAVORS } from "../data";
import { useState } from "react";
import TransparentImage from "./TransparentImage";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checking-out" | "success">("cart");
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FINOKA10") {
      setDiscountPercent(10);
      setCouponError("");
    } else if (couponCode.toUpperCase() === "SOFRESH") {
      setDiscountPercent(15);
      setCouponError("");
    } else {
      setCouponError("Invalid promo code");
    }
  };

  const calculateItemPrice = (item: CartItem) => {
    const flavor = FLAVORS.find((f) => f.id === item.flavorId);
    if (!flavor) return 0;
    let basePrice = flavor.price;
    let multiplier = 1;

    if (item.packSize === "6-pack") {
      multiplier = 6 * 0.9; // 10% discount for 6-pack
    } else if (item.packSize === "12-pack") {
      multiplier = 12 * 0.85; // 15% discount for 12-pack
    }

    return parseFloat((basePrice * multiplier).toFixed(2));
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + calculateItemPrice(item) * item.quantity, 0);
  };

  const subtotal = getSubtotal();
  const discountAmount = parseFloat((subtotal * (discountPercent / 100)).toFixed(2));
  const shipping = subtotal > 25 ? 0 : 4.99;
  const tax = parseFloat(((subtotal - discountAmount) * 0.08).toFixed(2));
  const total = parseFloat((subtotal - discountAmount + shipping + tax).toFixed(2));

  const handleCheckout = () => {
    setCheckoutStep("checking-out");
    setTimeout(() => {
      setCheckoutStep("success");
      onClearCart();
    }, 2000);
  };

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
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
            id="cart-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-stone-950 border-l border-white/10 z-[101] shadow-2xl flex flex-col h-full text-white"
            id="cart-drawer"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-400" />
                <span className="font-bebas text-xl tracking-wider">YOUR CART</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-300 font-medium font-geist">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  // Reset checkout state when closing
                  setTimeout(() => setCheckoutStep("cart"), 300);
                }}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:bg-white/5 transition-colors"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {checkoutStep === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <ShoppingBag className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bebas text-2xl tracking-widest uppercase">Your cart is empty</h3>
                        <p className="text-gray-400 text-sm mt-1 max-w-xs">
                          Explore our five pristine volcanic flavors and add refreshing bottles to your collection.
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="font-geist text-xs font-bold border border-white/20 hover:border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
                        id="explore-cart-btn"
                      >
                        EXPLORE FLAVORS
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => {
                        const flavor = FLAVORS.find((f) => f.id === item.flavorId);
                        if (!flavor) return null;
                        const itemPrice = calculateItemPrice(item);

                        return (
                          <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center hover:border-white/20 transition-all group"
                          >
                            <div className="w-14 h-20 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center relative p-1 shrink-0 border border-white/5">
                              {/* Background color glow behind the bottle thumbnail */}
                              <div
                                className="absolute inset-2 blur-md rounded-full opacity-40"
                                style={{ backgroundColor: flavor.color }}
                              />
                              <TransparentImage
                                src={flavor.image}
                                alt={flavor.name}
                                className="h-full w-auto object-contain relative z-10"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className="text-[10px] uppercase font-bold tracking-widest font-geist"
                                style={{ color: flavor.color }}
                              >
                                {flavor.name}
                              </span>
                              <h4 className="font-hanken font-bold text-sm truncate uppercase mt-0.5">
                                {item.packSize} Pack
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">
                                ${flavor.price.toFixed(2)} / bottle
                              </p>

                              {/* Controls */}
                              <div className="flex items-center gap-3 mt-3">
                                <div className="flex items-center border border-white/10 rounded-full bg-black/20">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="px-2.5 text-xs font-semibold font-geist">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => onRemoveFromCart(item.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-geist font-bold text-sm">
                                ${(itemPrice * item.quantity).toFixed(2)}
                              </span>
                              {item.packSize !== "single" && (
                                <span className="block text-[9px] text-green-400 font-bold uppercase mt-0.5 font-geist">
                                  {item.packSize === "6-pack" ? "Save 10%" : "Save 15%"}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "checking-out" && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-hanken font-bold text-lg tracking-wider">PREPARING YOUR BREW</h3>
                    <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
                      Connecting with our secure vaults to authorize your volcanic soda order. Please do not close this drawer.
                    </p>
                  </div>
                </div>
              )}

              {checkoutStep === "success" && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400"
                  >
                    <CheckCircle className="w-12 h-12" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-hanken font-black text-2xl tracking-wider">ORDER COMPLETED</h3>
                    <span className="block text-xs font-geist text-green-400 font-bold tracking-widest uppercase">
                      TRX-98240-FINOKA
                    </span>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto pt-2">
                      Success! Your Finoka Cold Drink collection is authorized. Our carbonation masters are packing your premium volcanic box now.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full text-left space-y-2 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Time</span>
                      <span className="text-white font-medium">1 - 2 Business Days</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Carbon Offset</span>
                      <span className="text-white font-medium">100% Carbon Neutral</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutStep("cart");
                      onClose();
                    }}
                    className="w-full font-geist text-xs font-bold border border-white/20 hover:border-white px-6 py-4 rounded-full bg-white text-black hover:bg-stone-200 transition-all tracking-widest"
                    id="finish-order-btn"
                  >
                    RETURN TO SHOWCASE
                  </button>
                </div>
              )}
            </div>

            {/* Summary & Footer (Only shown if cart is not empty and in 'cart' step) */}
            {cart.length > 0 && checkoutStep === "cart" && (
              <div className="border-t border-white/10 p-6 space-y-4 bg-black/40">
                {/* Promo Code Input */}
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. FINOKA10, SOFRESH)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-white/30 uppercase tracking-widest font-geist placeholder:text-gray-500 placeholder:normal-case"
                      id="promo-code-input"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-white/10 hover:bg-white hover:text-black border border-white/10 rounded-xl px-4 text-xs font-bold font-geist transition-all"
                      id="apply-promo-btn"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-400 font-bold uppercase font-geist">{couponError}</p>}
                  {discountPercent > 0 && (
                    <p className="text-[10px] text-green-400 font-bold uppercase font-geist flex items-center gap-1">
                      <Gift className="w-3 h-3" /> Coupon Applied! {discountPercent}% Off Subtotal
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs font-geist text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Promo Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white">
                      {shipping === 0 ? <span className="text-green-400 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-right text-gray-500 italic">
                      Add ${(25 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5 font-hanken">
                    <span className="tracking-wide">TOTAL</span>
                    <span className="font-geist text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black font-geist font-black text-xs tracking-widest py-4 rounded-full hover:bg-stone-200 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-white/5 active:scale-98"
                  id="checkout-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  AUTHORIZE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
