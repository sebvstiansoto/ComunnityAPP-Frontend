import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { RecoveryPage } from './pages/RecoveryPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage />  },
  { path: '/recovery', element: <RecoveryPage /> },
  { path: '/', element: <HomePage /> },  // Default route

  // Add more routes here...
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
