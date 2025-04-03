import { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=362b4f87f49f4f619ed143950250304&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData({
        temperature: `${data.current.temp_c}°C`,
        humidity: `${data.current.humidity}%`,
        condition: data.current.condition.text,
        windSpeed: `${data.current.wind_kph} kph`,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "8px 12px", background: "green", color: "white", border: "none", cursor: "pointer" }}>
        Search
      </button>

      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards" style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
          <div className="weather-card" style={cardStyle}>
            <strong>Temperature</strong>
            <p>{weatherData.temperature}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Humidity</strong>
            <p>{weatherData.humidity}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Condition</strong>
            <p>{weatherData.condition}</p>
          </div>
          <div className="weather-card" style={cardStyle}>
            <strong>Wind Speed</strong>
            <p>{weatherData.windSpeed}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  width: "150px",
  textAlign: "center",
};

export default WeatherApp;
