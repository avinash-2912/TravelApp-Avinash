import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserDashboard } from './pages/UserDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import {TripDetail} from "./pages/TripDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/trips/:id" element={<TripDetail />} /> {/* Add trip detail route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;