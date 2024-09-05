import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Footer from "../components/Footer.jsx";
import { useParams } from 'react-router-dom';


export function PublishPage() {

  const params = useParams();
  const navigate = useNavigate();

  let [tituloPublicacion, setTitulo] = useState("");
  let [informacionPublicacion, setInformacion] = useState("");
  let [seccionPublicacion, setSeccion] = useState("");
  let [tiposPublicaciones, setTiposPublicaciones] = useState([]);
  const [value, onChange] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/tipos_publicaciones/"  + params.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched from backend:", data);
        setTiposPublicaciones(data);
        if (data.length > 0) {
          setSeccion(data[0].id_tipo_publicaciones);
        }
      })
      .catch((error) => console.error("Error fetching tipos_publicaciones:", error));
  }, []);

  function tittleChange(e) {
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
    const idUser = localStorage.getItem('id_usuario')
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/crear_publicacion/" + idUser, {
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
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP error! status: ${response.status}, details: ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
      });
  }

  return (
    <>
      <div className="p-0">
        <Navbar />
      </div>
      <div className="container navbar-spacing mt-5 pt-5 mb-5">
        <div className="row">
          <div className="col-md-8 bg-success-subtle rounded border border-warning">
            <div className="d-flex justify-content-center mt-5 text-success-emphasis">
              <h3>Nueva publicación</h3>
            </div>
            <div className="border p-5 text-center">
              <div className="form-group">
                <label htmlFor="titulo" className="fw-semibold text-success-emphasis">Título</label>
                <input onChange={tittleChange} type="text" className="form-control mb-3 border border-success" id="titulo" placeholder="Ingresa el título" />
              </div>
              <div className="form-group">
                <label htmlFor="seccion" className="fw-semibold text-success-emphasis">Sección</label>
                <select onChange={sectionChange} className="form-control mb-3 border border-success" id="seccion" value={seccionPublicacion}>
                  {tiposPublicaciones.map((tipo) => (
                    <option key={tipo.id_tipo_publicaciones} value={tipo.id_tipo_publicaciones}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <textarea onChange={informationChange} className="form-control mb-3 border border-success" placeholder="Descripción de la publicación" rows="4"></textarea>
            </div>
            <div className="d-flex justify-content-center m-0">
              <button className="btn btn-warning btn-outline-dark mb-5" onClick={sendData}>Publicar</button>
            </div>
          </div>
          <div
            className="col-md-4 position-fixed"
            style={{
              right: '5%',
              top: '20%'
            }}
          >
            <div
              className="calendar-container m-5"
              style={{
                transform: 'scale(0.7)',
                transformOrigin: 'top right',
                maxWidth: '300px'
              }}
            >
              <Calendar onChange={onChange} value={value} />
            </div>

            <div
              className="clock-container m-5"
              style={{ transform: 'scale(0.8)', transformOrigin: 'top right' }}
            >
              <h4>Hora Actual:</h4>
              <Clock value={currentTime} />
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        <Footer />
      </div>
    </>
  );
}
