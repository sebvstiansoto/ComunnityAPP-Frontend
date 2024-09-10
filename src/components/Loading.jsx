import React from 'react';
import '../styles/Loading.css'; // Asegúrate de incluir el CSS para la animación

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
}
