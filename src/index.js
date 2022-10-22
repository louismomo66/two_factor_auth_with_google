import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";
import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0ViX39bdXZQQGVcVkQ="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
