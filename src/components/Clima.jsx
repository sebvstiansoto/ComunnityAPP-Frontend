import React from 'react';
import ReactWeather, { useWeatherBit } from 'react-open-weather';

const WeatherComponent = () => {
    // Usa el hook para obtener el estado del clima
    const { data, isLoading, errorMessage } = useWeatherBit({
        key: 'b946ce3fad6f4d42bc919b32b28cf033',
        lat: '-39.814', // Latitud de Valdivia
        lon: '-73.246', // Longitud de Valdivia
        lang: 'es', // Idioma en español
        unit: 'M', // Unidades en métricas (Celsius y Km/h)
    });

    return (
        <div className='pt-5 w-75'>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="es"
                locationLabel="Valdivia" // Etiqueta de ubicación
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }} // Unidades para temperatura y velocidad del viento
                showForecast={true} // Mostrar el pronóstico
            />
        </div>
    );
};

export default WeatherComponent;
