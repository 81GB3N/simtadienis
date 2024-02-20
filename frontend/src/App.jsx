// Custom stylesheet
import './css/app.css';
// React utilities
import { Routes, Route } from 'react-router-dom';
// Pages
import LandingPage from './pages/LandingPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import Admin from './pages/Admin';
// Error modal
import ErrorModal from './components/ErrorModal';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<ErrorModal
        status='404'
        errorMessage='Page not found'
        dismissable={true}
      />} />
    </Routes>
  )
}