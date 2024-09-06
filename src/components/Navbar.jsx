import React, { useState } from 'react';
import profileUser from '../assets/profile-user.png';
import tagIcon from '../assets/tag.png';
import bellIcon from '../assets/bell.png';
import post from '../assets/post.png';
import homeIcon from '../assets/home.png';
import powerIcon from '../assets/power.png';
import './../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de que react-bootstrap esté instalado
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  //const id_usuario = localStorage.getItem("id_usuario");


  function redirectProfile() {
    navigate('/profile/' + params.id);
  }

  function redirectFavorites() {
    navigate('/favorites/' + params.id);
  }

  function redirectNotification() {
    navigate('/notificaciones/' + params.id);
  }

  function redirectHome() {
    navigate('/home/' + params.id);
  }

  function handleLogout() {
    setShowLogoutModal(true);
  }

  function confirmLogout() {
    setShowLogoutModal(false);
    navigate('/login');
  }

  function redirectServices() {
    navigate('/services/' + params.id);
  }

  function redirectNotices() {
    navigate('/notices/' + params.id);
  }

  function redirectHealth() {
    navigate('/health/' + params.id);
  }

  function redirectEvents() {
    navigate('/events/' + params.id);
  }

  function redirectPublish() {
    navigate('/publish/' + params.id);
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio5"
              autoComplete="off"
              checked={selectedButton === 'home'}
              onChange={() => setSelectedButton('home')}
              onClick={redirectHome}
            />
            <label
              className={`btn ${selectedButton === 'home' ? 'btn-success' : 'btn-outline-success'}`}
              htmlFor="btnradio5"
            >
              <img width="20px" height="20px" src={homeIcon} alt="Home" />
            </label>

            {/* Resto de los botones */}
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              onClick={redirectProfile}
            />
            <label
              className={`btn ${selectedButton === 'profile' ? 'btn-success' : 'btn-outline-success'}`}
              htmlFor="btnradio1"
            >
              <img width="20px" height="20px" src={profileUser} alt="Profile" />
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              autoComplete="off"
              onClick={redirectFavorites}
            />
            <label
              className={`btn ${selectedButton === 'favorites' ? 'btn-success' : 'btn-outline-success'}`}
              htmlFor="btnradio3"
            >
              <img width="20px" height="20px" src={tagIcon} alt="Tag" />
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio4"
              autoComplete="off"
              onClick={redirectNotification}
            />
            <label
              className={`btn ${selectedButton === 'notification' ? 'btn-success' : 'btn-outline-success'}`}
              htmlFor="btnradio4"
            >
              <img width="20px" height="20px" src={bellIcon} alt="Notifications" />
            </label>

            {/* Botón con dropdown */}
            <div className="btn-group">
              <button
                type="button"
                className={`btn ${selectedButton === '/notices' || selectedButton === '/health' || selectedButton === '/services' || selectedButton === '/events' ? 'btn-success' : 'btn-outline-success'} dropdown-toggle`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img width="20px" height="20px" src={post} alt="Post" />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={redirectNotices}
                  >
                    Noticias
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={redirectHealth}
                  >
                    Salud
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={redirectServices}
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={redirectEvents}
                  >
                    Eventos
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-warning btn-outline-dark me-2"
              onClick={redirectPublish}
            >
              Publicar
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              <img width="20px" height="20px" src={powerIcon} alt="Logout" />
            </button>

          </div>
        </div>
      </nav>

      {/* Modal para cerrar sesión */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ha cerrado sesión correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmLogout}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
