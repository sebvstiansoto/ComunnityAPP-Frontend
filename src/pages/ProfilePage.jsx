import React from "react";
import "./ProfilePage.css";

export function ProfilePage() {
  return (
    <>
      <div class="banner"></div>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-3 text-center profile-container">
            <img
              src="https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
              alt="Profile Picture"
              class="profile-image"
            />
            <h2>UserName</h2>
          </div>
          <div class="col-md-9">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Biografía</h2>
              <button
                class="btn btn-warning btn-outline-dark"
                data-toggle="modal"
                data-target="#editProfileModal"
              >
                Editar Perfil
              </button>
            </div>
            <div class="mt-3">
              <textarea
                class="form-control"
                rows="5"
                placeholder="Información adicional..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="editProfileModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editProfileModalLabel">
                Editar Perfil
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group text-center">
                  <label for="profilePic" class="d-block">
                    Actualizar Foto de Perfil
                  </label>
                  <img
                    src="https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
                    alt="Profile Picture"
                    class="profile-image mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input
                    type="file"
                    class="form-control-file"
                    id="profilePic"
                  />
                </div>
                <div class="form-group">
                  <label for="bio">Biografía</label>
                  <textarea
                    class="form-control"
                    id="bio"
                    rows="3"
                    placeholder="Biografía"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="button" class="btn-warning btn-outline-dark">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
