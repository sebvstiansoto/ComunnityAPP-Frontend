import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ChangePassword() {

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false);

    function handleNewPasswordChange(e) {
        setNewPassword(e.target.value);
        validatePasswords(e.target.value, repeatPassword);
    }

    function handleRepeatPasswordChange(e) {
        setRepeatPassword(e.target.value);
        validatePasswords(newPassword, e.target.value);
    }

    function validatePasswords(newPass, repeatPass) {
        setIsPasswordsMatch(newPass === repeatPass && newPass !== "");
    }

    function handleClick() {
        if (!isPasswordsMatch) {
            alert("Las contraseñas no coinciden o están vacías.");
            return;
        }

        console.log('Contraseña actualizada');

        fetch('http://localhost:3000/recuperacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                newPassword,
            }),
        })
        .then((response) => {
            console.log('Response Status:', response.status); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((responseConverted) => {
            console.log('Response JSON:', responseConverted);
            console.log('Redirigiendo al login...');
            navigate("/login");
        })
        .catch((error) => {
            console.error('Ups algo salió mal 🙄', error);
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 border border-success">
                        <div className="card-header text-center bg-warning">
                            <h3>Actualizar Contraseña</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    placeholder="Introduce tu nueva contraseña"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    onBlur={() => validatePasswords(newPassword, repeatPassword)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="repeatPassword">Repetir Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="repeatPassword"
                                    placeholder="Repite tu nueva contraseña"
                                    value={repeatPassword}
                                    onChange={handleRepeatPasswordChange}
                                    onBlur={() => validatePasswords(newPassword, repeatPassword)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="btn btn-warning btn-outline-dark"
                                    disabled={!isPasswordsMatch}
                                >
                                    Actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
