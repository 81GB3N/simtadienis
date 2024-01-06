// React utilities
import { Routes, Route } from 'react-router-dom';
// Page components
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import Header from './components/Header';

import './app.css';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </>

  )
}

export default App;
