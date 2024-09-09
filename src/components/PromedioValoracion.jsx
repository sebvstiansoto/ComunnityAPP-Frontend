import React, { useEffect, useState } from 'react';

function PromedioValoracion({ id_publicacion }) {
  const [data, setData] = useState(null); // Estado para almacenar todos los datos
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching datos for id_publicacion: ${id_publicacion}`);
    
    // Realiza la solicitud al backend para obtener todos los datos de la publicación
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/valoracion/promedio/${id_publicacion}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Verifica la respuesta en consola
        if (data.error) {
          setError(data.error);
        } else {
          setData(data); // Guardar todos los datos en el estado
        }
      })
      .catch((error) => {
        console.error("Error fetching datos:", error);
        setError('Error al obtener los datos de la publicación');
      });
  }, [id_publicacion]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Cargando datos...</p>;
  }

  // Desestructuramos los datos para usarlos en el JSX
  const {
    titulo,
    nombre_usuario,
    email,
    telefono,
    img_perfil,
    promedio_valoracion,
    total_valoraciones
  } = data;

  return (
    <div>
      <h2>{titulo}</h2>
      <p><strong>Usuario:</strong> {nombre_usuario}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {telefono}</p>
      {img_perfil && <img src={img_perfil} alt={`Perfil de ${nombre_usuario}`} style={{width: '100px', height: '100px'}} />}
      <h4>Promedio de Valoración: {promedio_valoracion !== null ? promedio_valoracion : 'No hay valoraciones'}</h4>
      <p>Total de valoraciones: {total_valoraciones}</p>
    </div>
  );
}

export default PromedioValoracion;
