import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importar useNavigate

export function RegisterPage() {
    let [nombre_usuario, setUsername] = useState("");
    let [contraseña, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [telefono, setPhone] = useState("");
    let [identificacion, setIdentification] = useState("");

    const navigate = useNavigate();  // Crear una instancia de useNavigate

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

        fetch('http://localhost:3000/registro', {
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
                alert(responseConverted.message + " 🤩🙂🤩🤗");
                // Clear all fields after successful registration
                setUsername("");
                setPassword("");
                setEmail("");
                setPhone("");
                setIdentification("");
                
                // Redirigir a la página de inicio
                navigate("/");  // Redirige a "/"
            })
            .catch((error) => {
                console.error('Ups algo salió mal 🙄', error);
            });
    } 

    return (
        <form className="" onSubmit={sendData}>
            <div className="col-6 col-sm-4">
                <label htmlFor="nombreUsuario" className="visually-hidden">Nombre Usuario</label>
                <input type="text" value={nombre_usuario} onChange={changeUsername} className="form-control" id="usuario" placeholder="Ingresa Nombre Usuario"/>
            </div>

            <div className="col-6 col-sm-4">
                <label htmlFor="correo" className="visually-hidden">Email</label>
                <input type="email" value={email} onChange={changeEmail} className="form-control" id="correos" placeholder="Ingresa Email"/>
            </div>

            <div className="col-3">
                <label htmlFor="contrasena" className="visually-hidden">Contrasena</label>
                <input type="password" value={contraseña} onChange={changePassword} className="form-control" id="password" placeholder="Ingresa Contrasena"/>
            </div>

            <div className="col-3">
                <label htmlFor="phoneNumber" className="visually-hidden">Telefono</label>
                <input type="number" value={telefono} onChange={changePhone} className="form-control" id="telefono" placeholder="Ingresa Telefono"/>
            </div>

            <div className="col-3">
                <label htmlFor="dniNumber" className="visually-hidden">RUT</label>
                <input type="text" value={identificacion} onChange={changeIdentification} className="form-control" id="identification" placeholder="Ingresa RUT"/>
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Registrarse</button>
            </div>
        </form>
    );
}
