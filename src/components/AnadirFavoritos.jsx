import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AnadirFavoritos.css';

export function AnadirFavoritos({ id_publicacion }) {
    const params = useParams(); // Asegúrate de que id_usuario venga de la URL
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [notificaciones, setNotificaciones] = useState([]);

    // Funciones para manejar los cambios
    function changeTitulo(e) {
        setTitulo(e.target.value);
    }

    function changeDescripcion(e) {
        setDescripcion(e.target.value);
    }

    // Función para enviar la notificación
    function sendNotification() {
        if (!id_publicacion) {
            console.error("El id de la publicación no está definido");
            return;
        }
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/notificaciones/' + params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: parseInt(userId), // id_usuario_receptor viene del localStorage
                id_publicacion: id_publicacion,  // id_publicacion es pasado como prop
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

    // Función para enviar los datos al backend y añadir a favoritos
    function sendData() {
        if (!id_publicacion) {
            console.error("El id de la publicación no está definido");
            return;
        }

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/' + params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: params.id, // id_usuario viene de la URL
                id_publicacion: id_publicacion,  // id_publicacion es pasado como prop
            }),
        })
        .then((response) => response.json())
        .then((responseConverted) => {
            console.log(responseConverted);
        })
        .catch((error) => {
            console.error("Error al añadir favorito:", error);
        });
    }

    // Manejador para añadir a favoritos y enviar notificación
    function handleAddToFavorites(e) {
        e.preventDefault();
        sendData();           // Añadir la publicación a favoritos
        sendNotification();  // Enviar notificación al dueño de la publicación
    }

    return (
        <div>
            <div>
                <label>
                    Título:
                    <input 
                        type="text" 
                        value={titulo}
                        onChange={changeTitulo} 
                    />
                </label>
                <label>
                    Descripción:
                    <textarea 
                        value={descripcion}
                        onChange={changeDescripcion} 
                    />
                </label>
                <button onClick={handleAddToFavorites}>Añadir a Favoritos</button>
            </div>
        </div>
    );
}
