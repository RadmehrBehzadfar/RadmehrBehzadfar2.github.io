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
import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Container, Form, Button, Card, Row, Col, Pagination, Alert } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
});

const API_KEY = 'bd8ab7dcb2bf49673795cf609c27a5a1';

export default function Home() {
  const router = useRouter();
  const { unit } = useContext(WeatherContext);

  const [localWeather, setLocalWeather] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  const [showMap, setShowMap] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.cod === 200) {
                setLocalWeather(data);
              } else {
                setGeoError(data.message || 'Error fetching local weather');
              }
            })
            .catch(() => setGeoError('Error fetching local weather'));
        },
        () => setGeoError('Geolocation permission denied or unavailable')
      );
    } else {
      setGeoError('Geolocation not supported');
    }
  }, [unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) {
      setSearchError('Please enter a city name or city ID.');
      setSearchResults([]);
      return;
    }
    const query = searchQuery.trim();
    const isCityId = /^\d+$/.test(query);
    let url = isCityId
      ? `https://api.openweathermap.org/data/2.5/weather?id=${query}&units=${unit}&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(
          query
        )}&units=${unit}&appid=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isCityId) {
          if (data.cod !== 200) {
            setSearchError('City not found.');
            setSearchResults([]);
          } else {
            setSearchResults([data]);
          }
        } else {
          if (data.count === 0) {
            setSearchError('City not found.');
            setSearchResults([]);
          } else {
            setSearchResults(data.list);
          }
        }
        setCurrentPage(1);
      })
      .catch(() => {
        setSearchError('Error searching city.');
        setSearchResults([]);
      });
  };
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const handleDetails = (weather) => {
    router.push(`/city/${weather.id}?name=${encodeURIComponent(weather.name)}&country=${weather.sys.country}`);
  };
  
  useEffect(() => {
    const locs = searchResults.map((w) => ({
      id: w.id,
      name: w.name,
      country: w.sys.country,
      lat: w.coord.lat,
      lon: w.coord.lon,
    }));
    setLocations(locs);
  }, [searchResults]);
  

  return (
    <Container style={{ marginTop: '80px' }}>
      <h2>Local Weather Info</h2>
      {geoError && <Alert variant="danger">{geoError}</Alert>}
      {localWeather && localWeather.main && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>
              {localWeather.name} ({localWeather.sys.country})
              <img
                src={`http://openweathermap.org/images/flags/${localWeather.sys.country.toLowerCase()}.png`}
                alt="flag"
                style={{ width: '30px', marginLeft: '8px' }}
              />
            </Card.Title>
            <Card.Text>
              Temp: {localWeather.main.temp.toFixed(1)}° {unit === 'metric' ? 'C' : 'F'}
              <br />
              Weather: {localWeather.weather[0].description}
            </Card.Text>
            <Button onClick={() => handleDetails(localWeather)}>Details</Button>
          </Card.Body>
        </Card>
      )}

      <h2>Search Weather</h2>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group controlId="searchQuery">
          <Form.Label>Enter City Name or City ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. London or 2643743"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        {searchError && <Alert variant="danger">{searchError}</Alert>}
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      {searchResults.length > 0 && (
        <>
          <Row className="mb-3">
            {currentResults.map((cityWeather, i) => (
              <Col md={4} key={i} className="mb-2">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {cityWeather.name} ({cityWeather.sys.country})
                      <img
                        src={`http://openweathermap.org/images/flags/${cityWeather.sys.country.toLowerCase()}.png`}
                        alt="flag"
                        style={{ width: '30px', marginLeft: '8px' }}
                      />
                    </Card.Title>
                    <Card.Text>
                      {cityWeather.weather[0].main}: {cityWeather.main.temp.toFixed(1)}°{' '}
                      {unit === 'metric' ? 'C' : 'F'}
                    </Card.Text>
                    <Button onClick={() => handleDetails(cityWeather)}>Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          <div style={{ marginTop: '1rem' }}>
            <Button variant="info" onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </div>

          {showMap && <MapComponent locations={locations} />}
        </>
      )}
    </Container>
  );
}