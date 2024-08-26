import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { RecoveryPage } from "./pages/RecoveryPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { PublishPage } from "./pages/PublishPage";

const router = createBrowserRouter([
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/recovery", element: <RecoveryPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/", element: <HomePage /> }, // Default route
  { path: "/publish", element: <PublishPage />},

  // Add more routes here... sssss
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
