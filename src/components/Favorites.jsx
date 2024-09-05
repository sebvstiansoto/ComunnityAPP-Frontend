import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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

      <div className="favorites-page">
        <h1>Favoritos</h1>

      </div>
      <Footer />
    </React.Fragment>
  );
}