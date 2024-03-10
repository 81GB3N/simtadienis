import './css/app.css';

import { Routes, Route, Form } from 'react-router-dom';

import UserPage from './pages/UserPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import FormPage from './pages/FormPage';
import ErrorModal from './components/modal/ErrorModal';

import PageProvider from './context/PageProvider';

/**
 * The main component of the application.
 * Renders different pages based on the current route.
 * @param {boolean} formMode - Whether the application is being rendered to only display the event google form.
 * @returns {JSX.Element} The rendered application component.
 */
export default function App({ formMode }) {

  if (formMode) {
    return (
      <FormPage />
    )
  }

  return (
    <Routes>
      <Route path="/" element={
        <PageProvider>
          <UserPage />
        </PageProvider>
      } />
      <Route path="/leaderboard" element={
        <PageProvider>
          <LeaderBoardPage />
        </PageProvider>
      } />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path='/superadmin/*' element={<SuperAdminPage />} />
      <Route path="*" element={<ErrorModal
        status='404'
        errorMessage='Page not found'
      />} />
    </Routes>
  )
}