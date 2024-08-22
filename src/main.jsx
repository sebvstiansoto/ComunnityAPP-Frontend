import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { RecoveryPage } from './pages/RecoveryPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ChangePassword } from './pages/ChangePassword';

const router = createBrowserRouter([
  
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage />  },
  { path: '/recovery', element: <RecoveryPage /> },
  { path: '/', element: <HomePage /> },  // Default route
  { path: '/profile', element: <ProfilePage />},
  { path: '/new_password', element: <ChangePassword/>},


  // Add more routes here...
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Verificar si el token está en localStorage al cargar la aplicación
const token = localStorage.getItem('token');
if (token) {
    console.log('Sesión mantenida');
    // Aquí podrías hacer una verificación adicional si es necesario
}
