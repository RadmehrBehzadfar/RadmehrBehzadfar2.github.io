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
import fs from 'fs';
import path from 'path';
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Pagination, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { WeatherContext } from '../context/WeatherContext';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'city.list.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const cityData = JSON.parse(fileData);

  return { props: { allCities: cityData } };
}

function buildPageNumbers(current, total) {
  if (total <= 3) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const last = total;
  const next1 = current + 1;
  const next2 = current + 2;

  if (current >= last - 1) {
    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < last) pages.push(current + 1);
    return pages;
  }

  pages.push(current);
  if (next1 < last) pages.push(next1);
  if (next2 < last) pages.push(next2);

  if (next2 < last - 1) {
    pages.push('...');
  }
  pages.push(last);
  return pages;
}

export default function AllCities({ allCities }) {
  const { unit } = useContext(WeatherContext);
  const router = useRouter();

  const [filteredCities, setFilteredCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 50;

  useEffect(() => {
    const valid = allCities.filter((c) => {
      if (!c.name) return false;
      const nameTrimmed = c.name.trim();
      if (!nameTrimmed || nameTrimmed === '-') return false;
      return true;
    });

    valid.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredCities(valid);
  }, [allCities]);

  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);
  const startIndex = (currentPage - 1) * citiesPerPage;
  const endIndex = startIndex + citiesPerPage;
  const currentSlice = filteredCities.slice(startIndex, endIndex);

  const handlePageClick = (p) => {
    if (p === '...') return; 
    setCurrentPage(p);
  };

  const handleDetails = (city) => {
    router.push(`/city/${city.id}?name=${encodeURIComponent(city.name)}&country=${city.country}`);
  };

  if (!filteredCities || filteredCities.length === 0) {
    return (
      <Container style={{ marginTop: '80px' }}>
        <Alert variant="warning">No city data found!</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <h2>All Cities</h2>
      <p>Showing {citiesPerPage} per page, total {filteredCities.length} cities</p>

      <Row>
        {currentSlice.map((city) => (
          <Col md={6} className="mb-3" key={city.id}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {city.name} ({city.country})
                  <img
                    src={`http://openweathermap.org/images/flags/${city.country?.toLowerCase()}.png`}
                    alt="flag"
                    style={{ width: '30px', marginLeft: '8px' }}
                  />
                </Card.Title>
                <Card.Text>City ID: {city.id}</Card.Text>
                <Button onClick={() => handleDetails(city)}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

<Pagination className="mt-3">
  <Pagination.First
    disabled={currentPage === 1}
    onClick={() => handlePageClick(1)}
  />

  <Pagination.Prev
    disabled={currentPage <= 1}
    onClick={() => handlePageClick(currentPage - 1)}
  >
    Prev
  </Pagination.Prev>
  {buildPageNumbers(currentPage, totalPages).map((p, idx) => {
    if (p === '...') {
      return (
        <Pagination.Ellipsis
          key={`ellipsis-${idx}`}
          disabled
          style={{ cursor: 'default' }}
        />
      );
    }
    return (
      <Pagination.Item
        key={p}
        active={p === currentPage}
        onClick={() => handlePageClick(p)}
      >
        {p}
      </Pagination.Item>
    );
  })}

  <Pagination.Next
    disabled={currentPage >= totalPages}
    onClick={() => handlePageClick(currentPage + 1)}
  >
    Next
  </Pagination.Next>

  <Pagination.Last
    disabled={currentPage === totalPages}
    onClick={() => handlePageClick(totalPages)}
  />
</Pagination>


    </Container>
  );
}