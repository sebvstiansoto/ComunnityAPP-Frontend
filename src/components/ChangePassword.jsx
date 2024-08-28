import React, { useState, useEffect } from 'react';

export function ChangePassword() {
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Obtener el token desde la URL (por ejemplo, ?token=...)
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError('Token de recuperación no encontrado en la URL.');
        }
    }, []);

    function changeContraseña(e) {
        setContraseña(e.target.value);
    }
    
    function changeConfirmarContraseña(e) {
        setConfirmarContraseña(e.target.value);
    }

    function sendData(e) {
        e.preventDefault();

        setError('');

        if (contraseña !== confirmarContraseña) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (!token) {
            setError('Token de recuperación no válido.');
            return;
        }

        // Enviar datos al backend
        fetch('http://localhost:3000/newpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                contraseña: contraseña,
                token: token  // Incluir el token en el cuerpo de la solicitud
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
            // Limpiar los inputs
            setContraseña('');
            setConfirmarContraseña('');
        })
        .catch((error) => {
            console.error('Ups algo salió mal 🙄', error);
            setError('Hubo un problema al actualizar la contraseña. Por favor, intenta nuevamente.');
        });
    }

    return (
        <div>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="contraseña">Contraseña Nueva</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="contraseña" 
                        value={contraseña} 
                        onChange={changeContraseña} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmarContraseña">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmarContraseña" 
                        value={confirmarContraseña} 
                        onChange={changeConfirmarContraseña} 
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Actualizar Contraseña</button>
            </form>
        </div>
    );
}
