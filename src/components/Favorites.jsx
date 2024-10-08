import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Favorites.css';

const formatearFecha = (fechaPublicacion) => {
  const fecha = new Date(fechaPublicacion);
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
};

export function Favorites() {
  const params = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const handleClick = (id_usuario) => {
    navigate(`/profile/${id_usuario}`);
  };

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
          setFavorites(favorites.filter(fav => fav.id_publicacion !== id_publicacion));
          setModalMessage('Publicación eliminada de favoritos');
          setShowModal(true);
        } else {
          setModalMessage(responseConverted.error || 'Error al eliminar favorito');
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar favorito:", error);
        setModalMessage('Error al eliminar favorito');
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='container '>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', marginTop: '0rem' }}>
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
                  <div className='custom-font card-body' onClick={() => handleClick(publicacion.id_usuario)}>
                    <p style={{ fontSize: '0.9rem' }}><strong>@</strong> {publicacion.nombre_usuario}</p>
                    <h2 style={{ fontSize: '1.6rem' }}>{publicacion.titulo}</h2>
                    <p style={{ fontSize: '1.0rem' }}><strong>Descripcion: </strong> {publicacion.descripcion}</p>
                    <p style={{ fontSize: '0.8rem' }}><strong>Publicado el {formatearFecha(publicacion.hora_publicado)}</strong></p>
                  </div>

                  <div className="d-flex justify-content-between p-3">
                    <a type="button" className="btn btn-outline-success" href={"https://wa.me/" + publicacion.telefono}>
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <button
                      className="custom-button fw-bold btn btn-outline-danger btn-sm"
                      style={{ fontSize: '0.75rem' }}
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

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body d-flex d-flex justify-content-between">
                <p className='d-flex justify-content-center'>{modalMessage}</p>
                <button type="button" className="btn btn-primary " onClick={closeModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </React.Fragment>
  );
}
