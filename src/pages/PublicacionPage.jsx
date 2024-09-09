import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Perfil.css';

export function PublicacionPage() {
    const params = useParams();
    const [publicaciones, setPublicaciones] = useState([]);
    const [usuario, setUsuario] = useState(null); 


    useEffect(() => {

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicacion/' + params.id)
            .then((response) => response.json())
            .then((responseConverted) => {
                setPublicaciones(responseConverted);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        fetchUsuario();
    }, [params.id]); 

    function fetchUsuario() {
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/' + userId)
            .then((response) => response.json())
            .then((responseConverted) => {
                console.log(responseConverted); 
                setUsuario(responseConverted); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="container">
            <div>
                {(publicaciones.map((profile) => {
                    return (
                        <div key={profile.id_usuario} className="card">
                            <h2>{profile.nombre_usuario}</h2>
                            <p>{profile.descripcion_usuario}</p>
                        </div>
                    );
                }))}
            </div>

            <h1>Publicación Detalles</h1>
            {publicaciones.length === 0 ? (
                <p>No se encontró ninguna publicación.</p>
            ) : (
                publicaciones.map((publicacion) => (
                    <div key={publicacion.id_publicacion} className="publicacion-card">
                        <h2>{publicacion.titulo}</h2>
                        <p><strong>Autor:</strong> {publicacion.nombre_usuario}</p>
                        <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                        <p><strong>Fecha de publicación:</strong> {new Date(publicacion.hora_publicado).toLocaleDateString('es-ES')}</p>
                    </div>
                ))
            )}
        </div>
    );
}
