import { createContext, ReactNode, useContext, useState } from "react";

interface ProductModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextProps>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const ProductModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <ProductModalContext.Provider
      value={{ isModalOpen, openModal, closeModal }}
    >
      {children}
    </ProductModalContext.Provider>
  );
};

const useProductModal = (): ProductModalContextProps =>
  useContext(ProductModalContext);

export { ProductModalProvider, useProductModal };
