// React utilities
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// Page components
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import LanguageSelector from './components/LanguageSelector';
// Internationalization
import { FormattedMessage } from 'react-intl';

import './app.css';
function App() {
  return (
    <>
      <LanguageSelector  />
      <FormattedMessage id="greeting" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </>

  )
}

export default App;
