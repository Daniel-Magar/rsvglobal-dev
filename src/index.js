import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
