import React from 'react';
import ReactWeather, { useWeatherBit } from 'react-open-weather';

const WeatherComponent = () => {
    // Usa el hook para obtener el estado del clima
    const { data, isLoading, errorMessage } = useWeatherBit({
        key: 'b946ce3fad6f4d42bc919b32b28cf033',
        lat: '-39.814', 
        lon: '-73.246', 
        lang: 'es', 
        unit: 'M', 
    });


    return (
        <div className='pt-5 w-75'>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="es"
                locationLabel="Valdivia" 
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }} 
                showForecast={true} 
            />
        </div>
    );
};

export default WeatherComponent;
