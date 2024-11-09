import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./all.min.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./components/StoreContext/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);