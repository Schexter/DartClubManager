import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './features/landing/LandingPage';
import LoginScreen from './features/auth/LoginScreen';
import RegisterScreen from './features/auth/RegisterScreen';
import DashboardWrapper from './features/dashboard/DashboardWrapper';
import CreateOrganizationScreen from './features/organization/CreateOrganizationScreen';
import JoinOrganizationScreen from './features/organization/JoinOrganizationScreen';
import { MemberListScreen, MemberFormScreen, MemberDetailScreen } from './features/members';
import { CreateMemberScreen } from './features/members/CreateMemberScreen';
import { TeamListScreen } from './features/teams/TeamListScreen';
import MatchListScreen from './features/matches/MatchListScreen';
import LiveScoringScreen from './features/matches/LiveScoringScreen';
import { EventListScreen } from './features/events/EventListScreen';
import { FeeListScreen } from './features/fees/FeeListScreen';
import { StatisticsScreen } from './features/statistics/StatisticsScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import ImpressumScreen from './features/legal/ImpressumScreen';
import DatenschutzScreen from './features/legal/DatenschutzScreen';
import AgbScreen from './features/legal/AgbScreen';
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
              <DashboardWrapper />
            </ProtectedRoute>
          }
        />

        {/* Organization */}
        <Route
          path="/organization/create"
          element={
            <ProtectedRoute>
              <CreateOrganizationScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization/join"
          element={
            <ProtectedRoute>
              <JoinOrganizationScreen />
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
              <CreateMemberScreen />
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

        {/* Fees */}
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <FeeListScreen />
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

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />

        {/* Legal Pages - Public Routes */}
        <Route path="/impressum" element={<ImpressumScreen />} />
        <Route path="/datenschutz" element={<DatenschutzScreen />} />
        <Route path="/agb" element={<AgbScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Erstellt von Hans Hahn - Alle Rechte vorbehalten
