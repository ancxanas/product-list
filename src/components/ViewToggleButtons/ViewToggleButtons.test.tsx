import { render, screen, fireEvent } from "@testing-library/react";
import ViewToggleButtons from "./ViewToggleButtons";

describe("ViewToggleButtons", () => {
  let setViewMock: jest.Mock;

  beforeEach(() => {
    setViewMock = jest.fn();
  });

  test("renders the table and card view buttons", () => {
    render(<ViewToggleButtons view="table" setView={setViewMock} />);

    expect(screen.getByLabelText("Switch to table view")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to card view")).toBeInTheDocument();
  });

  test("table button should be active when view is table", () => {
    render(<ViewToggleButtons view="table" setView={setViewMock} />);

    const tableButton = screen.getByLabelText("Switch to table view");
    expect(tableButton).toHaveClass("active");
    expect(tableButton).toHaveAttribute("aria-pressed", "true");
  });

  test("card button should be active when view is card", () => {
    render(<ViewToggleButtons view="card" setView={setViewMock} />);

    const cardButton = screen.getByLabelText("Switch to card view");
    expect(cardButton).toHaveClass("active");
    expect(cardButton).toHaveAttribute("aria-pressed", "true");
  });

  test('clicking the table button calls setView with "table"', () => {
    render(<ViewToggleButtons view="card" setView={setViewMock} />);

    const tableButton = screen.getByLabelText("Switch to table view");
    fireEvent.click(tableButton);
    expect(setViewMock).toHaveBeenCalledWith("table");
  });

  test('clicking the card button calls setView with "card"', () => {
    render(<ViewToggleButtons view="table" setView={setViewMock} />);

    const cardButton = screen.getByLabelText("Switch to card view");
    fireEvent.click(cardButton);
    expect(setViewMock).toHaveBeenCalledWith("card");
  });
});
