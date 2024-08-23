import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el token está presente en localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return; // Evita continuar si no hay token
        }

        // Fetch para obtener las publicaciones
        fetch('http://localhost:3000/obtener_publicaciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar token en el encabezado si es necesario
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseConvert) => {
            if (Array.isArray(responseConvert)) {
                setPublicaciones(responseConvert);
            } else {
                setError('Datos de publicaciones no válidos.');
            }
        })
        .catch((error) => {
            setError(error.message);
            console.error('Error fetching data:', error);
        });
    }, [navigate]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main class="mt-5 pt-5">
        <div
          class="d-flex flex-column justify-content-start align-items-center gap-3"
        >
          <div
            class="card m-auto d-flex justify-content-center"
            style="max-width: 500px"
          >
            <div class="card-body">
              <h5 class="card-title">Teatro Municipal Viña del Mar</h5>
              <p class="card-text">
                Myriam Hernández se presentará el próximo 20/09 en nuestro teatro, quedan pocas entradas ¡Adquiérelas antes de que se acaben!
              </p>
              <div class="row">
                <div class="col-12">
                  <p class="card-text mb-3">
                    <small class="text-body-secondary">Hace 1 min</small>
                  </p>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/tag.png"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
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
  
                  <!--Modal botón de valoraciones-->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Valoración del sitio
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <img
                            width="100px"
                            height="100px"
                            src="./Imágenes navbar/rating.png"
                            alt=""
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button type="button" class="btn btn-outline-warning">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/chat (1).png"
                      alt=""
                    />
                  </button>
                </div>
                <div class="col-6 d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-success">
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
            class="card m-auto justify-content-center"
            style="max-width: 500px"
          >
            <div class="card-body">
              <h5 class="card-title">Shows de Viña del Mar</h5>
              <p class="card-text">
                A partir del 15/09 comenzará la preventa de las entradas del Festival de Viña del Mar 2025, ¡por pertenecer a ComunidApp tendrás un 25%! 
              </p>
              <div class="row">
                <div class="col-12">
                  <p class="card-text mb-3">
                    <small class="text-body-secondary">Hace 5 min</small>
                  </p>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/tag.png"
                      alt=""
                    />
                  </button>
  
                  <button
                    type="button"
                    class="btn btn-outline-warning"
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
                  <!--Modal botón de valoraciones-->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Valoración del sitio
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <img
                            width="100px"
                            height="100px"
                            src="./Imágenes navbar/rating.png"
                            alt=""
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button type="button" class="btn btn-outline-warning">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/chat (1).png"
                      alt=""
                    />
                  </button>
                </div>
                <div class="col-6 d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-success">
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
            class="card m-auto justify-content-center"
            style="max-width: 500px"
          >
            <div class="card-body">
              <h5 class="card-title">Feria de la Ciudad</h5>
              <p class="card-text">
                Este fin de semana tendremos la Feria de la Ciudad para que puedas aprovechar de conocer todo lo se ofrece en la comuna y si quieres mostrar tus productos o servicios también podrás hacerlo ¡Aún estás a tiempo, escríbenos e inscríbete!
              </p>
              <div class="row">
                <div class="col-12">
                  <p class="card-text mb-3">
                    <small class="text-body-secondary">Hace 55 min</small>
                  </p>
                </div>
                <div class="col-6">
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/tag.png"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-warning"
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
                  <!--Modal botón de valoraciones-->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Valoración del sitio
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <img
                            width="100px"
                            height="100px"
                            src="./Imágenes navbar/rating.png"
                            alt=""
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                          <button type="button" class="btn btn-outline-warning">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-outline-warning">
                    <img
                      width="20px"
                      height="20px"
                      src="./Imágenes navbar/chat (1).png"
                      alt=""
                    />
                  </button>
                </div>
                <div class="col-6 d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-success">
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

</div>
    );
}
