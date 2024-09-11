import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Loading from "../assets/loading.gif";
import * as rutHelpers from 'rut-helpers';

export function RegisterPage() {
    let [loading, setLoading] = useState(false);
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
        rutHelpers.rutValidate(identificacion)
        setIdentification(e.target.value);
    }

    function handleCheckboxChange(e) {
        setIsChecked(e.target.checked);
    }

    function validarFormulario() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+569[0-9]{8}$/;

        if (!emailRegex.test(email)) {
            alert("Por favor, ingrese un correo válido.");
            return false;
        }
        if (nombre_usuario.length < 4) {
            alert("El nombre de usuario debe tener al menos 4 caracteres.");
            return false;
        }
        if (contraseña.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        if (!phoneRegex.test(telefono)) {
            alert("Por favor, ingrese un número de teléfono válido de 8 dígitos.");
            return false;
        }
        return true;
    }

    function sendData(e) {
        e.preventDefault();

        if (!isChecked) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        if (!validarFormulario()) {
            return;
        }

        const formattedPhone = `${telefono}`;

        setLoading(true);

        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: nombre_usuario,
                contraseña: contraseña,
                email: email,
                telefono: formattedPhone,
                identificacion: identificacion
            }),
        })
        .then((response) => {
            if (!response.ok) {
                setLoading(false);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            setLoading(false);
            navigate("/");
        })
        .catch((error) => {
            setLoading(false);
            console.error('Ups algo salió mal 🙄', error);
        });
    }

    return (
        <>
            <div className="d-flex justify-content-center m-3 p-3 text-success-emphasis">
                <h1 className="text-success-emphasis fw-bold">Regístrate en Comunidapp</h1>
            </div>
            <div className="container-sm w-75">
                <div className="d-flex justify-content-center">
                    <form className="row g-3" onSubmit={sendData}>
                        <div className="col-md-6">
                            <label htmlFor="validationDefault02" className="form-label text-success-emphasis fw-semibold">Correo Electronico</label>
                            <input
                                type="email"
                                className="custom-font form-control border-2 border-success-subtle"
                                id="validationDefault02"
                                placeholder=""
                                required
                                value={email}
                                onChange={changeEmail}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationDefaultUsername" className="form-label text-success-emphasis fw-semibold">Nombre de usuario</label>
                            <div className="input-group">
                                <span className="input-group-text bg-warning bg-gradient border-2 border-success-subtle" id="inputGroupPrepend2">@</span>
                                <input
                                    type="text"
                                    className="custom-font form-control border-2 border-success-subtle"
                                    id="validationDefaultUsername"
                                    placeholder="Al menos 4 caracteres..."
                                    required
                                    value={nombre_usuario}
                                    onChange={changeUsername}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationDefaultPassword" className="form-label text-success-emphasis fw-semibold">Contraseña</label>
                            <input
                                type="password"
                                className="custom-font form-control border-2 border-success-subtle"
                                id="validationDefaultPassword"
                                placeholder="Debe tener al menos 8 caracteres."
                                required
                                value={contraseña}
                                onChange={changePassword}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationDefaultDocument" className="form-label text-success-emphasis fw-semibold">Número de documento</label>
                            <input
                                type="text"
                                className="custom-font form-control border-2 border-success-subtle"
                                id="validationDefaultDocument"
                                placeholder="Ingresa los digitos añadiendo un guion antes del digito verificador."
                                required
                                value={identificacion}
                                onChange={changeIdentification}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationDefaultPhone" className="form-label text-success-emphasis fw-semibold">Teléfono</label>
                            <div className="input-group">
                                <input
                                    type="tel"
                                    className="custom-font form-control border-2 border-success-subtle"
                                    id="validationDefaultPhone"
                                    placeholder='Ej: "+569XXXXXXXX"'
                                    required
                                    value={telefono}
                                    onChange={changePhone}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-5 d-flex align-items-center">
                            <div className="form-check">
                                <input
                                    className="border border-success form-check-input"
                                    type="checkbox"
                                    id="invalidCheck2"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label className="form-check-label ms-1 fw-semibold" htmlFor="invalidCheck2">
                                    Acepto los <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">términos y condiciones</a>
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            {loading ? <img src={Loading} alt="cargando" /> : <button className="custom-font btn btn-warning btn-outline-dark fw-bold" type="submit" disabled={loading}>
                                {loading ? "Enviando..." : "Enviar formulario"}</button>}
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}
