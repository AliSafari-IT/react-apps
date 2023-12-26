// pages/weather.js
import React from 'react';

const Weather = ({ forecast }) => {
    return (
        <div>
            <h1>Weather Forecast</h1>
            {[...forecast].map((item: any, index: number) => (
                <div key={index}>
                    <p>{item.date}: {item.temperatureC}°C / {item.temperatureF}°F</p>
                    <p>Summary: {item.summary}</p>
                </div>
            ))}
        </div>
    );
};

export async function getServerSideProps() {
    const res = await fetch('https://localhost:44348/WeatherForecast');
    const forecast = await res.json();

    return {
        props: { forecast }, // will be passed to the page component as props
    };
}

export default Weather;
