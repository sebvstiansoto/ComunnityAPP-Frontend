import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Publicacion } from '../components/Publicacion.jsx'

export function ServicesPage() {

    let [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicaciones_filtrada/1')
            .then(response => response.json())
            .then(data => setPublicaciones(data));
    }, []);
console.log (publicaciones)

    return (
        <React.Fragment>
            <Navbar />
            <main className="mt-5 pt-5">
                <div className="d-flex flex-column justify-content-start align-items-center gap-3">
                    {publicaciones.map((publicacion, index) => (
                        <Publicacion publicacion={publicacion} key={index} />
                    ))}
                </div>
            </main>
        </React.Fragment>
    );
}