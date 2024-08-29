import React, { useState, useEffect } from 'react';
import Publicaciones from '../components/Publicaciones';

export function HomePage() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        recibirPublicaciones();
    }, []);

    function recibirPublicaciones() {
        fetch('http://localhost:3000/obtener_publicaciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseConverted) => {
                console.log('Publicaciones recibidas:', responseConverted);
                setPublicaciones(responseConverted); // Asumiendo que la respuesta es un array de publicaciones
            })
            .catch((error) => {
                console.error('Ups algo salió mal 😞', error);
            });
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Bienvenido a la HomePage</h1>
            <Publicaciones publicaciones={publicaciones} />
        </div>
    );
}
