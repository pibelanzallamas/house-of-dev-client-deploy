import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotifications />
      <App />
    </BrowserRouter>
  </Provider>
);
