import { render, screen, fireEvent } from "@testing-library/react";
import ProductModal from "../ProductModal/ProductModal"; // Adjust the import path as necessary
import { Product } from "../../types/product";
import Modal from "react-modal";

Modal.setAppElement(document.createElement("div"));

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

describe("ProductModal", () => {
  test("renders the modal with product details when open", () => {
    render(
      <ProductModal
        isOpen={true}
        onRequestClose={jest.fn()}
        product={mockProduct}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(/wireless noise cancelling headphones/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/\$299.99/i)).toBeInTheDocument();
    expect(
      screen.getByText(/experience world-class sound quality/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/4.7/i)).toBeInTheDocument();
  });

  test("does not render the modal when it is closed", () => {
    render(
      <ProductModal
        isOpen={false}
        onRequestClose={jest.fn()}
        product={mockProduct}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onRequestClose when the close button is clicked", () => {
    const onRequestCloseMock = jest.fn();

    render(
      <ProductModal
        isOpen={true}
        onRequestClose={onRequestCloseMock}
        product={mockProduct}
      />
    );

    const closeButton = screen.getByRole("button", {
      name: /close product details/i,
    });
    fireEvent.click(closeButton);

    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  test("does not render anything when product is null", () => {
    render(
      <ProductModal
        isOpen={true}
        onRequestClose={jest.fn()}
        product={null as never}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
