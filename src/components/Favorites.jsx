import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Favorites.css'

const formatearFecha = (fechaPublicacion) => {
  const fecha = new Date(fechaPublicacion);
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones); // Formato: "7 septiembre 2024"
};

export function Favorites() {
  // Estado para almacenar las publicaciones favoritas
  const params = useParams();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/" + params.id)
      .then((response) => {
        return response.json();
      })
      .then((responseConverter) => {
        setFavorites(responseConverter);  // Guardar las publicaciones en el estado
        console.log(responseConverter);
      })
      .catch((error) => {
        console.error("Error fetching favoritos:", error);
      });
  },[])

  // Renderizar las publicaciones guardadas
  return (
    <React.Fragment>
      <Navbar />
      <div className='container'>
        <h1>Publicaciones Favoritas</h1>
        {favorites.length === 0 ? (
          <p>No hay publicaciones favoritas.</p>
        ) : (
          favorites.map((publicacion, index) => (
            <div key={index} className='card mb-3'>
              <div className='card-body'>
                <h2>{publicacion.titulo}</h2>
                <p><strong>Usuario:</strong> {publicacion.nombre_usuario}</p>
                <p><strong>Teléfono:</strong> {publicacion.telefono}</p>
                <p><strong>Fecha de publicación:</strong> {formatearFecha(publicacion.hora_publicado)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}