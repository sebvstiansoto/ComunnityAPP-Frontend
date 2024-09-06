import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FavStar } from "./FavStar.jsx";
import { AnadirFavoritos } from "./AnadirFavoritos.jsx";

export function Publicacion({ publicacion }) {
    const navigate = useNavigate();
    const params = useParams();

    const [usuario, setUsuario] = useState("");
    const [valoracion, setValoracion] = useState([
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false },
        { isActive: false },
    ]);
    const [comentario, setComentario] = useState("");
    const [telefono, setTelefono] = useState("");
    const [infoUsuario, setInfoUsuario] = useState("");
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

    useEffect(() => {
        getUserInfo();
    }, []);

    function getUserInfo() {
        fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/" + params.id)
            .then((response) => response.json())
            .then((responseConverted) => {
                setInfoUsuario(responseConverted);
            });
    }

    function sendData(e) {
        e.preventDefault();
        const userId = localStorage.getItem('id_usuario');
        const publicacionId = publicacion.id_publicacion;

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/' + params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: parseInt(userId), // id_usuario viene de la URL
                id_publicacion: publicacionId,  // id_publicacion es pasado como prop
            }),
        })
        .then((response) => response.json())
        .then((responseConverted) => {
            alert("Favorito guardado correctamente"); // Cambiar a modal
        })
        .catch((error) => {
            console.error("Error al añadir favorito:", error);
        });
    }

    function handleSaveFavorite() {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const nuevaListaFavoritos = [...favoritos, publicacion];
        localStorage.setItem("favoritos", JSON.stringify(nuevaListaFavoritos));
        setShowModal(true); // Mostrar modal al guardar la publicación
    }

    // Función para calcular el tiempo transcurrido desde la publicación
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
            style={{ width: "500px", height: "500px" }} // Definimos el tamaño cuadrado de 500x500
        >
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <div>
                    <h5 className="card-title">{publicacion.nombre_usuario}</h5>
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
                        {/* Botón para guardar publicación como favorita */}
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={sendData}
                            alt="Guardar Publicación"
                            title="Anadir a Favoritos"
                        >
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/tag.png"
                                alt="Valoración"
                            />
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#valoracionModal"
                        >
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/star.png"
                                alt="Valoración"
                            />
                        </button>

                                                {/* Modal de Favoritos */}
                                                <div
                            className="modal fade"
                            id="favoritosModal"
                            tabIndex="-1"
                            aria-labelledby="favoritosModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="favoritosModalLabel">
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
                                        < AnadirFavoritos id_publicacion={publicacion.id} />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            data-bs-dismiss="modal"
                                        >
                                            Cerrar
                                        </button>
                                        <button type="button" className="btn btn-outline-warning">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal de valoraciones */}
                        <div
                            className="modal fade"
                            id="valoracionModal"
                            tabIndex="-1"
                            aria-labelledby="valoracionModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="valoracionModalLabel">
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
                                        {valoracion.map((val, index) => (
                                            <FavStar
                                                key={index}
                                                isActive={val.isActive}
                                                activate={() => {
                                                    setValoracion((prev) =>
                                                        prev.map((valor, i) =>
                                                            i <= index
                                                                ? { isActive: !valor.isActive }
                                                                : { isActive: false }
                                                        )
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            data-bs-dismiss="modal"
                                        >
                                            Cerrar
                                        </button>
                                        <button type="button" className="btn btn-outline-warning">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal de confirmación de guardado */}
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
                                                Publicación guardada
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowModal(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            Tu publicación fue guardada exitosamente.
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
                        <a type="button" className="btn btn-outline-success" href={"https://wa.me/" + "+569426090"}>
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/whatsapp (3).png"
                                alt="WhatsApp"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
