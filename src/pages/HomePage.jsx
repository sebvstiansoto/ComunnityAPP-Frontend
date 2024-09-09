import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Publicacion } from '../components/Publicacion.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Footer.jsx';
import WeatherComponent from '../components/Clima.jsx';

export function HomePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publicaciones, setPublicaciones] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const calendarRef = useRef(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        if (!id) {
            navigate("/login");
        }
    }, [id, navigate]);  

    useEffect(() => {
        fetch('https://comunidappbackend-sebastian-sotos-projects-c217a73f.vercel.app/obtener_publicaciones')
            .then(response => response.json())
            .then(data => setPublicaciones(data));

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <main
                className="mt-5 pt-5"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 d-flex flex-column justify-content-start align-items-center gap-3">
                            {publicaciones.map((publicacion, index) => (
                                <Publicacion publicacion={publicacion} key={index} />
                            ))}
                        </div>
                        <div className="col-md-4">
                            <div className="calendar-container w-75 pt-10">
                                <Calendar onChange={onChange} value={value} />
                            </div>
                            <WeatherComponent />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
}
