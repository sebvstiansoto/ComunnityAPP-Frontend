import React from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate

export function NavBar() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate(); // Usa useNavigate para la navegación

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // Redirige al usuario a la página de login
        navigate('/login'); // Redirige a /login usando navigate
    };

    return (
        <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
      
          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
              <label class="btn btn-outline-primary btn btn-outline-success" for="btnradio1">
                  <img
                  style {{width: "20px", height: "20px"}}
                  src="./Imágenes navbar/profile-user.png"
                  alt=""/>
              </label>
              
            
              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
              <label class="btn btn-outline-primary btn btn-outline-success" for="btnradio2">
                  <img
                  style {{width: "20px", height: "20px"}}
                  src="./Imágenes navbar/chat (1).png"
                  alt=""/>
  
              </label>
            
              <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
              <label class="btn btn-outline-primary btn btn-outline-success" for="btnradio3">
                  <img
                  style {{width: "20px", height: "20px"}}
                  src="./Imágenes navbar/tag.png"
                  alt=""/>
              </label>
  
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
              <label class="btn btn-outline-primary btn btn-outline-success" for="btnradio1">
                  <img
                  style {{width: "20px", height: "20px"}}
                  src="./Imágenes navbar/bell.png"
                  alt=""/>
              </label>
  
            </div>
      
            <div class="d-flex flex-column">
          <a class="btn btn-warning btn-outline-dark " href="#">
              Publicar 
          </a>
          </div>
  
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                ComunidApp
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Noticias</a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Publicaciones
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Salud</a></li>
                    <li><a class="dropdown-item" href="#">Eventos</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Servicios</a>
                    </li>
                  </ul>
                </li>
              </ul>
          
              </form>
            </div>
          </div>
        </div>
      </nav>
        );
                       }
