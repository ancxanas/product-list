import { Product } from "../../types/product";
import Modal from "react-modal";
import "./ProductModal.css";

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onRequestClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Modal
      className="product-modal-container"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      overlayClassName="product-modal-overlay"
      aria={{
        labelledby: "product-modal-title",
        describedby: "product-modal-content",
      }}
    >
      <div className="product-modal">
        <div className="product-modal-header">
          <div className="product-modal-close-button-container">
            <button
              className="product-modal-close-button"
              onClick={onRequestClose}
              aria-label="Close product details"
            >
              &times;
            </button>
          </div>
          <div>
            <h1 className="product-modal-title" id="product-modal-title">
              {product.title}
            </h1>
          </div>
        </div>
        <div className="product-modal-content" id="product-modal-content">
          <div className="product-modal-image-container">
            <img
              className="product-modal-image"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="product-modal-details">
            <p className="product-modal-category">
              <span className="category-label">
                <strong>Category:</strong>
              </span>
              <span className="category-value">{product.category}</span>
            </p>
            <p className="product-modal-price">
              <span className="price-label">
                <strong>Price:</strong>
              </span>
              <span className="price-value">${product.price}</span>
            </p>
            <p className="product-modal-description">
              <span className="price-label">
                <strong>Description:</strong>
              </span>
              <span className="description-value">{product.description}</span>
            </p>
            <p className="product-modal-rating">
              <span className="rating-label">
                <strong>Rating:</strong>
              </span>
              <span className="rating-value">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
