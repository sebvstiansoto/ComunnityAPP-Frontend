import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";

export function Notificaciones() {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState([]);

  // Función para obtener las notificaciones del backend
  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNotificaciones(data.notificaciones); // Asegúrate que el backend devuelve un campo 'notificaciones'
      })
      .catch((error) => {
        console.error("Error al obtener notificaciones:", error);
      });
  }, []);

  // Función para calcular el tiempo transcurrido desde un comentario
  function tiempoTranscurrido(fechaComentario) {
    const ahora = new Date();
    const fecha = new Date(fechaComentario);
    const diferencia = ahora - fecha;

    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);

    if (horas > 0) {
      return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (minutos > 0) {
      return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else {
      return `Hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <main className="mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <ul className="list-group list-group-flush">
              {notificaciones.map((notificacion, index) => (
                <li key={index} className="list-group-item p-3 d-flex justify-content-between">
                  <p className="m-0">
                    {notificacion.usuario} {notificacion.texto}
                    <a className="text-success" href="">
                      publicación
                    </a>
                  </p>
                  <small className="text-muted">{tiempoTranscurrido(notificacion.fecha)}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

