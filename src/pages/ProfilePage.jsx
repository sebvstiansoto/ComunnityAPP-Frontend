import React, { useState, useEffect } from "react";
import "/src/styles/ProfilePage.css";

export function ProfilePage() {
  // Obtener datos desde localStorage
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [profileImage, setProfileImage] = useState("");  
  const [biografia, setBiografia] = useState("");

  useEffect(() => {
    // Aquí se podrían cargar datos adicionales desde la API
    fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.profileImage) setProfileImage(data.profileImage); // Actualizar imagen de perfil
      if (data.biografia) setBiografia(data.biografia);           // Actualizar biografía
    })
    .catch(error => console.error('Error fetching profile data:', error));
  }, []); // [] asegura que este efecto solo se ejecute una vez cuando el componente se monte

  const handleProfileImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    // Aquí puedes manejar el envío de la nueva imagen al backend
  };

  const handleSaveProfile = () => {
    // Aquí enviarías los datos actualizados del perfil al backend
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        username,
        biografia,
        // La imagen de perfil se enviaría aquí, posiblemente como un archivo separado
      }),
    })
    .then(response => response.json())
    .then(data => {
      alert("Perfil actualizado correctamente");
      // Actualizar localStorage si es necesario
      localStorage.setItem("username", username);
    })
    .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <>
      <div className="banner"></div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center profile-container">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile Picture"
              className="profile-image"
            />
            <h2>{username}</h2>
            <p>{email}</p>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Biografía</h2>
              <button
                className="btn btn-warning btn-outline-dark"
                data-toggle="modal"
                data-target="#editProfileModal"
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
                onChange={(e) => setBiografia(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        role="dialog"
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
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group text-center">
                  <label htmlFor="profilePic" className="d-block">
                    Actualizar Foto de Perfil
                  </label>
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile Picture"
                    className="profile-image mb-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input
                    type="file"
                    className="form-control-file"
                    id="profilePic"
                    onChange={handleProfileImageChange}
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
                    onChange={(e) => setBiografia(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button 
                type="button" 
                className="btn-warning btn-outline-dark"
                onClick={handleSaveProfile}
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
