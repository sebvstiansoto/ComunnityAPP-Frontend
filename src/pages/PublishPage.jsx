import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PublishPage() {
  const navigate = useNavigate();

  let [tituloPublicacion, setTitulo] = useState("");
  let [informacionPublicacion, setInformacion] = useState("");
  let [seccionPublicacion, setSeccion] = useState("");
  let [tiposPublicaciones, setTiposPublicaciones] = useState([]);

  // Fetch the types of publications from the backend
  useEffect(() => {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/tipos_publicaciones")
      .then((response) => response.json())
      .then((data) => {
        setTiposPublicaciones(data);
        if (data.length > 0) {
          setSeccion(data[0].id_tipo_publicaciones);  // Set the first option as the default selected value
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

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/crear_publicacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: tituloPublicacion,
        id_tipo_publicacion: seccionPublicacion,  // This now holds the ID of the selected type
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
    <div className="container navbar-spacing">
      <div className="row">
        <div className="col-md-6 bg-success-subtle rounded border border-warning">
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
          <div className="d-flex justify-content-center m-2">
            <button className="btn btn-warning btn-outline-dark" onClick={sendData}>Publicar</button>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
          <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
            <div className="card-header">Hora</div>
            <div className="card-body">
              <p className="card-text">Espacio para colocar la API de la hora.</p>
            </div>
          </div>

          <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
            <div className="card-header">Calendario</div>
            <div className="card-body">
              <p className="card-text">Espacio para colocar la API del calendario.</p>
            </div>
          </div>

          <div className="card text-bg-warning mb-3" style={{ width: "18rem" }}>
            <div className="card-header">Recordatorios</div>
            <div className="card-body">
              <p className="card-text">Espacio para colocar los recordatorios</p>
              <p className="card-text">Espacio para colocar los recordatorios</p>
              <p className="card-text">Espacio para colocar los recordatorios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
