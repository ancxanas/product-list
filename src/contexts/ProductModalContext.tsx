import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";

interface ProductModalContextProps {
  isModalOpen: boolean;
  openModal: (product: Product) => void;
  closeModal: () => void;
  selectedProduct: Product | null;
}

const ProductModalContext = createContext<ProductModalContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  selectedProduct: null,
});

const ProductModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <ProductModalContext.Provider
      value={{ isModalOpen, selectedProduct, openModal, closeModal }}
    >
      {children}
    </ProductModalContext.Provider>
  );
};

const useProductModal = (): ProductModalContextProps =>
  useContext(ProductModalContext);

export { ProductModalProvider, useProductModal };
