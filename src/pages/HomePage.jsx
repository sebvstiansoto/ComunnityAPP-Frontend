import React, { useState, useEffect } from 'react';

export function HomePage() {
    const [publicaciones, setPublicaciones] = useState([]);

    const [descripcion, setDescripcion] = useState('');
    const [img_publicacion, setImgPublicacion] = useState('');
    const [hora_publicacion, setHoraPublicacion] = useState('');
    const [id_usuario, setIdUsuario] = useState('');
    const [id_tipo_publicacion, setIdTipoPublicacion] = useState('');
    const [titulo, setTitulo] = useState('');

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
                setPublicaciones(responseConverted.publicaciones); // Asegúrate de que la respuesta tiene la estructura correcta
            })
            .catch((error) => {
                console.error('Ups algo salió mal 😞', error);
            });
    }

    return (
        <div className="card text-center">
          <div className="card-header" onChange={setIdUsuario}>
            {setIdUsuario}
          </div>
          <div className="card-body" onChange={setTitulo}>
            <h5 className="card-title" onChange={setImgPublicacion}>Special title treatment</h5>
            <p className="card-text" onChange={setDescripcion}>With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary" onChange={setIdTipoPublicacion}>Go somewhere</a>
          </div>
          <div className="card-footer text-body-secondary" onChange={setHoraPublicacion}>
            2 days ago
          </div>
        </div>
    );
}
