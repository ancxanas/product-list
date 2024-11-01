import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { View } from "../../types/view";
import productService from "../../services/product";
import "./ProductList.css";
import ProductCardView from "../ProductCardView/ProductCardView";
import ProductTableView from "../ProductTableView/ProductTableView";
import ViewToggleButtons from "../ViewToggleButtons/ViewToggleButtons";

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
      <div className="product-list-header">
        <ViewToggleButtons view={view} setView={setView} />
        <div>
          <h1 className="product-list-title">Product List</h1>
        </div>
      </div>
      <div className="product-list">
        {view === "card" ? (
          <ProductCardView products={products} />
        ) : (
          <ProductTableView products={products} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
