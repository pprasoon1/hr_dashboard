import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PerformancePage from './pages/PerformancePage';
import AttendancePage from './pages/AttendancePage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';
import LandingPage from './pages/LandingPage';
import InsightsPage from './pages/InsightsPage';
import EmojiFeedback from './pages/EmojiFeedback';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path='/insights' element={<InsightsPage />} />
            <Route path="/emoji-feedback" element={<EmojiFeedback />} />
            <Route path="/employees" element={<EmployeeDashboard />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

