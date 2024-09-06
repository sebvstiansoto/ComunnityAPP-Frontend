import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { HealthPage } from "./pages/HealthPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NewsPage } from "./pages/NewsPage";
import { NoticesPage } from "./pages/NoticesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PublishPage } from "./pages/PublishPage";
import { ChangePassword } from "./pages/ChangePassword";
import { RecoveryPage } from "./pages/RecoveryPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ServicesPage } from "./pages/ServicesPage";
import { Notificaciones } from "./components/Notificaciones";
import { Favorites } from "./components/Favorites";

const router = createBrowserRouter([
  { path: "/events", element: <EventsPage /> },
  { path: "/health", element: <HealthPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/notices", element: <NoticesPage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/publish", element: <PublishPage /> },
  { path: "/changepass", element: <ChangePassword /> },
  { path: "/recovery", element: <RecoveryPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/notificaciones", element: <Notificaciones /> },
  { path: "/favorites", element: <Favorites /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
