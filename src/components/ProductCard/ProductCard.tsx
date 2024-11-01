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
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
        />
      </div>
      <div className="product-details-container">
        <p className="product-card-category">
          {product.category.toUpperCase()}
        </p>
        <h2 className="product-card-title">{product.title}</h2>
        <p className="product-card-price">${product.price}</p>
        <p className="product-card-rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
      </div>

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
    </div>
  );
};

export default ProductCard;
