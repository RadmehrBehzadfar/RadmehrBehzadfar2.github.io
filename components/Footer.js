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
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="app-footer">
      <Container>
        <p>© 2025 My Weather App</p>
        <a
          href="https://github.com/RadmehrBehzadfar"
          target="_blank"
          rel="noreferrer"
          style={{ marginRight: '12px' }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            width="24"
            style={{ verticalAlign: 'middle' }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/radmehr-behzadfar-programming"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
            width="24"
            style={{ verticalAlign: 'middle' }}
          />
        </a>
      </Container>
    </footer>
  );
}