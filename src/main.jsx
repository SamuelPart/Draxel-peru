import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
/* Fuentes del hero KAIRN (Anybody variable con eje de anchura + Inter) */
import '@fontsource-variable/anybody/wdth.css';
import '@fontsource-variable/inter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
