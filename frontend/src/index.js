import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import LanguageProvider from './context/LanguageProvider';

import FormPage from './FormPage';

/**
 * The root element for rendering the React application.
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LanguageProvider>
      <BrowserRouter>
        <FormPage />
      </BrowserRouter>
    </LanguageProvider>
);

