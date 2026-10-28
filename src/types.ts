export type Category = "All objects" | "Lighting" | "Seating" | "Ceramics";
export type ProductShape = "lamp" | "chair" | "vase" | "table" | "bowl" | "pendant";

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "All objects">;
  price: number;
  color: string;
  colorName: string;
  background: string;
  shape: ProductShape;
  description: string;
  dimensions: string;
  material: string;
  badge?: string;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItem extends CartLine {
  product: Product;
}

export interface CartState {
  selection: {
    items: CartItem[];
    count: number;
  };
  totals: {
    subtotal: number;
  };
  actions: {
    add: (productId: string) => void;
    changeQuantity: (productId: string, quantity: number) => void;
    clear: () => void;
  };
}
