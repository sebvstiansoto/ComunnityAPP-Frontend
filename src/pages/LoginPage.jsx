import React, { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changeContraseña(e) {
    setContraseña(e.target.value);
  }

  function sendData(e) {
    e.preventDefault();

    if (!email || !contraseña) {
      alert("Por favor, ingresa todos los campos.");
      return;
    }

    console.log({ email, contraseña });
    console.log("Preparando para enviar datos al backend");

    fetch("http://localhost:3000/login", {
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
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `HTTP error! status: ${response.status}, details: ${text}`
            );
          });
        }
        return response.json();
      })
      .then((responseConverted) => {
        alert(responseConverted.message + " 🤩🙂🤩🤗");

        setEmail("");
        setContraseña("");
      })
      .catch((error) => {
        console.error("Ups algo salió mal 🙄", error);
      });
  }

  return (
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 text-success-emphasis">
      <h1>Bienvenido a Comunidapp!</h1>
      <div class="col-6 col-md-4 d-flex flex-column m-3 p-3">
        <input
          type="email"
          class="form-control border-2 border-success-subtle mb-3"
          id="validationDefault02"
          placeholder="UserName / Email"
          required
        />
        <input
          type="password"
          class="form-control border-2 border-success-subtle mb-3"
          id="validationDefault03"
          placeholder="Contraseña"
          required
        />

        <div class="d-flex justify-content-center">
          <button
            class="btn btn-success btn-outline-dark m-1 col-4"
            type="submit"
          >
            Ingresar
          </button>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <button
            class="btn btn-warning btn-outline-dark col-6 m-1"
            type="submit"
          >
            Registrate
          </button>
          <button
            class="btn btn-warning btn-outline-dark col-6 m-1"
            type="submit"
          >
            Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
