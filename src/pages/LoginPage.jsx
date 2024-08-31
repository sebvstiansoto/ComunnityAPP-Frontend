import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changeContraseña(e) {
    setContraseña(e.target.value);
  }

  function redirectRegister() {
    navigate("/register");
  }

  function redirectRecovery() {
    navigate("/recovery");
  }

  function sendData(e) {
    e.preventDefault();

    console.log({ email, contraseña });
    console.log("Preparando para enviar datos al backend");

    fetch("https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        contraseña: contraseña,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseConverted) => {
        localStorage.setItem("username", responseConverted.username);
        localStorage.setItem("id_usuario", responseConverted.id_usuario);
        navigate("/profile/" + responseConverted.id_usuario);
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
        alert("Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
      });
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-success-emphasis">
      <h1>Bienvenido a Comunidapp!</h1>
      <div className="col-6 col-md-4 d-flex flex-column m-3 p-3">
        <input
          onChange={changeEmail}
          type="email"
          className="form-control border-2 border-success-subtle mb-3"
          id="validationDefault02"
          placeholder="UserName / Email"
          required
        />
        <input
          onChange={changeContraseña}
          type="password"
          className="form-control border-2 border-success-subtle mb-3"
          id="validationDefault03"
          placeholder="Contraseña"
          required
        />

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success btn-outline-dark m-1 col-4"
            type="button"
            onClick={sendData}
          >
            Ingresar
          </button>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button
            onClick={redirectRegister}
            className="btn btn-warning btn-outline-dark col-6 m-1"
            type="submit"
          >
            Registrate
          </button>
          <button
            onClick={redirectRecovery}
            className="btn btn-warning btn-outline-dark col-6 m-1"
            type="submit"
          >
            Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
