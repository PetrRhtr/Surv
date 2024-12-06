import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Dein Haupt-App-Komponentenpfad
import './index.css'; // Optional: Falls du CSS nutzt

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
