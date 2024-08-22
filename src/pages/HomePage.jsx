import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el token está presente en localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return; // Evita continuar si no hay token
        }

        // Fetch para obtener las publicaciones
        fetch('http://localhost:3000/obtener_publicaciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar token en el encabezado si es necesario
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseConvert) => {
            if (Array.isArray(responseConvert)) {
                setPublicaciones(responseConvert);
            } else {
                setError('Datos de publicaciones no válidos.');
            }
        })
        .catch((error) => {
            setError(error.message);
            console.error('Error fetching data:', error);
        });
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <NavBar /> 
        <div className="container">
            <div className="row">
                {publicaciones.length > 0 ? (
                    publicaciones.map((post, index) => ( 
                        <div className="col-3" key={post.id || index}> 
                            <div className="card">
                                <img src={post.img_publicacion} className="card-img-top" alt="Post" />
                                <div className="card-body">
                                    <h5 className="card-title">{post.titulo}</h5>
                                    <p className="card-text">{post.descripcion}</p>
                                    <a href="#" className="btn btn-primary">Leer más</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay publicaciones disponibles.</p>
                )}
            </div>
        </div>
        </>
    );
}
