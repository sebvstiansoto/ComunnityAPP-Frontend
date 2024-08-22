import React, { useState } from 'react';

export function RecoveryPage() {
    const [email, setEmail] = useState('');

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function sendData(e) {
        e.preventDefault();
        console.log({ email });
        console.log('Solicitud de recuperación enviada a mi backend');

        fetch('http://localhost:3000/recuperacion', {
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
        .then((responseConverted) => {
            alert(responseConverted.message + " 🤩🙂🤩🤗");
            setEmail('');
        })
        .catch((error) => {
            console.error('Ups algo salió mal 🙄', error);
        });
    }

    return (
        <form onSubmit={sendData}>
            <div className="col-6 col-sm-4">
                <label htmlFor="email" className="visually-hidden">Correo Electronico</label>
                <input 
                    type="text" 
                    onChange={changeEmail} 
                    className="form-control" 
                    id="email" 
                    placeholder="Ingresa Correo Electronico"
                    value={email}
                />
            </div>

            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Recuperar contraseña</button>
            </div>
        </form>
    );
}
