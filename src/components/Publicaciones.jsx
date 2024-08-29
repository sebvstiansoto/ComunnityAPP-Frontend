import React, { useState, useEffect } from "react";

export function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la solicitud al backend para obtener las publicaciones
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicaciones")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPublicaciones(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar las publicaciones: {error}</div>;
  }

  return (
    <div className="row">
      {publicaciones.map((publicacion) => (
        <div key={publicacion.id_publicacion} className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{publicacion.titulo}</h5>
              <p className="card-text">{publicacion.descripcion}</p>
              <p className="card-text">
                <small className="text-muted">Publicado en: {publicacion.hora_publicado}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Tipo: {publicacion.nombre_tipo_publicacion}</small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


