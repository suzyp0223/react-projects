import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ 라우터 컨텍스트 제공 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
