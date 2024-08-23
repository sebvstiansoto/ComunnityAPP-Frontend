import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; // Evita continuar si no hay token
    }

    // Fetch para obtener las publicaciones
    fetch("http://localhost:3000/obtener_publicaciones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar token en el encabezado si es necesario
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseConvert) => {
        if (Array.isArray(responseConvert)) {
          setPublicaciones(responseConvert);
        } else {
          setError("Datos de publicaciones no válidos.");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main class="mt-5 pt-5">
      <div class="row justify-content-center">
        <div class="col-6">
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Pattynouel ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Camipizarro ha comentado
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Sebasoto ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Diegocortes ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Maxihnen ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Diegovergara ha comentado
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Jennmolina ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
            <li class="list-group-item p-3 d-flex justify-content-between">
              <p class="m-0">
                Isaacprada ha comentado tu
                <a class="text-success" href="">
                  publicación
                </a>
              </p>
              <small class="text-muted">Hace 5 min</small>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
