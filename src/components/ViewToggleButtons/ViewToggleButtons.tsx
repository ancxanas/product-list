import { View } from "../../types/view";

interface ViewToggleButtonsProps {
  view: View;
  setView: (view: View) => void;
}

const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({
  view,
  setView,
}) => (
  <div>
    <button
      className={`view-toggle-button table-view-button ${
        view === "table" ? "active" : ""
      }`}
      onClick={() => setView("table")}
    >
      Table
    </button>
    <button
      className={`view-toggle-button card-view-button ${
        view === "card" ? "active" : ""
      }`}
      onClick={() => setView("card")}
    >
      Card
    </button>
  </div>
);

export default ViewToggleButtons;
