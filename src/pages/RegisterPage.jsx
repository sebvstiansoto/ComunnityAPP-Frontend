import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
    let [nombre_usuario, setUsername] = useState("");
    let [contraseña, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [telefono, setPhone] = useState("");
    let [identificacion, setIdentification] = useState("");

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

    function sendData(e) {
        e.preventDefault();
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
            .then((responseConverted) => {
                navigate("/login");
            })
            .catch((error) => {
                console.error('Ups algo salió mal 🙄', error);
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center m-3 p-3 text-success-emphasis">
                <h1 className="text-success fw-bold">Registrate en Comunidapp</h1>
            </div>
            <div className="d-flex justify-content-center m-3 p-3">
                <form className="row g-3" onSubmit={sendData}>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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

                    <div className="col-12 text-center">
                        <button className="btn btn-warning btn-outline-dark fw-bold" type="submit">Enviar formulario</button>
                    </div>
                </form>
            </div>
        </>
    );
}