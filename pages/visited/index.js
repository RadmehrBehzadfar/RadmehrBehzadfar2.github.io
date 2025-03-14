/************************************************************************
  /pages/visited/index.js
*************************************************************************/
import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function VisitedCities() {
  const { visitedCities, unit } = useContext(WeatherContext);

  return (
    <Container style={{ marginTop: '80px' }}>
      <h2>Visited Cities</h2>
      {visitedCities.length === 0 ? (
        <p>No visited cities yet.</p>
      ) : (
        <Row>
          {visitedCities.map((city) => (
            <Col md={4} key={city.id} className="mb-3">
              <Link href={`/city/${city.id}?name=${encodeURIComponent(city.name)}&country=${city.sys.country}`}>
                <Card style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>
                      {city.name} ({city.sys.country})
                      <img
                        src={`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`}
                        alt="flag"
                        style={{ width: '30px', marginLeft: '8px' }}
                      />
                    </Card.Title>
                    <Card.Text>
                      {city.weather[0].main}: {city.main.temp.toFixed(1)}°{' '}
                      {unit === 'metric' ? 'C' : 'F'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}