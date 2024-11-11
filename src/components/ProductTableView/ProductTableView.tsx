import { useProductModal } from "../../contexts/ProductModalContext";
import { Product } from "../../types/product";
import ProductModal from "../ProductModal/ProductModal";
import "./ProductTableView.css";
import { SHOW_DETAILS } from "@/constant";
interface ProductTableViewProps {
  products: Product[];
}

const ProductTableView: React.FC<ProductTableViewProps> = ({ products }) => {
  const { isModalOpen, openModal, closeModal, selectedProduct } =
    useProductModal();

  return (
    <div className="product-table-view">
      <table>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-table-image"
                />
              </td>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <span aria-label={`Rating: ${product.rating.rate} out of 5`}>
                  {product.rating.rate}
                </span>
                <span aria-label={`${product.rating.count} reviews`}>
                  ({product.rating.count} reviews)
                </span>
              </td>
              <td>
                <button
                  onClick={() => openModal(product)}
                  className="product-show-details"
                  aria-haspopup="dialog"
                  aria-expanded={
                    isModalOpen && selectedProduct?.id === product.id
                  }
                  aria-controls={`productModal-${product.id}`}
                >
                  {SHOW_DETAILS}
                </button>
                {isModalOpen && selectedProduct?.id === product.id && (
                  <ProductModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    product={selectedProduct}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableView;
