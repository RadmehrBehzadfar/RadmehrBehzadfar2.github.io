/************************************************************************
  /pages/visited/[id].js
  (If you still want individual visited routes, but we now do /city/[id]
  so this might be optional or removed. Kept only if you want.)
*************************************************************************/
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function VisitedCityDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { visitedCities, unit } = useContext(WeatherContext);

  const city = visitedCities.find((c) => String(c.id) === String(id));
  if (!city) {
    return (
      <Container style={{ marginTop: '80px' }}>
        <p>City not found in visited list.</p>
        <Link href="/visited" passHref>
          <Button>Back to Visited</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Card>
        <Card.Body>
          <Card.Title>
            {city.name} ({city.sys.country})
          </Card.Title>
          <Card.Text>
            <p>
              <strong>Temperature:</strong> {city.main.temp.toFixed(1)}°
              {unit === 'metric' ? 'C' : 'F'}
            </p>
            <p>
              <strong>Weather:</strong> {city.weather[0].description}
            </p>
          </Card.Text>
          <Link href="/visited">
            <Button variant="secondary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}