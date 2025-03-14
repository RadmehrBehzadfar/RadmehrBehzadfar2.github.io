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
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png', 
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function MapComponent({ locations }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!locations || locations.length === 0) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapRef.current = L.map('mapid', {
      center: [locations[0].lat, locations[0].lon],
      zoom: 3,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(mapRef.current);

    locations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lon]).addTo(mapRef.current);

      const popupHtml = `
        <div style="text-align:center;">
          <b>${loc.name}</b>
          <img src="http://openweathermap.org/images/flags/${loc.country?.toLowerCase()}.png"
               style="width:20px; margin-left:5px;" />
          <br/>
          <a href="/city/${loc.id}?name=${encodeURIComponent(loc.name)}&country=${loc.country}">
            Details
          </a>
        </div>
      `;
      marker.bindPopup(popupHtml);
    });
    
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, 300);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div
      id="mapid"
      style={{
        width: '100%',
        height: '400px',
        marginTop: '10px',
        border: '1px solid #ccc',
      }}
    />
  );
}