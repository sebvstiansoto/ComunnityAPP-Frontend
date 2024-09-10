import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Función para calcular el tiempo transcurrido desde la publicación
function tiempoTranscurrido(fechaPublicacion) {
  const ahora = new Date();
  const diferenciaEnMilisegundos = ahora - new Date(fechaPublicacion);
  
  const segundos = Math.floor(diferenciaEnMilisegundos / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (minutos < 1) {
    return `hace ${segundos} segundos`;
  } else if (horas < 1) {
    return `hace ${minutos} minutos`;
  } else if (dias < 1) {
    return `hace ${horas} horas`;
  } else {
    return `hace ${dias} días`;
  }
}

export function Notificaciones() {
  const params = useParams();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);  // Agregado para manejar el estado de carga

  useEffect(() => {
    setLoading(true); // Comienza a cargar
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/` + params.id)
      .then((response) => response.json())
      .then((data) => {
        setNotificaciones(data);
        setLoading(false); // Deja de cargar cuando los datos han sido recibidos
      })
      .catch((error) => {
        console.error("Error al obtener notificaciones:", error);
        setLoading(false); // También dejamos de cargar en caso de error
      });
  }, [params.id]);

  return (
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
   </React.Fragment>
  );
}

export default Notificaciones;