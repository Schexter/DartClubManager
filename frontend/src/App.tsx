import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './features/landing/LandingPage';
import LoginScreen from './features/auth/LoginScreen';
import RegisterScreen from './features/auth/RegisterScreen';
import DashboardScreen from './features/dashboard/DashboardScreen';
import { MemberListScreen, MemberFormScreen, MemberDetailScreen } from './features/members';
import { TeamListScreen } from './features/teams/TeamListScreen';
import { MatchListScreen } from './features/matches/MatchListScreen';
import LiveScoringScreen from './features/matches/LiveScoringScreen';
import { EventListScreen } from './features/events/EventListScreen';
import { StatisticsScreen } from './features/statistics/StatisticsScreen';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Members */}
        <Route 
          path="/members" 
          element={
            <ProtectedRoute>
              <MemberListScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/members/new" 
          element={
            <ProtectedRoute>
              <MemberFormScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/members/:id" 
          element={
            <ProtectedRoute>
              <MemberDetailScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/members/:id/edit" 
          element={
            <ProtectedRoute>
              <MemberFormScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Teams */}
        <Route 
          path="/teams" 
          element={
            <ProtectedRoute>
              <TeamListScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Matches */}
        <Route 
          path="/matches" 
          element={
            <ProtectedRoute>
              <MatchListScreen />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/matches/:id/scoring" 
          element={
            <ProtectedRoute>
              <LiveScoringScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Events */}
        <Route 
          path="/events" 
          element={
            <ProtectedRoute>
              <EventListScreen />
            </ProtectedRoute>
          } 
        />
        
        {/* Statistics */}
        <Route 
          path="/statistics" 
          element={
            <ProtectedRoute>
              <StatisticsScreen />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Erstellt von Hans Hahn - Alle Rechte vorbehalten
