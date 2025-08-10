import React from "react";
import ReactDOM from "react-dom/client";
import NookatLanding from "./app/page";
import { RootLayout } from "./app/layout";
import "./app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayout>
      <NookatLanding />
    </RootLayout>
  </React.StrictMode>,
);
