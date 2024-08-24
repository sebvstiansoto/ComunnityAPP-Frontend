import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; // Evita continuar si no hay token
    }

    // Fetch para obtener las publicaciones
    fetch("http://localhost:3000/obtener_publicaciones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar token en el encabezado si es necesario
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseConvert) => {
        if (Array.isArray(responseConvert)) {
          setPublicaciones(responseConvert);
        } else {
          setError("Datos de publicaciones no válidos.");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching data:", error);
      });
  }, [navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="mt-5 pt-5">
      <div className="d-flex flex-column justify-content-start align-items-center gap-3">
        <div
          className="card m-auto d-flex justify-content-center"
          style="max-width: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Teatro Municipal Viña del Mar</h5>
            <p className="card-text">
              Myriam Hernández se presentará el próximo 20/09 en nuestro teatro,
              quedan pocas entradas ¡Adquiérelas antes de que se acaben!
            </p>
            <div className="row">
              <div className="col-12">
                <p className="card-text mb-3">
                  <small className="text-body-secondary">Hace 1 min</small>
                </p>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/tag.png"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/star.png"
                    alt=""
                  />
                </button>

                {/*Modal botón de valoraciones*/}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Valoración del sitio
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          width="100px"
                          height="100px"
                          src="./Imágenes navbar/rating.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/chat (1).png"
                    alt=""
                  />
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-success">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/whatsapp (3).png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card m-auto justify-content-center"
          style="max-width: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Shows de Viña del Mar</h5>
            <p className="card-text">
              A partir del 15/09 comenzará la preventa de las entradas del
              Festival de Viña del Mar 2025, ¡por pertenecer a ComunidApp
              tendrás un 25%!
            </p>
            <div className="row">
              <div className="col-12">
                <p className="card-text mb-3">
                  <small className="text-body-secondary">Hace 5 min</small>
                </p>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/tag.png"
                    alt=""
                  />
                </button>

                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/star.png"
                    alt=""
                  />
                </button>
                {/*Modal botón de valoraciones*/}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Valoración del sitio
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          width="100px"
                          height="100px"
                          src="./Imágenes navbar/rating.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/chat (1).png"
                    alt=""
                  />
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-success">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/whatsapp (3).png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card m-auto justify-content-center"
          style="max-width: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Feria de la Ciudad</h5>
            <p className="card-text">
              Este fin de semana tendremos la Feria de la Ciudad para que puedas
              aprovechar de conocer todo lo se ofrece en la comuna y si quieres
              mostrar tus productos o servicios también podrás hacerlo ¡Aún
              estás a tiempo, escríbenos e inscríbete!
            </p>
            <div className="row">
              <div className="col-12">
                <p className="card-text mb-3">
                  <small className="text-body-secondary">Hace 55 min</small>
                </p>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/tag.png"
                    alt=""
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/star.png"
                    alt=""
                  />
                </button>
                {/*Modal botón de valoraciones*/}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Valoración del sitio
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <img
                          width="100px"
                          height="100px"
                          src="./Imágenes navbar/rating.png"
                          alt=""
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-success"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-outline-warning">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/chat (1).png"
                    alt=""
                  />
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-success">
                  <img
                    width="20px"
                    height="20px"
                    src="./Imágenes navbar/whatsapp (3).png"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
