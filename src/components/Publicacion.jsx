import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FavStar } from "./FavStar.jsx";

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
        fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/2")
            .then((response) => response.json())
            .then((responseConverted) => {
                setInfoUsuario(responseConverted);
                console.log(responseConverted);
            });
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

        if (horas > 0) {
            return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
        } else if (minutos > 0) {
            return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        } else {
            return `Hace ${segundos} segundo${segundos > 1 ? 's' : ''}`;
        }
    }

    return (
        <div className="card m-auto d-flex justify-content-center" style={{ maxWidth: "500px" }}>
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
                        {/* Botón para guardar publicación como favorita */}
                        <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={handleSaveFavorite}
                        >
                            <img
                                width="20px"
                                height="20px"
                                src="/src/assets/tag.png"
                                alt="Guardar como favorito"
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
                                alt=""
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
