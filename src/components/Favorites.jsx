import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Favorites.css';

const formatearFecha = (fechaPublicacion) => {
  const fecha = new Date(fechaPublicacion);
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones); // Formato: "7 septiembre 2024"
};

export function Favorites() {
  const params = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos
  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/" + params.id)
      .then((response) => response.json())
      .then((responseConverter) => {
        setFavorites(responseConverter);
        console.log(responseConverter);
      })
      .catch((error) => {
        console.error("Error fetching favoritos:", error);
      });
  }, [params.id]);

  // Redirigir a la publicación
  const handleClick = (id_publicacion) => {
    navigate(`/publicacion/${id_publicacion}`);
  };

  // Eliminar favorito
  const eliminarFavorito = (id_publicacion) => {
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/favoritos/${params.id}/${id_publicacion}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseConverted) => {
      if (responseConverted.message === 'Favorito eliminado correctamente') {
        // Actualizar la lista de favoritos eliminando el elemento correspondiente
        setFavorites(favorites.filter(fav => fav.id_publicacion !== id_publicacion));
        alert('Publicación eliminada de favoritos');
      } else {
        alert(responseConverted.error || 'Error al eliminar favorito');
      }
    })
    .catch((error) => {
      console.error("Error al eliminar favorito:", error);
    });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='container'>
    <h1 style={{ fontSize: '2rem', marginBottom: '2rem', marginTop: '1rem' }}>
      <strong>Favoritos</strong>
    </h1>
    {favorites.length === 0 ? (
      <p>No hay publicaciones favoritas.</p>
    ) : (
      <div className="row">
        {favorites.map((publicacion, index) => (
          <div key={index} className='col-md-4 col-sm-6 mb-4'>
            <div
              className='card h-100'
              style={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: '500px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div className='card-body' onClick={() => handleClick(publicacion.id_publicacion)}>
                <p style={{ fontSize: '0.7rem' }}><strong>@</strong> {publicacion.nombre_usuario}</p>
                <h2 style={{ fontSize: '1.6rem' }}>{publicacion.titulo}</h2>
                <p style={{ fontSize: '0.8rem' }}><strong>Descripcion: </strong> {publicacion.descripcion}</p>
                <p style={{ fontSize: '0.7rem' }}><strong>Publicado el {formatearFecha(publicacion.hora_publicado)}</strong></p>
              </div>

              <div className="d-flex justify-content-between p-3">
                <a type="button" className="btn btn-outline-success" href={"https://wa.me/" + publicacion.telefono}>
                  <img width="15px" height="15px" src="/src/assets/whatsapp (3).png" alt="WhatsApp" />
                </a>
                <button
                  className="btn btn-outline-danger btn-sm"  // Reduzco el tamaño del botón
                  style={{ fontSize: '0.75rem' }} // Opcional: Ajusta el tamaño de la fuente
                  onClick={() => eliminarFavorito(publicacion.id_publicacion)}
                >
                  Eliminar de Favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
</div>


      <Footer />
    </React.Fragment>
  );
}
