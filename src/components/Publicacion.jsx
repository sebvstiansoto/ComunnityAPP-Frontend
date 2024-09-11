import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export function Publicacion({ publicacion }) {
    const navigate = useNavigate();
    const params = useParams();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        // Si necesitas cargar datos del usuario o algún otro dato, hazlo aquí
    }, []);

    function sendNotification(e) {
        e.preventDefault();
        const userId = localStorage.getItem('id_usuario');
        const publicacionId = publicacion.id_publicacion;

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/' + params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: parseInt(userId),
                id_publicacion: publicacionId,
            }),
        })
            .then((response) => response.json())
            .then((responseConverted) => {
                console.log(responseConverted);
            })
            .catch((error) => {
                console.error("Error al enviar notificación:", error);
            });
    }

    function sendData(e) {
        e.preventDefault();
        const userId = localStorage.getItem('id_usuario');
        const publicacionId = publicacion.id_publicacion;

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/' + publicacionId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: parseInt(userId),
            }),
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();  // Favorito añadido correctamente
                } else if (response.status === 409) {
                    throw new Error("La publicación ya está en tus favoritos.");
                } else {
                    throw new Error("Hubo un error al añadir a favoritos.");
                }
            })
            .then((responseConverted) => {
                setModalMessage("Favorito añadido correctamente.");
                setShowModal(true);
            })
            .catch((error) => {
                setModalMessage(error.message);
                setShowModal(true);
                console.error("Error al añadir favorito:", error);
            });
    }

    function handleAddToFavorites(e) {
        e.preventDefault();
        sendData(e);
        sendNotification(e);
    }

    function tiempoTranscurrido(fechaPublicacion) {
        const ahora = new Date();
        const fecha = new Date(fechaPublicacion);
        const diferencia = ahora - fecha;

        const segundos = Math.floor(diferencia / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        if (dias > 0) {
            return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
        } else if (horas > 0) {
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
            style={{ width: "70%", height: "auto" }}
        >
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <div className="custom-font">
                    <div className="card-title d-flex gap-2 align-items-center" style={{ cursor: "pointer" }} onClick={() => navigate(`/profile/${publicacion.id_usuario}`)}>
                        <img src={publicacion.img_perfil || "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"} alt="" width={30} height={30} className="rounded-circle " />
                        <i>{publicacion.nombre_usuario}</i>
                    </div>
                    <h4 className="card-title">{publicacion.titulo}</h4>
                    <p className="card-text">{publicacion.descripcion}</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="card-text mb-3">
                            <small className="text-body-secondary">
                                {tiempoTranscurrido(publicacion.hora_publicado)}
                            </small>
                        </p>
                    </div>
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={handleAddToFavorites}
                            alt="Guardar Publicación"
                            title="Añadir a Favoritos"
                        >
                            <i className="bi bi-bookmark-heart-fill text-dark"></i>
                        </button>

                        {/* Modal de confirmación o error */}
                        {showModal && (
                            <div
                                className="modal fade show"
                                style={{ display: "block" }}
                                tabIndex="-1"
                                aria-labelledby="successModalLabel"
                                aria-hidden="true"
                                role="dialog"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="successModalLabel">
                                                {modalMessage.includes("correctamente") ? "Éxito" : "Advertencia"}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowModal(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            {modalMessage}
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <a type="button" className="btn btn-outline-success" href={"https://wa.me/" + publicacion.telefono}>
                            <i className="bi bi-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
