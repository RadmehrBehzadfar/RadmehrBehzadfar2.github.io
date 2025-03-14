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
import { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {

  const [visitedCities, setVisitedCities] = useState([]);

  const [unit, setUnit] = useState('metric');

  const [theme, setTheme] = useState('light');
  
  const addVisitedCity = (city) => {
    if (!visitedCities.find((item) => item.id === city.id)) {
      setVisitedCities((prev) => [...prev, city]);
    }
  };
  useEffect(() => {
    const storedCities = JSON.parse(sessionStorage.getItem('visitedCities') || '[]');
    if (storedCities.length) setVisitedCities(storedCities);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) setTheme(storedTheme);

    const storedUnit = localStorage.getItem('unit');
    if (storedUnit) setUnit(storedUnit);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('visitedCities', JSON.stringify(visitedCities));
  }, [visitedCities]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('unit', unit);
  }, [unit]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    visitedCities,
    addVisitedCity,
    unit,
    setUnit,
    theme,
    toggleTheme,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}