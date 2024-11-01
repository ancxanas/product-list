import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/product";
import "./ProductCardView.css";

interface ProductCardViewProps {
  products: Product[];
}

const ProductCardView: React.FC<ProductCardViewProps> = ({ products }) => {
  return (
    <div className="product-card-view">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCardView;
