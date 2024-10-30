import { Product } from "../types/product";

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error(`Failed to fetch products:`, error as Error);
    throw error;
  }
};

export default { getAllProducts };
