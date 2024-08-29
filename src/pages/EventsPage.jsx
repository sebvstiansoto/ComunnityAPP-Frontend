import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Publicacion } from '../components/Publicacion.jsx'

export function EventsPage() {

  // Ejemplo de datos de publicaciones
  const publicaciones = [
    {
      titulo: "Centro Médico Almendral",
      texto: "Nuevo Centro Médico en el Almendral: El Centro de Salud Familiar Almendral inaugura modernas instalaciones con atención especializada en cardiología y pediatría. ¡Agende su cita hoy!",
      fechaPublicacion: "2024-08-27T09:59:00Z",
    },
    {
      titulo: "Hospital Van Buren",
      texto: "Ampliación en Hospital Van Buren: El Hospital Carlos Van Buren suma 20 nuevas camas UCI y refuerza su equipo de profesionales para mejorar la atención de pacientes críticos.",
      fechaPublicacion: "2024-08-26T09:55:00Z",
    },
    {
      titulo: "Clínica Valparaíso",
      texto: "Clínica Valparaíso Lanza Programa de Telemedicina: Clínica Valparaíso ahora ofrece consultas médicas online para todas sus especialidades. Atención segura y cómoda desde su hogar.",
      fechaPublicacion: "2024-08-24T09:05:00Z",
    },
    {
      titulo: "Clínica Valparaíso",
      texto: "Clínica Valparaíso Lanza Programa de Telemedicina: Clínica Valparaíso ahora ofrece consultas médicas online para todas sus especialidades. Atención segura y cómoda desde su hogar.",
      fechaPublicacion: "2024-08-24T09:05:00Z",
    },
  ];

  return (
    <React.Fragment>
    <Navbar />
    <main className="mt-5 pt-5">
      <div className="d-flex flex-column justify-content-start align-items-center gap-3">
        {publicaciones.map((publicacion, index) => (
         <Publicacion publicacion={publicacion} key={index}/>
        ))}
      </div>
    </main>
  </React.Fragment>
  );
}
