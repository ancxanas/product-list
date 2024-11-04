import React from "react";
import { Product } from "../../types/product";
import "./ProductCard.css";
import ProductModal from "../ProductModal/ProductModal";
import { useProductModal } from "../../contexts/ProductModalContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isModalOpen, openModal, closeModal, selectedProduct } =
    useProductModal();

  return (
    <div
      className="product-card"
      role="region"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
        />
      </div>
      <div className="product-details-container">
        <p
          className="product-card-category"
          id={`product-category-${product.id}`}
        >
          {product.category.toUpperCase()}
        </p>
        <h2 className="product-card-title" id={`product-title-${product.id}`}>
          {product.title}
        </h2>
        <p className="product-card-price" id={`product-price-${product.id}`}>
          ${product.price}
        </p>
        <p
          className="product-card-rating"
          aria-label={`Rating: ${product.rating.rate} out of 5`}
        >
          Rating: {product.rating.rate}{" "}
          <span aria-hidden="true">({product.rating.count} reviews) </span>
        </p>
      </div>

      <button
        onClick={() => openModal(product)}
        className="product-show-details"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen && selectedProduct?.id === product.id}
        aria-controls={`productModal-${product.id}`}
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
    </div>
  );
};

export default ProductCard;
