import { render, screen, fireEvent } from "@testing-library/react";
import ProductTableView from "../ProductTableView/ProductTableView"; // Adjust the import path as necessary
import { useProductModal } from "../../contexts/ProductModalContext";
import Modal from "react-modal";
import { mockProducts } from "@/mocks/mockProducts";

Modal.setAppElement(document.createElement("div"));

jest.mock("../../contexts/ProductModalContext");

const mockUseProductModal = useProductModal as jest.Mock;

describe("ProductTableView", () => {
  beforeEach(() => {
    mockUseProductModal.mockReturnValue({
      isModalOpen: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      selectedProduct: null,
    });
  });

  test("renders the product table with product details", () => {
    render(<ProductTableView products={mockProducts} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(mockProducts.length + 1);

    mockProducts.forEach((product) => {
      expect(screen.getByAltText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getAllByText(product.category)).toHaveLength(2);
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Rating: ${product.rating.rate}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`(${product.rating.count} reviews)`)
      ).toBeInTheDocument();
    });
  });

  test("calls openModal when 'Show Details' button is clicked", () => {
    const openModalMock = jest.fn();
    mockUseProductModal.mockReturnValue({
      isModalOpen: false,
      openModal: openModalMock,
      closeModal: jest.fn(),
      selectedProduct: null,
    });

    render(<ProductTableView products={mockProducts} />);

    const showDetailsButtons = screen.getAllByRole("button", {
      name: /show details/i,
    });
    fireEvent.click(showDetailsButtons[0]);

    expect(openModalMock).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("renders the modal with product details when modal is open", () => {
    mockUseProductModal.mockReturnValue({
      isModalOpen: true,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      selectedProduct: mockProducts[0],
    });

    render(<ProductTableView products={mockProducts} />);

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
      selectedProduct: mockProducts[0],
    });

    render(<ProductTableView products={mockProducts} />);

    const modalContent = screen.queryByRole("dialog");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("calls closeModal when modal close button is clicked", () => {
    const closeModalMock = jest.fn();
    mockUseProductModal.mockReturnValue({
      isModalOpen: true,
      openModal: jest.fn(),
      closeModal: closeModalMock,
      selectedProduct: mockProducts[0],
    });

    render(<ProductTableView products={mockProducts} />);

    const closeButton = screen.getByRole("button", {
      name: /close product details/i,
    });
    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});
