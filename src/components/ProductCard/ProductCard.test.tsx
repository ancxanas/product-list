import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard/ProductCard"; // Adjust the import path as necessary
import { Product } from "../../types/product";
import Modal from "react-modal";
import { useProductModal } from "@/contexts/ProductModalContext";

Modal.setAppElement(document.createElement("div"));

jest.mock("../../contexts/ProductModalContext");

const mockUseProductModal = useProductModal as jest.Mock;

const mockProduct: Product = {
  id: 101,
  title: "Wireless Noise Cancelling Headphones",
  price: 299.99,
  description:
    "Experience world-class sound quality with our wireless noise-cancelling headphones, featuring long battery life and comfortable ear cushions.",
  category: "electronics",
  image: "https://picsum.photos/200/300",
  rating: {
    rate: 4.7,
    count: 2750,
  },
};

describe("ProductCard", () => {
  beforeEach(() => {
    mockUseProductModal.mockReturnValue({
      isModalOpen: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      selectedProduct: null,
    });
  });

  test("renders the product card with product details", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /wireless noise cancelling headphones/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(
      screen.getByText(/wireless noise cancelling headphones/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$299.99/i)).toBeInTheDocument();
    expect(screen.getByText(/rating: 4.7/i)).toBeInTheDocument();
  });

  test("calls openModal when 'Show Details' button is clicked", () => {
    const openModalMock = jest.fn();
    mockUseProductModal.mockReturnValue({
      isModalOpen: false,
      openModal: openModalMock,
      closeModal: jest.fn(),
      selectedProduct: null,
    });

    render(<ProductCard product={mockProduct} />);

    const showDetailsButton = screen.getByRole("button", {
      name: /show details/i,
    });
    fireEvent.click(showDetailsButton);

    expect(openModalMock).toHaveBeenCalledWith(mockProduct);
  });

  test("renders the modal with product details when modal is open", () => {
    mockUseProductModal.mockReturnValue({
      isModalOpen: true,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      selectedProduct: mockProduct,
    });

    render(<ProductCard product={mockProduct} />);

    const modalContent = screen.getByRole("dialog");
    expect(modalContent).toBeInTheDocument();
    expect(
      screen.getByText(/experience world-class sound quality/i)
    ).toBeInTheDocument();
  });

  test("does not render the modal when modal is closed", () => {
    mockUseProductModal.mockReturnValue({
      isModalOpen: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      selectedProduct: mockProduct,
    });

    render(<ProductCard product={mockProduct} />);

    const modalContent = screen.queryByRole("dialog");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("calls closeModal when modal close button is clicked", () => {
    const closeModalMock = jest.fn();
    mockUseProductModal.mockReturnValue({
      isModalOpen: true,
      openModal: jest.fn(),
      closeModal: closeModalMock,
      selectedProduct: mockProduct,
    });

    render(<ProductCard product={mockProduct} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});
