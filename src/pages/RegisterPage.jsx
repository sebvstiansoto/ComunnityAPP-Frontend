import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export function RegisterPage() {
    let [nombre_usuario, setUsername] = useState("");
    let [contraseña, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [telefono, setPhone] = useState("");
    let [identificacion, setIdentification] = useState("");
    let [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    function changeUsername(e) {
        setUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePhone(e) {
        setPhone(e.target.value);
    }

    function changeIdentification(e) {
        setIdentification(e.target.value);
    }

    function handleCheckboxChange(e) {
        setIsChecked(e.target.checked);
    }

    function sendData(e) {
        e.preventDefault();
        if (!isChecked) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }
        console.log({ nombre_usuario, contraseña, email, telefono, identificacion });
        console.log("Todo preparado para enviar a mi backend 😀");

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: nombre_usuario,
                contraseña: contraseña,
                email: email,
                telefono: telefono,
                identificacion: identificacion
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
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center m-3 p-3 text-success-emphasis">
                <h1 className="text-success-emphasis fw-bold">Regístrate en Comunidapp</h1>
            </div>
            <div className="d-flex justify-content-center  m-3 p-3">
                <form className="row g-3" onSubmit={sendData}>
                    <div className="col-6">
                        <label htmlFor="validationDefault02" className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control border-2 border-success-subtle"
                            id="validationDefault02"
                            placeholder="usuario@gmail.com"
                            required
                            value={email}
                            onChange={changeEmail}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="validationDefaultUsername" className="form-label fw-semibold">Username</label>
                        <div className="input-group">
                            <span className="input-group-text bg-warning bg-gradient border-2 border-success-subtle" id="inputGroupPrepend2">@</span>
                            <input
                                type="text"
                                className="form-control border-2 border-success-subtle"
                                id="validationDefaultUsername"
                                placeholder="Nombre de usuario"
                                required
                                value={nombre_usuario}
                                onChange={changeUsername}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <label htmlFor="validationDefaultPassword" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control border-2 border-success-subtle"
                            id="validationDefaultPassword"
                            placeholder="Contraseña"
                            required
                            value={contraseña}
                            onChange={changePassword}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="validationDefaultDocument" className="form-label fw-semibold">Número de documento</label>
                        <input
                            type="text"
                            className="form-control border-2 border-success-subtle"
                            id="validationDefaultDocument"
                            placeholder="00000000-0"
                            required
                            value={identificacion}
                            onChange={changeIdentification}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="validationDefaultPhone" className="form-label fw-semibold">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control border-2 border-success-subtle"
                            id="validationDefaultPhone"
                            placeholder="Número de teléfono"
                            required
                            value={telefono}
                            onChange={changePhone}
                        />
                    </div>
                    <div className="col-6 mt-5 d-flex align-items-center">
                        <div className="form-check">
                            <input
                                className="border border-success form-check-input"
                                type="checkbox"
                                id="invalidCheck2"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                required
                            />
                            <label className="form-check-label ms-2" htmlFor="invalidCheck2">
                                Acepto los <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">términos y condiciones</a>
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn btn-warning btn-outline-dark fw-bold" type="submit">Enviar formulario</button>
                    </div>
                </form>
            </div>
            {/* Modal */}
            <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="privacyModalLabel">Políticas de Privacidad</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Términos y Condiciones</h5>

                            <h6>1. Aceptación de Términos</h6>
                            <p>Al registrarte en Comunidapp, aceptas los términos y condiciones descritos en este documento. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices nuestro servicio.</p>

                            <h6>2. Información Personal</h6>
                            <p>En Comunidapp, recopilamos y almacenamos tu información personal, que incluye, entre otros, tu nombre, correo electrónico y número de teléfono. Esta información es necesaria para el funcionamiento del servicio y para proporcionarte una experiencia personalizada.</p>

                            <h6>3. Uso de la Información</h6>
                            <p>Tu información personal puede ser utilizada para los siguientes propósitos:</p>
                            <ul>
                                <li>Proporcionar y mantener nuestro servicio.</li>
                                <li>Notificarte sobre cambios en nuestro servicio.</li>
                                <li>Proporcionar soporte al cliente.</li>
                                <li>Recopilar análisis o información valiosa para mejorar nuestro servicio.</li>
                            </ul>

                            <h6>4. Compartición de la Información</h6>
                            <p>Con el fin de ofrecerte un servicio completo y mejorar la comunicación, tu información personal, como tu correo electrónico, nombre de usuario y número de teléfono, puede ser compartida con otros usuarios de Comunidapp. Esto es necesario para facilitar la interacción entre usuarios y para cumplir con el propósito del servicio.</p>

                            <h6>5. Derechos del Usuario</h6>
                            <p>Tienes el derecho a acceder, corregir o eliminar tu información personal en cualquier momento. Para realizar cualquier cambio en tu información, por favor, contacta con nuestro equipo de soporte.</p>

                            <h6>6. Cambios en los Términos</h6>
                            <p>Podemos actualizar nuestros términos y condiciones en cualquier momento. Te notificaremos sobre cualquier cambio mediante la publicación de los nuevos términos en nuestra aplicación. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.</p>

                            <h6>7. Contacto</h6>
                            <p>Si tienes alguna pregunta sobre estos términos, por favor, contáctanos en <a href="mailto:comunidapp.4geek@gmail.com">comunidapp.4geek@gmail.com</a></p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
