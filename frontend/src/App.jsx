// Custom stylesheet
import './css/app.css';
// React utilities
import { Routes, Route } from 'react-router-dom';
// Pages
import UserPage from './pages/UserPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
// Error modal
import ErrorModal from './components/error/ErrorModal';
// User Page Context Provider
import PageProvider from './context/PageProvider';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PageProvider>
          <UserPage />
        </PageProvider>
      } />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path='/superadmin/*' element={<SuperAdminPage /> } />
      <Route path="*" element={<ErrorModal
        status='404'
        errorMessage='Page not found'
        dismissable={true}
      />} />
    </Routes>
  )
}