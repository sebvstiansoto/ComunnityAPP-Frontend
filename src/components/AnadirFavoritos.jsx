import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AnadirFavoritos.css';

export function AnadirFavoritos({ id_publicacion }) {
    const params = useParams(); 
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [notificaciones, setNotificaciones] = useState([]);

    function changeTitulo(e) {
        setTitulo(e.target.value);
    }

    function changeDescripcion(e) {
        setDescripcion(e.target.value);
    }

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
                id_usuario: parseInt(userId), 
                id_publicacion: id_publicacion,  
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
                id_usuario: params.id, 
                id_publicacion: id_publicacion,  
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

    function handleAddToFavorites(e) {
        e.preventDefault();
        sendData();           
        sendNotification();  
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
