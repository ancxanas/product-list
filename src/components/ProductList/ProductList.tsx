import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Product } from "../../types/product";
import { View } from "../../types/view";
import productService from "../../services/product";
import "./ProductList.css";
import ViewToggleButtons from "../ViewToggleButtons/ViewToggleButtons";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import { PRODUCT_LIST, viewType } from "@/constant";

const ProductCardView = lazy(
  () => import("../ProductCardView/ProductCardView")
);
const ProductTableView = lazy(
  () => import("../ProductTableView/ProductTableView")
);

const PageSize = 10;

const ProductList = () => {
  const [view, setView] = useState<View>(viewType.TABLE_VIEW);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    productService.getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  return (
    <div className="product-list-container">
      <header className="product-list-header">
        <ViewToggleButtons view={view} setView={setView} />
        <div className="product-list-title-container">
          <h1 className="product-list-title" id="product-list-title">
            {PRODUCT_LIST}
          </h1>
        </div>
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={PageSize}
        />
      </header>
      <div></div>
      <Suspense fallback={<Loading />}>
        <main className="product-list" aria-labelledby="product-list-title">
          {view === viewType.CARD_VIEW ? (
            <ProductCardView products={currentPageData} />
          ) : (
            <ProductTableView products={currentPageData} />
          )}
        </main>
      </Suspense>
    </div>
  );
};

export default ProductList;
