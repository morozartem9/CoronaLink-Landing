import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { App } from "./components/app/app";

import { I18nProvider } from "./contexts/internationalization";

const root = document.getElementById("root");

ReactDOM.render(
  <I18nProvider>
    <App />
  </I18nProvider>,
  root,
);
