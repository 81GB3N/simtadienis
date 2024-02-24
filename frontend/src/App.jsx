// Custom stylesheet
import './css/app.css';
// React utilities
import { Routes, Route } from 'react-router-dom';
// Pages
import UserPage from './pages/UserPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import AdminPage from './pages/AdminPage';
// Error modal
import ErrorModal from './components/error/ErrorModal';
// User Page Context Provider
import SubPageProvider from './context/SubPageProvider';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <SubPageProvider>
          <UserPage />
        </SubPageProvider>
      } />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="*" element={<ErrorModal
        status='404'
        errorMessage='Page not found'
        dismissable={true}
      />} />
    </Routes>
  )
}