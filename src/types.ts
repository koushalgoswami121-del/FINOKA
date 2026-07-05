export interface NutritionInfo {
  calories: number;
  carbs: string;
  sodium: string;
  sweetness: number; // 1-5 scale
  fruitIntensity: number; // 1-5 scale
  carbonation: number; // 1-5 scale
}

export interface Flavor {
  id: number;
  name: string;
  color: string;
  glowColor: string;
  bgGradient: string;
  price: number;
  tagline: string;
  desc: string;
  image: string;
  nutrition: NutritionInfo;
  ingredients: string[];
  benefits: string[];
}

export interface CartItem {
  id: string;
  flavorId: number;
  quantity: number;
  packSize: "single" | "6-pack" | "12-pack";
}
