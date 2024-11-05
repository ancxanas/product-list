import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: 101,
    title: "Wireless Noise Cancelling Headphones",
    price: 299.99,
    description:
      "Experience world-class sound quality with our wireless noise-cancelling headphones, featuring long battery life and comfortable ear cushions.",
    category: "electronics",
    image: "https://picsum.photos/200/300",
    rating: {
      rate: 4.7,
      count: 2750,
    },
  },
  {
    id: 102,
    title: "Smartphone",
    price: 999.99,
    description:
      "Latest smartphone with cutting-edge technology, high-resolution camera, and long-lasting battery.",
    category: "electronics",
    image: "https://picsum.photos/200/301",
    rating: {
      rate: 4.5,
      count: 1500,
    },
  },
];
