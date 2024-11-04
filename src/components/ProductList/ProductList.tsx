import { lazy, Suspense, useEffect, useState } from "react";
import { Product } from "../../types/product";
import { View } from "../../types/view";
import productService from "../../services/product";
import "./ProductList.css";
//import ProductCardView from "../ProductCardView/ProductCardView";
//import ProductTableView from "../ProductTableView/ProductTableView";
import ViewToggleButtons from "../ViewToggleButtons/ViewToggleButtons";
import Loading from "../Loading/Loading";

const ProductCardView = lazy(
  () => import("../ProductCardView/ProductCardView")
);
const ProductTableView = lazy(
  () => import("../ProductTableView/ProductTableView")
);

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
      <header className="product-list-header">
        <ViewToggleButtons view={view} setView={setView} />
        <div>
          <h1 className="product-list-title" id="product-list-title">
            Product List
          </h1>
        </div>
      </header>
      <Suspense fallback={<Loading />}>
        <main className="product-list" aria-labelledby="product-list-title">
          {view === "card" ? (
            <ProductCardView products={products} />
          ) : (
            <ProductTableView products={products} />
          )}
        </main>
      </Suspense>
    </div>
  );
};

export default ProductList;
