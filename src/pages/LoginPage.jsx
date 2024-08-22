import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();  // Crear una instancia de useNavigate

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changeContraseña(e) {
        setContraseña(e.target.value);
    }
    
    function sendData(e) {
        e.preventDefault();
        if (!email || !contraseña) {
            alert('Por favor, ingresa todos los campos.');
            return;
        }

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email,
                contraseña: contraseña
            }),
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then((text) => {
                    throw new Error(`HTTP error! status: ${response.status}, details: ${text}`);
                });
            }
            return response.json();
        })
        .then((responseConverted) => {
            alert(responseConverted.message + " 🤩🙂🤩🤗");
            if (responseConverted.token) {
                localStorage.setItem('token', responseConverted.token);
                localStorage.setItem('username', responseConverted.username);

                // Redirigir a la página de inicio
                navigate("/");  // Redirige a "/"
            }
            setEmail('');
            setContraseña('');
        })
        .catch((error) => {
            console.error('Ups algo salió mal 🙄', error);
        });
    }

    return (
        <form onSubmit={sendData}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={email} 
                    onChange={changeEmail} 
                    placeholder="Ingresa tu email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="contraseña" 
                    value={contraseña} 
                    onChange={changeContraseña} 
                    placeholder="Ingresa tu contraseña"
                />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
    );
}
