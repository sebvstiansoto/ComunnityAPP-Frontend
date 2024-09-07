import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { Alert } from 'react-bootstrap';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      .then((response) => response.json())
      .then((responseConverted) => {
        if (responseConverted.error) {
          setErrorMessage("Contraseña incorrecta");
        } else {
          localStorage.setItem("username", responseConverted.username);
          localStorage.setItem("id_usuario", responseConverted.id_usuario);
          navigate("/home/" + responseConverted.id_usuario);
        }
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
        setErrorMessage("Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
      });
  }

  return (
    <main>
      <div className="d-flex flex-column min-vh-100">
        <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-success-emphasis mt-5">
          <h1 className="text-success-emphasis fw-bold">¡Bienvenido a Comunidapp!</h1>
          <div className="col-6 col-md-4 d-flex flex-column m-3 p-3">
            {errorMessage && (
              <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                {errorMessage}
              </Alert>
            )}
            <input
              onChange={changeEmail}
              type="email"
              className="form-control border-2 border-success-subtle mb-3"
              id="validationDefault02"
              placeholder="Email"
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
                className="btn btn-success btn-outline-dark m-1 col-4 fw-bold text-light"
                type="button"
                onClick={sendData}
              >
                Ingresar
              </button>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <button
                onClick={redirectRegister}
                className="btn btn-warning btn-outline-dark col-6 m-1 fw-bold"
                type="submit"
              >
                Regístrate
              </button>
              <button
                onClick={redirectRecovery}
                className="btn btn-warning btn-outline-dark col-6 m-1 fw-bold"
                type="submit"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
