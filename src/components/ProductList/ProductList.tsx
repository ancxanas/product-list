import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { View } from "../../types/view";
import productService from "../../services/product";
import "./ProductList.css";
import ProductCardView from "../ProductCardView/ProductCardView";

const ProductList = () => {
  const [view, setView] = useState<View>("card");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product List</h1>
      <button className="table-view-button" onClick={() => setView("table")}>
        Table
      </button>
      <button className="card-view-button" onClick={() => setView("card")}>
        Card
      </button>
      <div className="product-list">
        {view === "card" ? <ProductCardView products={products} /> : "hello"}
      </div>
    </div>
  );
};

export default ProductList;
