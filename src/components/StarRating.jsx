import React, { useState } from 'react';

export function StarRating({ id_publicacion }) {
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);   
  
  const handleRating = (value) => {
    setRating(value);
    sendRating(value); 
  };

  const sendRating = (cantidad) => {
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/valoracion/${id_publicacion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cantidad: cantidad,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert('Valoración añadida correctamente');
      } else {
        alert('Error al añadir valoración: ' + data.error);
      }
    })
    .catch((error) => {
      console.error("Error al enviar la valoración:", error);
    });
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const value = index + 1;

        return (
          <button
            type="button"
            key={index}
            className={value <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleRating(value)}  
            onMouseEnter={() => setHover(value)} 
            onMouseLeave={() => setHover(0)}     
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '2rem', color: value <= (hover || rating) ? '#ffc107' : '#e4e5e9' }}>
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
