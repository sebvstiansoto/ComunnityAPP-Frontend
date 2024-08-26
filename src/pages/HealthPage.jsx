import React, { useState } from 'react';

export function HealthPage() {



return (
    <main className="mt-5 pt-5">
      <div className="d-flex flex-column justify-content-start align-items-center gap-3">
        <div
          className="card m-auto d-flex justify-content-center"
          style="max-width: 500px"
        >
          <div className="card-body">
            <h5 className="card-title">Centro Médico Almendral</h5>
            <p className="card-text">
              Nuevo Centro Médico en el Almendral: El Centro de Salud Familiar
              Almendral inaugura modernas instalaciones con atención
              especializada en cardiología y pediatría. ¡Agende su cita hoy!
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
            <h5 className="card-title">Hospital Van Buren</h5>
            <p className="card-text">
              Ampliación en Hospital Van Buren: El Hospital Carlos Van Buren
              suma 20 nuevas camas UCI y refuerza su equipo de profesionales
              para mejorar la atención de pacientes críticos.
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
            <h5 className="card-title">Clínica Valparaíso</h5>
            <p className="card-text">
              Clínica Valparaíso Lanza Programa de Telemedicina: Clínica
              Valparaíso ahora ofrece consultas médicas online para todas sus
              especialidades. Atención segura y cómoda desde su hogar.
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