import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Publicacion } from '../components/Publicacion.jsx';
import Calendar from 'react-calendar';
import Clock from 'react-clock';  // Importar el componente de reloj analógico
import 'react-clock/dist/Clock.css';  // Importar los estilos del reloj

export function HomePage() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const calendarRef = useRef(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        // Obtener publicaciones
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicaciones')
            .then(response => response.json())
            .then(data => setPublicaciones(data));

        // Obtener datos del calendario desde la API
        fetch('URL_DE_TU_API_DE_CALENDARIO')
            .then(response => response.json())
            .then(data => {
                const events = data.map(event => ({
                    title: event.title,
                    start: event.start_time,
                    end: event.end_time
                }));
                setCalendarEvents(events);
            });

        // Actualizar la hora cada segundo
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <main className="mt-5 pt-5 container">
                <div className="row">
                    <div className="col-md-8 d-flex flex-column justify-content-start align-items-center gap-3">
                        {publicaciones.map((publicacion, index) => (
                            <Publicacion publicacion={publicacion} key={index} />
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="calendar-container">
                            <Calendar onChange={onChange} value={value} />
                        </div>
                        <div className="clock-container mt-3">
                            <h4>Hora Actual:</h4>
                            <Clock value={currentTime} />  {/* Renderizar el reloj analógico */}
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}



