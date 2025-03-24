import React, { useState } from 'react';

// ===============================================
// SCENARIO (from the image):
// You are developing a simple weather application for travelers who need
// real-time weather updates before planning their trips.
//
// PROBLEM STATEMENT:
// Build a Weather Dashboard that fetches real-time weather data from the
// OpenWeather API and displays it in a user-friendly web application.
//
// KEY POINTS:
// 1. Use OpenWeather API (or any free weather API) to fetch data.
// 2. Implement a clean and responsive UI using HTML, CSS, and JavaScript (or React.js).
// 3. Handle API errors gracefully (e.g., invalid city name should show an error message).
// 4. Deploy the application on a free hosting platform (Render, Railway, Netlify, etc.)
// 5. Store the project on GitHub, and detail your documentation in the README file.
//
// EXPECTED OUTPUT:
// 1. A deployed web application where users can search for any city's weather.
// 2. Weather details such as temperature (°C/°F), humidity (%), and a short weather description.
// 3. A visually appealing UI with weather-related icons.
// ===============================================

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Replace with your OpenWeather API key
  const API_KEY = '4ed1622be0fc9861fb59fecfe21b3b18';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }

    try {
      setError('');
      setWeatherData(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'City not found');
      }

      const data = await response.json();

      if (!data.main || !data.weather) {
        throw new Error('Invalid weather data received');
      }

      // Extract the data we want
      const temperature = data.main.temp; // in °C
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      setWeatherData({
        city: data.name,
        temperature,
        humidity,
        description,
        icon,
      });
    } catch (err) {
      setError('Could not fetch weather. Check the city name.');
      setWeatherData(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="weather-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.city}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
            />
            <p>Temperature: {weatherData.temperature} °C</p>
            <p>Humidity: {weatherData.humidity} %</p>
            <p>Description: {weatherData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
