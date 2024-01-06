import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Languages from './components/Languages';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Languages>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Languages>
  </React.StrictMode>
);

