# 📌 Weather Search App (Next.js Edition)

A **Next.js** web application to search and display real-time weather information using the OpenWeatherMap API. Features local weather detection, search by city or ID, caching of visited cities, and a React-Bootstrap UI.

---

## 🌟 Features

- **Auto-detect Local Weather** on app start (geolocation)
- **Search by City Name** or numeric **City ID** (3 results per page)
- Detailed weather info (temp, humidity, sunrise/sunset, etc.)
- **Visited Cities** are cached to reduce API calls
- **Unit Toggle**: Celsius or Fahrenheit
- **Dark/Light Mode** toggle
- **Map Integration** with Leaflet (optional extra)
- **React-Bootstrap** for responsive layout

---

## 🛠 Technologies & Frameworks

- **Next.js** - Framework for React apps with file-based routing
- **React** (18+) - UI library
- **React-Bootstrap** - Prebuilt responsive UI components
- **Leaflet.js** - Interactive map for locations (optional)
- **OpenWeatherMap API** - Real-time weather data
- **Geolocation API** - Get user’s current location
- **Session Storage** / **Context** - Cache visited cities, minimize API calls

---

## 📌 How It Works

### 🏠 Home Page (Auto Local Weather)
- Uses **Geolocation** to detect user location at startup
- Fetches & displays weather immediately

### 🔍 Search (City Name or ID)
- Enter a plain city name (e.g. "Toronto") or numeric ID (e.g. "6167865")
- Shows **3 results per page** with Next/Prev pagination
- If city not found, displays an **error message** below the search box

### 🌆 Detail View
- Clicking **“Details”** on a city opens a dedicated route (`/city/[id]`)
- Displays extended info: temperature, humidity, sunrise/sunset, wind speed
- **Caches** the city in a global visited list to avoid repeated API calls

### 🏷 Visited Cities
- A separate **Visited** page or link in the navbar
- Lists all cities you previously viewed
- If you re-open a visited city, data is loaded from **cache** instead of a new fetch

### 🌗 Unit & Theme Toggle
- **Dropdown** for Celsius/Fahrenheit
- **Switch** for day/night theme

### 🗺 (Optional) Map
- The search results can be displayed as markers on a **Leaflet** map
- Clicking a marker links to that city’s detail

---

## 🚀 Live Demo

- **[Netlify Deployment](https://weatherapplication02.netlify.app/)**

---
