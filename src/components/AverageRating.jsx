import React, { useState, useEffect } from 'react';

export function AverageRating({ id_publicacion }) {
  const [promedio, setPromedio] = useState(null); // Guardará el promedio de la valoración
  const [loading, setLoading] = useState(true);   // Para mostrar un indicador de carga
  const [error, setError] = useState(null);       // Guardará los errores, si los hay

  useEffect(() => {
    // Hacer la solicitud GET para obtener el promedio
    const fetchPromedio = async () => {
      try {
        const response = await fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/valoracion/promedio/${id_publicacion}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el promedio de valoraciones');
        }
        
        const data = await response.json();
        setPromedio(data.promedio); // Actualizar el promedio con el valor del servidor
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Dejar de mostrar el indicador de carga
      }
    };

    fetchPromedio();
  }, [id_publicacion]);

  if (loading) {
    return <p>Cargando promedio de valoraciones...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3>Promedio de valoraciones:</h3>
      <p>{promedio ? promedio.toFixed(1) : 'Sin valoraciones'}</p>
    </div>
  );
}
