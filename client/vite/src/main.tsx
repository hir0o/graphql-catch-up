import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Provider from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <Provider />
    </Suspense>
  </React.StrictMode>
);
