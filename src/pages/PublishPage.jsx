import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Calendar from 'react-calendar';
import Footer from "../components/Footer.jsx";
import WeatherComponent from "../components/Clima.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Loading from '../assets/loading.gif'

export function PublishPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [tituloPublicacion, setTitulo] = useState("");
  const [informacionPublicacion, setInformacion] = useState("");
  const [seccionPublicacion, setSeccion] = useState("");
  const [tiposPublicaciones, setTiposPublicaciones] = useState([]);
  const [value, onChange] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/tipos_publicaciones")
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched from backend:", data);
        setTiposPublicaciones(data);
        if (data.length > 0) {
          setSeccion(data[0].id_tipo_publicaciones);
        }
      })
      .catch(error => console.error("Error fetching tipos_publicaciones:", error));
  }, []);

  function titleChange(e) {
    setTitulo(e.target.value);
  }

  function informationChange(e) {
    setInformacion(e.target.value);
  }

  function sectionChange(e) {
    setSeccion(e.target.value);
  }

  function sendData(e) {
    e.preventDefault();
    const idUser = localStorage.getItem('id_usuario');
    setLoading(true);
    fetch(`https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/crear_publicacion/${idUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: tituloPublicacion,
        id_tipo_publicacion: seccionPublicacion,
        descripcion: informacionPublicacion,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! status: ${response.status}, details: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        navigate('/' + params.id);
      })
      .catch(error => {
        console.error("Ups algo salió mal 🙄", error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container navbar-spacing mt-5 pt-5 mb-5">
        <div className="row">
          <div className="col-md-8 rounded border border-warning">
            <div className="d-flex justify-content-center mt-5 pt-5 text-success-emphasis">
              <h1>Nueva publicación</h1>
            </div>
            <div className="border border-0 p-5 text-center">
              <div className="form-group">
                <label htmlFor="titulo" className="mb-4 fw-semibold text-success-emphasis">Título</label>
                <input
                  onChange={titleChange}
                  type="text"
                  className="custom-font form-control mb-4 border border-success border-opacity-50"
                  id="titulo"
                  placeholder="Ingresa el título"
                />
              </div>
              <div className="form-group">
                <label htmlFor="seccion" className="mb-4 fw-semibold text-success-emphasis">Sección</label>
                <select
                  onChange={sectionChange}
                  className="custom-font form-control mb-5 border border-success border-opacity-50"
                  id="seccion"
                  value={seccionPublicacion}
                >
                  {tiposPublicaciones.map(tipo => (
                    <option key={tipo.id_tipo_publicaciones} value={tipo.id_tipo_publicaciones}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                onChange={informationChange}
                className="custom-font form-control mb-4 border border-success border-opacity-50"
                placeholder="Descripción de la publicación"
                rows="7"
              ></textarea>
            </div>
            <div className="d-flex justify-content-center m-0">
              {loading ? <img src={Loading} alt="cargando" /> : <button className="custom-font btn btn-warning btn-outline-dark mb-5 fw-bold" onClick={sendData} disabled={loading}>
                <i className="bi bi-check-circle-fill me-2"></i>
                {loading ? "Publicando..." : "Publicar"}
              </button>}
            </div>

          </div>
          <div className="col-md-4">
            <div className="calendar-container w-75 pt-10 ms-5">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="w-100 ms-5">
              <WeatherComponent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}