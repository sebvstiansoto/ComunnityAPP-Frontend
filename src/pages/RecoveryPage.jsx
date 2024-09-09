import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export function RecoveryPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function sendData(e) {
        e.preventDefault();
        console.log('Enviando datos...', { email });

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/recuperar_contraseña', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error('Ups algo salió mal 🙄', error);
                alert("No se pudo enviar la solicitud. Por favor, intenta nuevamente.");
            });
    }

    return (
        <>
            <div className="container mt-0">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5 border border-success">
                            <div className="card-header text-center bg-warning">
                                <h3>Recuperar Contraseña</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={sendData} className="text-center">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control m-auto"
                                            id="email"
                                            placeholder="Introduce tu correo electrónico"
                                            required
                                            value={email}
                                            onChange={changeEmail}
                                            style={{ maxWidth: "300px" }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-warning btn-outline-dark mt-3"
                                    >
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>

        </>
    );
}
