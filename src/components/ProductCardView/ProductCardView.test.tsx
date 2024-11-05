import { render, screen } from "@testing-library/react";
import ProductCardView from "../ProductCardView/ProductCardView"; // Adjust the import path as necessary
import { mockProducts } from "@/mocks/mockProducts";

describe("ProductCardView", () => {
  test("renders the product card view with the correct number of product cards", () => {
    render(<ProductCardView products={mockProducts} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(mockProducts.length);
  });

  test("renders each product card with the correct product details", () => {
    render(<ProductCardView products={mockProducts} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(
        screen.getAllByText(new RegExp(product.category, "i"))
      ).toHaveLength(2);
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Rating: ${product.rating.rate}`)
      ).toBeInTheDocument();
    });
  });
});
