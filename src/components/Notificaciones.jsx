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
    <React.Fragment>
    <Navbar />
    <div className="container mt-1">
      {notificacion.length > 0 ? (
        <table className="table table-striped">
          <tbody>
            {notificacion.map((notificacion, index) => (
              <tr key={index}>
                <td>{notificacion.nombre_usuario} ha guardado esta publicación {tiempoTranscurrido(notificacion.hora_publicado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes notificaciones.</p>
      )}
    </div>
    <Footer />
   </React.Fragment>
  );
}

export default Notificaciones;