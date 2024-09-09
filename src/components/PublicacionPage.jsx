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
    }, [params.id]); 

    return (
        <div className="container">
            {publicaciones.length === 0 ? (
                <p>No se encontró ninguna publicación.</p>
            ) : (
                publicaciones.map((publicacion) => (
                    <div key={publicacion.id_publicacion} className="publicacion-card">
                        <h2>{publicacion.titulo}</h2>
                        <p><strong>Autor:</strong> {publicacion.nombre_usuario}</p>
                        <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                        <p><strong>Fecha de publicación:</strong> {new Date(publicacion.hora_publicado).toLocaleDateString('es-ES')}</p>

                        {/* Mover StarRating dentro del map donde publicacion está definido */}
                    </div>
                ))
            )}
        </div>
    );
}
