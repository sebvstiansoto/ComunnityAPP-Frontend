import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

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
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener el id_usuario desde el localStorage (por ejemplo, el usuario autenticado)
  const idUsuario = localStorage.getItem("id_usuario");

  if (idUsuario) {
    useEffect(() => {
      fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/` + idUsuario)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener notificaciones");
          }
          return response.json();
        })
        .then((data) => {
          setNotificaciones(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener notificaciones:", error);
          setLoading(false);
        });
    }, [idUsuario]);
  } else {
    console.error("No se encontró el id_usuario en localStorage");
  }

  useEffect(() => {
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/` + idUsuario)
      .then((response) => response.json())
      .then((data) => {
        setNotificaciones(data);
        setLoading(false); // Deja de cargar una vez que obtienes las notificaciones
      })
      .catch((error) => {
        console.error("Error al obtener notificaciones:", error);
        setLoading(false); // Deja de cargar si hay un error
      });
  }, [idUsuario]);

  return (
    <>
    <div>
      <h2>Notificaciones</h2>
      {loading ? (
        <p>Cargando notificaciones...</p>
      ) : notificaciones.length > 0 ? (
        notificaciones.map((notificacion) => (
          <div key={notificacion.hora_notificacion} className="notificacion">
            <h4>{notificacion.usuario_interactuante} interactuó con tu publicación "{notificacion.titulo}"</h4>
            <p>Descripción: {notificacion.descripcion}</p>
            <p>Hora de la publicación: {new Date(notificacion.hora_publicado).toLocaleString()}</p>
            <p>Notificado el: {new Date(notificacion.hora_notificacion).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
    <Footer />
  </>
  );
}

export default Notificaciones;
