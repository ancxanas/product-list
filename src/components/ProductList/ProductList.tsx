import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import productService from "../../services/product";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
