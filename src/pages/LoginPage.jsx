import React, { useState } from 'react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

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

        console.log({ email, contraseña });
        console.log('Preparando para enviar datos al backend');

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

            setEmail('');
            setContraseña('');
        })
        .catch((error) => {
            console.error('Ups algo salió mal 🙄', error);
        });
    }

    return (
        <form onSubmit={sendData}>
            <div className="col-6 col-sm-4">
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input 
                    type="email" 
                    onChange={changeEmail} 
                    className="form-control" 
                    id="email" 
                    placeholder="Ingresa Email"
                    value={email}
                />
            </div>

            <div className="col-3">
                <label htmlFor="password" className="visually-hidden">Contraseña</label>
                <input 
                    type="password" 
                    onChange={changeContraseña} 
                    className="form-control" 
                    id="password" 
                    placeholder="Ingresa Contraseña"
                    value={contraseña}
                />
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Conectarse</button>
            </div>
        </form>
    );
}
