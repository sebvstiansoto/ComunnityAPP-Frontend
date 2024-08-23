import React from "react";
import "./ProfilePage.css";

export function ProfilePage() {
  return (
    <>
      <div className="banner"></div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center profile-container">
            <img
              src="https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
              alt="Profile Picture"
              className="profile-image"
            />
            <h2>UserName</h2>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Biografía</h2>
              {/* Botón para abrir el modal */}
              <button
                className="btn btn-warning btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                Editar Perfil
              </button>
            </div>
            <div className="mt-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Información adicional..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">
                Editar Perfil
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body bg-success-subtle">
              <form>
                <div className="form-group text-center">
                  <label htmlFor="profilePic" className="d-block">
                    Actualizar Foto de Perfil
                  </label>
                  <img
                    src="https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
                    alt="Profile Picture"
                    className="profile-image mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input
                    type="file"
                    className="form-control-file"
                    id="profilePic"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Biografía</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows="3"
                    placeholder="Biografía"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-warning btn-outline-dark">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}