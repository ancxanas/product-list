import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductModalProvider } from "./contexts/ProductModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductModalProvider>
      <App />
    </ProductModalProvider>
  </StrictMode>
);
