import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import FormDataProvider from "./context/FormDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormDataProvider>
      <Router>
        <App />
      </Router>
    </FormDataProvider>
  </React.StrictMode>,
);
