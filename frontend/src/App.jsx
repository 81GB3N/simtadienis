import './app.css';
// React utilities
import { Routes, Route } from 'react-router-dom';
// Context provider
import MenuProvider from './components/MenuProvider';
// Pages
import LandingPage from './pages/LandingPage';
import LeaderBoard from './pages/LeaderBoard';
import Admin from './pages/Admin';
// Page components
import Header from './components/Header';
// Error modal
import ErrorModal from './components/ErrorModal';

export default function App() {
  const isMobile = () => {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };


  return (
    <>
      {!isMobile() ? <ErrorModal
        status='Desktop Detected!'
        errorMessage='This website was designed for mobile devices. 
      Proceed at your discretion'
        dismissable={true} /> : null}
      <MenuProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<ErrorModal
            status='404'
            errorMessage='Page not found'
            dismissable={false}
          />} />
        </Routes>
      </MenuProvider>
    </>
  )
}