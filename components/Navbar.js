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
import Link from 'next/link';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Navbar as BsNavbar, Nav, Container, Form } from 'react-bootstrap';

export default function Navbar() {
  const { visitedCities, unit, setUnit, theme, toggleTheme } = useContext(WeatherContext);

  const handleUnitChange = (e) => setUnit(e.target.value);

  return (
    <BsNavbar bg="light" expand="lg" style={{ padding: '10px' }} className='navbar'>
      <Container>
        <BsNavbar.Brand href="/">Weather App</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/cities" passHref legacyBehavior>
              <Nav.Link>All Cities</Nav.Link>
            </Link>
            <Link href="/visited" passHref legacyBehavior>
              <Nav.Link>Visited ({visitedCities.length})</Nav.Link>
            </Link>
          </Nav>
          <Form style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <span style={{ marginRight: '8px' }}>Unit:</span>
            <Form.Select
              aria-label="Unit"
              onChange={handleUnitChange}
              value={unit}
              style={{ width: '120px' }}
            >
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </Form.Select>
          </Form>

          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === 'light' ? 'Day Mode' : 'Night Mode'}
            checked={theme === 'dark'}
            onChange={toggleTheme}
            style={{ fontWeight: '500', cursor: 'pointer' }}
          />
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
