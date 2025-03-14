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
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherProvider } from '../context/WeatherContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContext, useEffect } from 'react';
import { WeatherContext as WC } from '../context/WeatherContext';

function ThemedAppContent({ Component, pageProps }) {
  const { theme } = useContext(WC);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  return <Component {...pageProps} />;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <WeatherProvider>
      <Navbar />
      <ThemedAppContent Component={Component} pageProps={pageProps} />
      <Footer />
    </WeatherProvider>
  );
}