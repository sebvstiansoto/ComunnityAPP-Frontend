import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams(); // Se captura el id del usuario /profile/:id

  const [username, setUsername] = useState("");
  const [biografia, setBiografia] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [banner, setBanner] = useState("");
  const [email, setEmail] = useState("");
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState("");
  const [fotoPerfilPreviewFile, setFotoPerfilPreviewFile] = useState(null);
  const [bannerPreviewFile, setBannerPreviewFile] = useState(null);

  const [originalBiografia, setOriginalBiografia] = useState("");
  const [originalFotoPerfil, setOriginalFotoPerfil] = useState("");
  const [originalBanner, setOriginalBanner] = useState("");

  function getUserInfo() {
    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/" + params.id)
      .then(response => {
        return response.json();
      })
      .then(responseConverted => {
        setUsername(responseConverted.nombre_usuario);
        setEmail(responseConverted.email);
        setFotoPerfil(responseConverted.img_perfil);
        setBanner(responseConverted.banner);
        setBiografia(responseConverted.biografia);
        setFotoPerfilPreview(responseConverted.img_perfil);
        setOriginalBiografia(responseConverted.biografia);
        setOriginalFotoPerfil(responseConverted.img_perfil);
        setOriginalBanner(responseConverted.banner);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function changeBiografia(e) {
    setBiografia(e.target.value);
  }

  function changeFotoPerfil(e) {
    const file = e.target.files[0];
    setFotoPerfilPreviewFile(file);
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
    setBannerPreviewFile(file);
  }

  function sendData(e) {
    e.preventDefault();
    console.log({ biografia, fotoPerfil, banner });
    console.log("Todo preparado para enviar a mi backend 😀");

    const formData = new FormData();
    formData.append("biografia", biografia);
    formData.append("banner", bannerPreviewFile);
    formData.append("img_perfil", fotoPerfilPreviewFile);

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/" + params.id, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseConverted) => {
        console.log(responseConverted);
        getUserInfo();
        const modalElement = document.getElementById("editProfileModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
      });
  }

  function closeModalWithoutSaving() {
    // Reset to original values
    setBiografia(originalBiografia);
    setFotoPerfilPreview(originalFotoPerfil);
    setBanner(originalBanner);
    setFotoPerfilPreviewFile(null);
    setBannerPreviewFile(null);
    const modalElement = document.getElementById("editProfileModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  return (
    <>
      <div className="m-5">
        <Navbar />
      </div>
      <div className="banner">
        <img
          width={"100%"}
          height={"100%"}
          src={banner || "https://img.freepik.com/vector-premium/banner-ciudad-ecologica-verde_174191-51.jpg"} alt="" />
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center profile-container">
            <img
              src={fotoPerfil || "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"}
              alt="Profile Picture"
              className="profile-image"
            />
            <h2>{username}</h2>
            <h5>{email}</h5>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-success fw-bold">Biografía</h2>
              <button
                className="btn btn-warning btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                Editar Perfil
              </button>
            </div>
            <div className="mt-3">
              <p className="border border-0">
                {biografia || "Cuentanos sobre ti..."}
              </p>
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
              <h5 className="modal-title text-success" id="editProfileModalLabel">
                Editar Perfil
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModalWithoutSaving}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-success-subtle">
              <form>
                <div className="form-group text-center m-2">
                  <label htmlFor="profilePic" className="d-block fw-bold">
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
                <div className="form-group text-center m-2">
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
                  <label htmlFor="bio" className="d-block fw-bold m-2">Biografía</label>
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
                onClick={closeModalWithoutSaving}
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
      <div className="App">
        {/* Otros componentes y contenido */}
        <Footer />
      </div>
    </>
  );
}
