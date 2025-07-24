// filters.js

// 🏷️ Product Categories
export const categories = [
  "Perfume",
  "Body Spray",
  "Oil Perfume",
  "Incense",
  "Gift Sets",
  "Unisex",
  "Men",
  "Women",
];

// 🧪 Brands
export const brands = [
  "Bilma",
  "Ajmal",
  "Lattafa",
  "Ard Al Zaafaran",
  "Rasasi",
  "Al Haramain",
  "Swiss Arabian",
  "Al Rehab",
];

// 📦 Packaging Types
export const boxTypes = ["Boxed", "Unboxed", "Travel Size", "Tester"];

// 📊 Availability Status
export const availability = ["In Stock", "Out of Stock"];

// 💰 Price Ranges (Naira)
export const priceRanges = [
  { label: "Under ₦5,000", value: [0, 5000] },
  { label: "₦5,000 - ₦10,000", value: [5000, 10000] },
  { label: "₦10,000 - ₦20,000", value: [10000, 20000] },
  { label: "Above ₦20,000", value: [20000, Infinity] },
];

// ⭐ Product Ratings
export const ratings = [5, 4, 3, 2, 1];
