import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FavStar } from "./FavStar.jsx"

export function Publicacion({ publicacion }) {

    const navigate = useNavigate();
    const params = useParams(); 

    const [usuario, setUsuario] = useState("");

    const [valoracion, setValoracion] = useState([
        {
            isActive: false
        },
        {
            isActive: false
        },
        {
            isActive: false
        },
        {
            isActive: false
        },
        {
            isActive: false
        },
    ]);
    const [comentario, setComentario] = useState("");
    const [telefono, setTelefono] = useState("");
    const [infoUsuario, setInfoUsuario] = useState("");

    useEffect(() => {
        getUserInfo();
      }, []);

    function getUserInfo() {
        fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/2")
          .then(response => {
            return response.json();
          })
          .then(responseConverted => {
          setInfoUsuario(responseConverted);
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1642699146.
          console.log (responseConverted)
          })
      }


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

    return (
        <div
            className="card m-auto d-flex justify-content-center"
            style={{ maxWidth: "500px" }}
        >
            <div className="card-body">
                <h5 className="card-title">{publicacion.nombre_usuario}</h5>
                <h4 className="card-title">{publicacion.titulo}</h4>
                <p className="card-text">{publicacion.descripcion}</p>
                <div className="row">
                    <div className="col-12">
                        <p className="card-text mb-3">
                            <small className="text-body-secondary">
                                {tiempoTranscurrido(publicacion.hora_publicado)}
                            </small>
                        </p>
                    </div>
                    <div className="col-6">
                        {/* Botones */}
                        <button type="button" className="btn btn-outline-warning">
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/tag.png"
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
                                src="/src/assets/star.png"
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
                                        <FavStar isActive={valoracion[0].isActive} activate={() => {
                                            setValoracion(
                                                (prev) => {
                                                    const newValoracion = prev.map((valoracion, index) => {
                                                        if (index === 0) {
                                                            return { isActive: !valoracion.isActive }
                                                        }
                                                        return valoracion
                                                    })
                                                    return newValoracion
                                                }
                                            )
                                        }} />
                                        <FavStar isActive={valoracion[1].isActive} activate={() => {
                                            setValoracion(
                                                (prev) => {
                                                    const newValoracion = prev.map((valoracion, index, arr) => {
                                                        if (index <= 1) {
                                                            return { isActive: !arr[1].isActive }
                                                        }
                                                        return { isActive: false }
                                                    })
                                                    return newValoracion
                                                }
                                            )
                                        }} />
                                        <FavStar isActive={valoracion[2].isActive} activate={() => {
                                            setValoracion(
                                                (prev) => {
                                                    const newValoracion = prev.map((valoracion, index, arr) => {
                                                        if (index <= 2) {
                                                            return { isActive: !arr[2].isActive }
                                                        }
                                                        return { isActive: false }
                                                    })
                                                    return newValoracion
                                                }
                                            )
                                        }} />
                                        <FavStar isActive={valoracion[3].isActive} activate={() => {
                                            setValoracion(
                                                (prev) => {
                                                    const newValoracion = prev.map((valoracion, index, arr) => {
                                                        if (index <= 3) {
                                                            return { isActive: !arr[3].isActive }
                                                        }
                                                        return { isActive: false }
                                                    })
                                                    return newValoracion
                                                }
                                            )
                                        }} />
                                        <FavStar isActive={valoracion[4].isActive} activate={() => {
                                            setValoracion(
                                                (prev) => {
                                                    const newValoracion = prev.map((valoracion, index, arr) => {
                                                        if (index <= 4) {
                                                            return { isActive: !arr[4].isActive }
                                                        }
                                                        return { isActive: false }
                                                    })
                                                    return newValoracion
                                                }
                                            )
                                        }} />
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
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-success">
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/whatsapp (3).png"
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}