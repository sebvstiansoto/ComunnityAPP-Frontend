import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Publicacion } from '../components/Publicacion.jsx';
import Calendar from 'react-calendar';
import Clock from 'react-clock';  
import 'react-clock/dist/Clock.css';  
import Footer from '../components/Footer.jsx';
import backgroundImage from '../assets/background.jpg';  // Importa la imagen de fondo

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
            <main
                className="mt-5 pt-5"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    minHeight: '100vh',
                    color: 'black', // Ajusta el color del texto para que sea legible
                }}
            >
                <div className="container">
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
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}




