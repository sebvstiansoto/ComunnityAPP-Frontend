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
    const [showModal, setShowModal] = useState(false);

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

    function redirectProfile(userId) {
        navigate(`/profile/${userId}`);
    }


    function sendNotification(e) {
        e.preventDefault(); // Aseguramos que el evento se pase y se prevenga su comportamiento por defecto
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
        e.preventDefault(); // Aseguramos que el evento se pase y se prevenga su comportamiento por defecto
        const userId = localStorage.getItem('id_usuario');
        const publicacionId = publicacion.id_publicacion;

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/' + params.id, {
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
                console.log('Favorito añadido', responseConverted);
            })
            .catch((error) => {
                console.error("Error al añadir favorito:", error);
            });
    }

    function handleAddToFavorites(e) {
        e.preventDefault(); // Se asegura que el evento pase y se prevenga el comportamiento predeterminado del formulario
        sendData(e);        // Pasar el evento aquí
        sendNotification(e); // Pasar el evento aquí
    }

    function handleSaveFavorite() {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const nuevaListaFavoritos = [...favoritos, publicacion];
        localStorage.setItem("favoritos", JSON.stringify(nuevaListaFavoritos));
        setShowModal(true);
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
            style={{ width: "500px", height: "auto" }} // Definimos el tamaño cuadrado de 500x500
        >
            <div className="card-body d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                <div>
                    <div className="card-title d-flex gap-2 align-items-center" style={{ cursor: "pointer" }} onClick={() => redirectProfile(publicacion.id_usuario)}>
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
