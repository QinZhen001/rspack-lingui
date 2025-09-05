import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import "./utils/i18n";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  );
}
