import React, { useState } from 'react';
import profileUser from '../assets/profile-user.png';
import chatIcon from '../assets/chat.png';
import tagIcon from '../assets/tag.png';
import bellIcon from '../assets/bell.png';
import './../styles/Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [selectedRadio, setSelectedRadio] = useState('btnradio1');
  const navigate = useNavigate();

  function redirectProfile(){
    let id_usuario = localStorage.getItem("id_usuario");
    navigate('/profile/' + id_usuario);
  }

  function redirectFavorites(){
    navigate('/favorites');
  }

  function redirectNotification(){
    navigate('/notificaciones');
  }



  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={selectedRadio === 'btnradio1'}
            onChange={() => setSelectedRadio('btnradio1')}
            onClick={redirectProfile}
          />
          <label className="btn btn-outline-primary btn btn-outline-success" htmlFor="btnradio1">
            <img width="20px" height="20px" src={profileUser} alt="Profile" />
          </label>

          

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            autoComplete="off"
            checked={selectedRadio === 'btnradio3'}
            onChange={() => setSelectedRadio('btnradio3')}
            onClick={redirectFavorites}
          />
          <label className="btn btn-outline-primary btn btn-outline-success" htmlFor="btnradio3">
            <img width="20px" height="20px" src={tagIcon} alt="Tag" />
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            autoComplete="off"
            checked={selectedRadio === 'btnradio4'}
            onChange={() => setSelectedRadio('btnradio4')}
            onClick={redirectNotification}
          />
          <label className="btn btn-outline-primary btn btn-outline-success" htmlFor="btnradio4">
            <img width="20px" height="20px" src={bellIcon} alt="Notifications" />
          </label>
        </div>

        <div className="d-flex flex-column">
          <a className="btn btn-warning btn-outline-dark" href="#">
            Publicar
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              ComunidApp
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Noticias
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Publicaciones
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Salud
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Eventos
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Servicios
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

