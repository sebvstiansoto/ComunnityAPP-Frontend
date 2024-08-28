import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";

export function Notificaciones() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [comentario, setComentario] = useState("");

  //Fecha de creación
  const comentarios = [
    { usuario: 'Pattynouel', fecha: '2024-08-26T10:00:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Camipizarro', fecha: '2024-08-25T09:50:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Sebasoto', fecha: '2024-08-24T09:45:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Diegocortes', fecha: '2024-08-23T09:40:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Maxihnen', fecha: '2024-08-22T09:35:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Diegovergara', fecha: '2024-08-21T09:30:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Jennmolina', fecha: '2024-08-20T09:25:00Z', texto: 'Ha comentado tu publicación' },
    { usuario: 'Isaacprada', fecha: '2024-08-19T09:20:00Z', texto: 'Ha comentado tu publicación' },
  ];

  function changeUsuario(e) {
    setUsuario(e.target.value);
  }

  function changeComentario(e) {
    setComentario(e.target.value);
  }

  function sendData(e) {
    e.preventDefault();

    console.log({ usuario, comentario });
    console.log("Preparando para enviar datos al backend");

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usuario,
        comentario: comentario,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, details: ${text}`
            );
          });
        }
        return response.json();
      })
      .then((responseConverted) => {
        console.log("Datos enviados con éxito:", responseConverted);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Ups, algo salió mal 🙄", error);
      });
  }

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
              {comentarios.map((comentario, index) => (
                <li key={index} className="list-group-item p-3 d-flex justify-content-between">
                  <p className="m-0">
                    {comentario.usuario} {comentario.texto}
                    <a className="text-success" href="">
                      publicación
                    </a>
                  </p>
                  <small className="text-muted">{tiempoTranscurrido(comentario.fecha)}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
