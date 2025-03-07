import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./utils/i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { UserProfileDataProvider } from "./contexts/ProfileDataContext";
import { ToastProvider } from "./contexts/ToastContext";

const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <ToastProvider>
      <CurrentUserProvider>
        <UserProfileDataProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </UserProfileDataProvider>
      </CurrentUserProvider>
    </ToastProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
