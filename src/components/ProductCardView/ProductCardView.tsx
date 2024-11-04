import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/product";
import "./ProductCardView.css";

interface ProductCardViewProps {
  products: Product[];
}

const ProductCardView: React.FC<ProductCardViewProps> = ({ products }) => {
  return (
    <div
      className="product-card-view"
      role="list"
      aria-label="Product Card List"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductCardView;
