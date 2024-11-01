import { useProductModal } from "../../contexts/ProductModalContext";
import { Product } from "../../types/product";
import ProductModal from "../ProductModal/ProductModal";
import "./ProductTableView.css";

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
            <th>Image</th>
            <th>Category</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
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
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </td>
              <td>
                <button
                  onClick={() => openModal(product)}
                  className="product-show-details"
                >
                  Show Details
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
