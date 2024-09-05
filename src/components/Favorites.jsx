import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export function Favorites() {
  // Estado para almacenar las publicaciones favoritas
  const params = useParams();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/" + params.id);
  },[])

  // Renderizar las publicaciones guardadas
  return (
    <React.Fragment>
      <Navbar />

      <div className="favorites-page">
        <h1>Favoritos</h1>
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((post, index) => (
              <div key={index} className="card m-auto d-flex justify-content-center" style={{ maxWidth: "500px" }}>
                <div className="card-body">
                  <h5 className="card-title">{post.nombre_usuario}</h5>
                  <h4 className="card-title">{post.titulo}</h4>
                  <p className="card-text">{post.descripcion}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay publicaciones guardadas.</p>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}