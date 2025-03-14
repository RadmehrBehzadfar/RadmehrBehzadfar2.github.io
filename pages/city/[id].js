/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: RadmehrBehzadfar Student ID: 148786221 Date:2025-03-13
*
*
********************************************************************************/
import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { WeatherContext } from '../../context/WeatherContext';
import { Container, Card, Alert, Button } from 'react-bootstrap';

export default function CityDetailPage() {
  const router = useRouter();
  const { id, name, country } = router.query;
  const { unit, addVisitedCity } = useContext(WeatherContext);

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const hasAddedRef = useRef(false);

  useEffect(() => {
    if (!id || !name || !country) return;

    const API_KEY = 'bd8ab7dcb2bf49673795cf609c27a5a1';
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=${unit}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setError(data.message || 'Error retrieving city details.');
        }
      })
      .catch(() => setError('Error retrieving city details.'));
  }, [id, name, country, unit]);

  useEffect(() => {
    if (weatherData && !hasAddedRef.current) {
      addVisitedCity(weatherData);
      hasAddedRef.current = true;
    }
  }, [weatherData, addVisitedCity]);

  if (error) {
    return (
      <Container style={{ marginTop: '80px' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  if (!weatherData) {
    return (
      <Container style={{ marginTop: '80px' }}>
        <Alert variant="info">Loading weather...</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Card>
        <Card.Body>
          <Card.Title>
            {weatherData.name} ({weatherData.sys.country})
            <img
              src={`http://openweathermap.org/images/flags/${weatherData.sys.country.toLowerCase()}.png`}
              alt="flag"
              style={{ width: '30px', marginLeft: '8px' }}
            />
          </Card.Title>
          <Card.Text>
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp.toFixed(1)}°
              {unit === 'metric' ? 'C' : 'F'}
            </p>
            <p>
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </p>
            <p>
              <strong>Max/Min:</strong> {weatherData.main.temp_max.toFixed(1)}° /{' '}
              {weatherData.main.temp_min.toFixed(1)}°
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </p>
            <p>
              <strong>Pressure:</strong> {weatherData.main.pressure} hPa
            </p>
            <p>
              <strong>Wind Speed:</strong> {weatherData.wind.speed}
            </p>
            <p>
              <strong>Sunrise:</strong>{' '}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              <strong>Sunset:</strong>{' '}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </Card.Text>
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}