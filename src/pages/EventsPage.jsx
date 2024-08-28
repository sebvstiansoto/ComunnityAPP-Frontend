import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export function EventsPage() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [valoracion, setValoracion] = useState("");
  const [comentario, setComentario] = useState("");
  const [telefono, setTelefono] = useState("");

  function changeUsuario(e) {
    setUsuario(e.target.value);
  }

  function changeValoracion(e) {
    setValoracion(e.target.value);
  }

  function changeComentario(e) {
    setComentario(e.target.value);
  }

  function changeTelefono(e) {
    setTelefono(e.target.value);
  }

  function sendData(e) {
    e.preventDefault();

    console.log({ usuario, valoracion, comentario, telefono });
    console.log("Preparando para enviar datos al backend");

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usuario,
        valoracion: valoracion,
        comentario: comentario,
        telefono: telefono,
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
        navigate("/favorites");
      })
      .catch((error) => {
        console.error("Ups, algo salió mal 🙄", error);
      });
  }

  // Función para calcular el tiempo transcurrido desde la publicación
  function tiempoTranscurrido(fechaPublicacion) {
    const ahora = new Date();
    const fecha = new Date(fechaPublicacion);
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

  // Ejemplo de datos de publicaciones
  const publicaciones = [
    {
      titulo: "Centro Médico Almendral",
      texto: "Nuevo Centro Médico en el Almendral: El Centro de Salud Familiar Almendral inaugura modernas instalaciones con atención especializada en cardiología y pediatría. ¡Agende su cita hoy!",
      fechaPublicacion: "2024-08-27T09:59:00Z",
    },
    {
      titulo: "Hospital Van Buren",
      texto: "Ampliación en Hospital Van Buren: El Hospital Carlos Van Buren suma 20 nuevas camas UCI y refuerza su equipo de profesionales para mejorar la atención de pacientes críticos.",
      fechaPublicacion: "2024-08-26T09:55:00Z",
    },
    {
      titulo: "Clínica Valparaíso",
      texto: "Clínica Valparaíso Lanza Programa de Telemedicina: Clínica Valparaíso ahora ofrece consultas médicas online para todas sus especialidades. Atención segura y cómoda desde su hogar.",
      fechaPublicacion: "2024-08-24T09:05:00Z",
    },
  ];

  return (
    <main className="mt-5 pt-5">
      <div className="d-flex flex-column justify-content-start align-items-center gap-3">
        {publicaciones.map((publicacion, index) => (
          <div
            key={index}
            className="card m-auto d-flex justify-content-center"
            style={{ maxWidth: "500px" }}
          >
            <div className="card-body">
              <h5 className="card-title">{publicacion.titulo}</h5>
              <p className="card-text">{publicacion.texto}</p>
              <div className="row">
                <div className="col-12">
                  <p className="card-text mb-3">
                    <small className="text-body-secondary">
                      {tiempoTranscurrido(publicacion.fechaPublicacion)}
                    </small>
                  </p>
                </div>
                <div className="col-6">
                  {/* Botones */}
                  <button type="button" className="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./components/tag.png"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img
                      width="20px"
                      height="20px"
                      src="./components/star.png"
                      alt=""
                    />
                  </button>

                  {/* Modal botón de valoraciones */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Valoración del sitio
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <img
                            width="100px"
                            height="100px"
                            src="./rating.png"
                            alt=""
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./chat (1).png"
                      alt=""
                    />
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <button type="button" className="btn btn-outline-success">
                    <img
                      width="20px"
                      height="20px"
                      src="./components/whatsapp (3).png"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
