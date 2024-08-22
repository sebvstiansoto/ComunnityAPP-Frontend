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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Comunidapp</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Inicio</a>
                    </li>
                    {username ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">👤 {username}</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={logout}>Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Iniciar Sesión</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
