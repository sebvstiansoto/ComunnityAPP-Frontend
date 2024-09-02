import React, { useState } from 'react';
import profileUser from '../assets/profile-user.png';
import tagIcon from '../assets/tag.png';
import bellIcon from '../assets/bell.png';
import post from '../assets/post.png';
import homeIcon from '../assets/home.png';
import './../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState('');

  const navigate = useNavigate();

  function redirectProfile() {
    let id_usuario = localStorage.getItem("id_usuario");
    navigate('/profile/' + id_usuario);
    setSelectedButton('profile');
  }

  function redirectFavorites() {
    navigate('/favorites');
    setSelectedButton('favorites');
  }

  function redirectNotification() {
    navigate('/notificaciones');
    setSelectedButton('notification');
  }

  function redirectSection(section) {
    navigate(section);
    setSelectedButton(section);
  }

  function redirectHome() {
    navigate('/');
    setSelectedButton('home');
  }

  return (
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

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={selectedButton === 'profile'}
            onChange={() => setSelectedButton('profile')}
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
            checked={selectedButton === 'favorites'}
            onChange={() => setSelectedButton('favorites')}
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
            checked={selectedButton === 'notification'}
            onChange={() => setSelectedButton('notification')}
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
                  onClick={() => redirectSection('/notices')}
                >
                  Noticias
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => redirectSection('/health')}
                >
                  Salud
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => redirectSection('/services')}
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => redirectSection('/events')}
                >
                  Eventos
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column">
          <button
            className="btn btn-warning btn-outline-dark"
            onClick={() => redirectSection('/publish')}
          >
            Publicar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
