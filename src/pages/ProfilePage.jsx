import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PublicacionPage } from "../components/PublicacionPage.jsx";
import Loading from '../assets/loading.gif'

export function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);

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
    fetch(
      "https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/" +
      params.id
    )
      .then((response) => {
        return response.json();
      })
      .then((responseConverted) => {
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
      .catch((error) => {
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
    console.log("Todo preparado para enviar a mi backend 😀");

    const formData = new FormData();

    // Solo agregamos los campos que han sido modificados
    if (biografia !== originalBiografia) {
      formData.append("biografia", biografia);
    }

    if (fotoPerfilPreviewFile) {
      formData.append("img_perfil", fotoPerfilPreviewFile);
    }

    if (bannerPreviewFile) {
      formData.append("banner", bannerPreviewFile);
    }

    // Si no hay cambios, no hacemos la petición
    if (!formData.has("biografia") && !formData.has("img_perfil") && !formData.has("banner")) {
      console.log("No hay cambios que guardar");
      return;
    }
    setLoading(true);

    fetch(
      "https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/usuario/" +
      params.id,
      {
        method: "PATCH",
        body: formData,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseConverted) => {
        console.log(responseConverted);
        getUserInfo();
        const modalElement = document.getElementById("editProfileModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
      });
  }

  function closeModalWithoutSaving() {
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
      <div className="mt-5">
        <Navbar />
      </div>
      <div className="banner">
        <img
          src={
            banner ||
            "https://img.freepik.com/vector-premium/banner-ciudad-ecologica-verde_174191-51.jpg"
          }
          alt=""
          className="banner-image"
        />
      </div>

      <div className="container d-flex flex-column flex-md-row justify-content-between">
  <div className="d-flex flex-column flex-md-row justify-content-between w-100">
    
    <div className="d-flex flex-column align-items-center profile-container w-100 w-md-50 mb-3">
      <img
        src={
          fotoPerfil ||
          "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
        }
        alt="Profile Picture"
        className="profile-image border border-secondary mb-3"
      />
      <div className="">
        {params.id == localStorage.getItem("id_usuario") ? (
          <button
            className="custom-font btn btn-warning btn-outline-dark fw-bold mb-3"
            data-bs-toggle="modal"
            data-bs-target="#editProfileModal"
          >
            <i className="bi bi-gear-fill me-1"></i>
            Editar Perfil
          </button>
        ) : (
          ""
        )}
      </div>
      <h2 className="mb-0">
        @<i>{username}</i>
      </h2>
      <h2 className="text-success-emphasis fw-bold mb-3 mt-2">Biografía</h2>
      <p className="bio-paragraph border border-0">
        {biografia || "Cuentanos sobre ti..."}
      </p>
      <h5>{email}</h5>
    </div>

    <div className="col-12 col-md-8 d-flex w-75 w-md-50 ">
      <PublicacionPage />
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
              <h5
                className="custom-font fw-bold modal-title text-success-emphasis"
                id="editProfileModalLabel"
              >
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
                    src={
                      fotoPerfilPreview ||
                      "https://diariocronica1.cdn.net.ar/252/storage252/images/94/29/942948_2fd5ca2e1820ae983b013514ccdd6c63a6a2e01a63890864e8eecbd5b63cd368/lg.webp"
                    }
                    alt="Profile Picture"
                    className="profile-image mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input
                    type="file"
                    className="custom-font form-control-file"
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
                    className="custom-font form-control-file"
                    id="bannerPic"
                    onChange={changeBanner}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio" className="d-block fw-bold m-2">
                    Biografía
                  </label>
                  <textarea
                    className="custom-font form-control"
                    id="bio"
                    rows="3"
                    placeholder="Redacta tu biografia..."
                    value={biografia}
                    onChange={changeBiografia}
                    style={{
                      resize: "none",
                      overflow: "hidden",
                      height: "auto",
                      maxHeight: "150px",
                      overflowY: "auto",
                      paddingRight: "10px",
                    }}
                  ></textarea>
                  <p></p>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {loading ? <img src={Loading} alt="cargando" /> : <button type="button" className="custom-font btn btn-warning btn-outline-dark fw-bold" onClick={sendData} disabled={loading}
              ><i class="bi bi-check-circle-fill me-1"></i>
                {loading ? "Guardando Cambios..." : "Guardar Cambioss"}
              </button>}
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
