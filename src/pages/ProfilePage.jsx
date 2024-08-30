import React, { useState } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [biografia, setBiografia] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [banner, setBanner] = useState(null);
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  function changeBiografia(e) {
    setBiografia(e.target.value);
  }

  function changeFotoPerfil(e) {
    const file = e.target.files[0];
    setFotoPerfil(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFotoPerfilPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function changeBanner(e) {
    const file = e.target.files[0];
    setBanner(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function sendData(e) {
    e.preventDefault();
    console.log({ biografia, fotoPerfil, banner });
    console.log("Todo preparado para enviar a mi backend 😀");

    const formData = new FormData();
    formData.append("biografia", biografia);
    if (fotoPerfil) {
      formData.append("fotoPerfil", fotoPerfil);
    }
    if (banner) {
      formData.append("banner", banner);
    }

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, details: ${text}`
            );
          });
        }
        return response.json();
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
      });

    const modalElement = document.getElementById("editProfileModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  return (
    <>
      <div className="m-5">
        <Navbar />
      </div>
      <div className="banner"></div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center profile-container">
            <img
              src={fotoPerfilPreview || "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"}
              alt="Profile Picture"
              className="profile-image"
            />
            <h2>{username}</h2>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Biografía</h2>
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
                value={biografia}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
      </div>

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
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-success-subtle">
              <form>
                <div className="form-group text-center">
                  <label htmlFor="profilePic" className="d-block">
                    Actualizar Foto de Perfil
                  </label>
                  <img
                    src={fotoPerfilPreview || "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"}
                    alt="Profile Picture"
                    className="profile-image mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input
                    type="file"
                    className="form-control-file"
                    id="profilePic"
                    onChange={changeFotoPerfil}
                  />
                </div>
                <div className="form-group text-center">
                  <label htmlFor="bannerPic" className="d-block fw-bold">
                    Actualizar Banner
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="bannerPic"
                    onChange={changeBanner}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Biografía</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    rows="3"
                    placeholder="Biografía"
                    value={biografia}
                    onChange={changeBiografia}
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
              <button
                type="button"
                className="btn btn-warning btn-outline-dark"
                onClick={sendData}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
