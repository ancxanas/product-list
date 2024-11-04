import { View } from "../../types/view";

interface ViewToggleButtonsProps {
  view: View;
  setView: (view: View) => void;
}

const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({
  view,
  setView,
}) => (
  <div role="group" aria-label="View Toggle">
    <button
      className={`view-toggle-button table-view-button ${
        view === "table" ? "active" : ""
      }`}
      onClick={() => setView("table")}
      aria-pressed={view === "table"}
      aria-label="Switch to table view"
    >
      Table
    </button>
    <button
      className={`view-toggle-button card-view-button ${
        view === "card" ? "active" : ""
      }`}
      onClick={() => setView("card")}
      aria-pressed={view === "card"}
      aria-label="Switch to card view"
    >
      Card
    </button>
  </div>
);

export default ViewToggleButtons;
