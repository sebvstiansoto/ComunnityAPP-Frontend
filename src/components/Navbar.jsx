import React, { useState } from 'react';
import profileUser from '../assets/profile-user.png';
import tagIcon from '../assets/tag.png';
import bellIcon from '../assets/bell.png';
import post from '../assets/post.png';
import homeIcon from '../assets/home.png';
import powerIcon from '../assets/power.png';
import './../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Notificaciones from './Notificaciones';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false); // Estado para controlar el modal de notificaciones

  const navigate = useNavigate();
  const params = useParams();

  function redirectProfile() {
    navigate('/profile/' + params.id);
  }

  function redirectFavorites() {
    navigate('/favorites/' + params.id);
  }

  /*function handleNotifications() {
    setShowNotificationModal(true);
  } */

  function redirectHome() {
    navigate('/' + params.id);
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
      <nav id="navbar" className="navbar bg-body-tertiary fixed-top rounded-3" style={{}}>
        <div className="container-fluid">
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio5"
              autoComplete="off"
              checked={selectedButton === 'home'}
              onClick={redirectHome}
            />
            <label
              className="btn"
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
              className="btn"
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
              className="btn"
              htmlFor="btnradio3"
            >
              <img width="20px" height="20px" src={tagIcon} alt="Tag" />
            </label>

            {/* Botón con dropdown */}
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img width="20px" height="20px" src={post} alt="Post" />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="custom-font dropdown-item"
                    onClick={redirectNotices}
                  >
                    Noticias
                  </button>
                </li>
                <li>
                  <button
                    className="custom-font dropdown-item"
                    onClick={redirectHealth}
                  >
                    Salud
                  </button>
                </li>
                <li>
                  <button
                    className="custom-font dropdown-item"
                    onClick={redirectServices}
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    className="custom-font dropdown-item"
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
              className="custom-font fs-6 fw-medium btn btn-warning btn-outline-dark me-2"
              onClick={redirectPublish}
              style={{
                fontSize: "0.8rem"
              }}
            >
              Publicar
            </button>

            <button className="btn btn-danger border border-secondary" onClick={handleLogout}>
              <img width="15px" height="15px" src={powerIcon} alt="Logout" />
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

      {/* Modal para notificaciones */}
      <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {/* Aquí puedes mapear las notificaciones si las tienes como un array */}
            <Notificaciones />
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
