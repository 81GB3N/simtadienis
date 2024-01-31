// Custom stylesheet
import './css/app.css';
// React utilities
import { Routes, Route } from 'react-router-dom';
// Context provider
import MenuProvider from './context/MenuProvider';
// Pages
import LandingPage from './pages/LandingPage';
import LeaderBoard from './pages/LeaderBoard';
import Admin from './pages/Admin';
// Error modal
import ErrorModal from './components/ErrorModal';

export default function App() {
  return (
      <MenuProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderBoard/>} />
          <Route path="/admin/*" element={<Admin/>} />
          <Route path="*" element={<ErrorModal
            status='404'
            errorMessage='Page not found'
            dismissable={true} 
          />} />
        </Routes>
      </MenuProvider>
  )
}