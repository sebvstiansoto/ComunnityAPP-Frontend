import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export function Notificaciones() {
  const params = useParams();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/` + params.id)
      .then((response) => response.json())
      .then((data) => {
        setNotificaciones(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener notificaciones:", error);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div>
      <Navbar />
      <div>
        <h2>Notificaciones</h2>
        {loading ? (
          <p>Cargando notificaciones...</p>
        ) : notificaciones.length > 0 ? (
          notificaciones.map((notificacion) => (
            <div key={notificacion.id} className="notificacion">
              <h4>{notificacion.nombre_usuario} añadió tu publicación "{notificacion.titulo}" a favoritos</h4>
              <p>Descripción: {notificacion.descripcion}</p>
              <p>Hora de la publicación: {new Date(notificacion.hora_publicado).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No tienes notificaciones.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
