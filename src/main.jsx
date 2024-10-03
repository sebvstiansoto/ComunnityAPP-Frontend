import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { HealthPage } from "./pages/HealthPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NoticesPage } from "./pages/NoticesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PublishPage } from "./pages/PublishPage";
import { ChangePassword } from "./pages/ChangePassword";
import { RecoveryPage } from "./pages/RecoveryPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ServicesPage } from "./pages/ServicesPage";
import { Notificaciones } from "./components/Notificaciones";
import { Favorites } from "./components/Favorites";
import { AnadirFavoritos } from "./components/AnadirFavoritos";
import '@fontsource/nunito';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/400-italic.css';


const router = createBrowserRouter([
  { path: "/events/:id", element: <EventsPage /> },
  { path: "/health/:id", element: <HealthPage /> },      // Como anadir el useParams en esta ruta y agregar una condicional si el usuario esta logeado
  { path: "/:id", element: <HomePage /> },             // puede ingresar al HomePage y si no es redireccionado a LoginPage
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/notices/:id", element: <NoticesPage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/publish/:id", element: <PublishPage /> },
  { path: "/changepass", element: <ChangePassword /> },
  { path: "/recovery", element: <RecoveryPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/services/:id", element: <ServicesPage /> },
  { path: "/notificaciones/:id", element: <Notificaciones /> },
  { path: "/favorites/:id", element: <Favorites /> },
  { path: "/anadir/:id", element: <AnadirFavoritos /> },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
