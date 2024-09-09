import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Notificaciones() {
  const params = useParams();
  const [notificacion, setNotificacion] = useState([]);

  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/" + params.id)
      .then((response) => response.json())
      .then((responseConverted) => {
        setNotificacion(responseConverted); 
        console.log(responseConverted);  
      })
      .catch((error) => {
        console.error("Error al obtener notificaciones:", error);
      });
  }, [params.id]);

  return (
    <div>
      <h2>Notificaciones</h2>
      {notificacion.length > 0 ? (
        notificacion.map((notificacion, index) => (
          <div key={index} className="notificacion">
            <h4>{notificacion.nombre_usuario} añadió tu publicación "{notificacion.titulo}" a favoritos</h4>
            <p>Descripción: {notificacion.descripcion}</p>
            <p>Hora de la publicación: {new Date(notificacion.hora_publicado).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
  );
}
