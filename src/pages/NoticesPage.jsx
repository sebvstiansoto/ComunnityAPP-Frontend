import React, { useState } from 'react';


export function Component () { 
return (
    <main className="mt-5 pt-5">
      <div className="d-flex flex-column justify-content-start align-items-center gap-3">
        <div
          className="card m-auto d-flex justify-content-center"
          style="maxWidth: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Pattynouel</h5>
            <p className="card-text">
              ¡Alerta! Se cayó un árbol en la entrada de la Av. Valparaiso 500 y
              no hay paso, tomen sus precauciones.
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
          style="maxWidth: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Camipizarro</h5>
            <p className="card-text">
              Me encuentro en la búsqueda de mi gatito, es negro, ojos verdes y
              la última vez que lo vi fue en la costa. Se llama Salem, si lo ven
              por favor contáctenme +56 9 4562 1256.
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
          style="maxWidth: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Sebasoto</h5>
            <p className="card-text">
              El día de ayer Chile se enfrentó contra la selección Albiceleste,
              obteniendo un resultado favorable para nuestros país quedando 1-0
              ¡Vamos Chile!
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