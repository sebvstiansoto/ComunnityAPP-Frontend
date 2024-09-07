import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function PublicacionPage() {
    const params = useParams();
    const [publicaciones, setPublicaciones] = useState([])

    useEffect(() => {
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicaciones/' + params.id)
            .then((response) => {
                return response.json()
            })
            .then((responseConverted) => {
                setPublicaciones(responseConverted)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    })
    return (
        <div>

        </div>
    );
}