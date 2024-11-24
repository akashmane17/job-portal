import { createRoot } from "react-dom/client";
import "./index.css";
import "./style.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./app/Context.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>
);
