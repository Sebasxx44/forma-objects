import type { Category, Product } from "@/types";

export const categories: Category[] = ["All objects", "Lighting", "Seating", "Ceramics"];
export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const products: Product[] = [
  {
    id: "arco", name: "Arco table light", category: "Lighting", price: 185,
    color: "#c45539", colorName: "Burnt sienna", background: "#e9e1d4", shape: "lamp", badge: "Signature piece",
    description: "A soft pool of light, a sculptural silhouette. Arco brings a little warmth to the corners you love most. A rounded shade floats above a slender base, finished in a deep, earthy hue.",
    dimensions: "H 38 × Ø 30 cm", material: "Powder-coated steel · warm LED",
  },
  {
    id: "rue", name: "Rue lounge chair", category: "Seating", price: 640,
    color: "#70795c", colorName: "Olive green", background: "#e5e8df", shape: "chair",
    description: "A generous seat for unhurried afternoons. Rue pairs tactile woven upholstery with an architectural solid-wood frame. Made for your favorite book and one more cup of coffee.",
    dimensions: "H 74 × W 68 × D 72 cm", material: "Solid ash · recycled bouclé",
  },
  {
    id: "onda", name: "Onda sculptural vase", category: "Ceramics", price: 72,
    color: "#dac9b1", colorName: "Warm sand", background: "#e9e1d7", shape: "vase", badge: "Sculptural form",
    description: "A quiet study in curves. Onda’s generous shape catches the light differently throughout the day. Beautiful with a single branch, just as beautiful on its own.",
    dimensions: "H 26 × Ø 18 cm", material: "Hand-finished stoneware",
  },
  {
    id: "sol", name: "Sol pendant light", category: "Lighting", price: 240,
    color: "#d5bc8a", colorName: "Brushed brass", background: "#e7e2d7", shape: "pendant",
    description: "Soft light from above. Sol’s wide, shallow form gives a dining table or reading nook its own gentle atmosphere. A beautiful balance of lightness and presence.",
    dimensions: "Ø 42 × H 16 cm · 180 cm cable", material: "Brushed aluminum · brass finish",
  },
  {
    id: "nido", name: "Nido accent stool", category: "Seating", price: 225,
    color: "#8b593d", colorName: "Smoked oak", background: "#e5dccf", shape: "table",
    description: "A seat, a side table, a place for the everyday. Nido is a compact piece with a generous personality. Its rounded solid-oak form celebrates the beauty of honest materials.",
    dimensions: "H 42 × Ø 34 cm", material: "Solid oak · natural oil",
  },
  {
    id: "terra", name: "Terra serving bowl", category: "Ceramics", price: 58,
    color: "#ac5b43", colorName: "Terracotta", background: "#e8ded3", shape: "bowl", badge: "New arrival",
    description: "For fruit, favorite finds, or nothing at all. Terra’s open, flowing shape is a small celebration of the everyday. Each piece carries subtle variations in its earthy glaze.",
    dimensions: "H 9 × Ø 28 cm", material: "Glazed ceramic · food safe",
  },
];
