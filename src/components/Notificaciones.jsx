import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Navbar from "../components/Navbar.jsx";

function tiempoTranscurrido(fecha) {
  const fechaNotificacion = new Date(fecha);
  const ahora = new Date();
  const diferencia = ahora - fechaNotificacion;
  const minutos = Math.floor(diferencia / (1000 * 60));
  const horas = Math.floor(diferencia / (1000 * 60 * 60));
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  
  if (minutos < 60) {
    return `${minutos} minutos`;
  } else if (horas < 24) {
    return `${horas} horas`;
  } else {
    return `${dias} días`;
  }
}



export function Notificaciones() {
  const params = useParams();  // Obtener el id de los parámetros de la URL
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/` + params.id)
      .then((response) => {
          return response.json();
      })
      .then((responseConverted) => {
        setNotificaciones(responseConverted);
        console.log(responseConverted)  // Guardar las notificaciones en el estado
      })
      .catch((error) => {
        console.error(error);
      })
  }, []); // Asegúrate de agregar params.id como dependencia

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
                    {notificacion.nombre_usuariop} {notificacion.titulo}
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
