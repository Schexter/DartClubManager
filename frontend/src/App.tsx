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
import { TeamListScreen, TeamFormScreen } from './features/teams';
import MatchListScreen from './features/matches/MatchListScreen';
import { MatchFormScreen } from './features/matches/MatchFormScreen';
import { MatchDetailScreen } from './features/matches/MatchDetailScreen';
import LiveScoringScreen from './features/matches/LiveScoringScreen';
import { EventListScreen } from './features/events/EventListScreen';
import { EventFormScreen } from './features/events/EventFormScreen';
import { EventDetailScreen } from './features/events/EventDetailScreen';
import { FeeListScreen } from './features/fees/FeeListScreen';
import { FeeFormScreen } from './features/fees/FeeFormScreen';
import { FeeAssignmentScreen } from './features/fees/FeeAssignmentScreen';
import { PaymentRecordScreen } from './features/fees/PaymentRecordScreen';
import { MemberFeeDetailScreen } from './features/fees/MemberFeeDetailScreen';
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
        <Route
          path="/teams/new"
          element={
            <ProtectedRoute>
              <TeamFormScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams/:id/edit"
          element={
            <ProtectedRoute>
              <TeamFormScreen />
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
          path="/matches/new"
          element={
            <ProtectedRoute>
              <MatchFormScreen />
            </ProtectedRoute>
          }
        />
        {/* Match Detail - MUSS VOR /matches/:id/edit und /matches/:id/scoring kommen! */}
        <Route
          path="/matches/:id"
          element={
            <ProtectedRoute>
              <MatchDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches/:id/edit"
          element={
            <ProtectedRoute>
              <MatchFormScreen />
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
        <Route
          path="/events/new"
          element={
            <ProtectedRoute>
              <EventFormScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id/edit"
          element={
            <ProtectedRoute>
              <EventFormScreen />
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
        <Route
          path="/fees/create"
          element={
            <ProtectedRoute>
              <FeeFormScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees/:id/edit"
          element={
            <ProtectedRoute>
              <FeeFormScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees/assign"
          element={
            <ProtectedRoute>
              <FeeAssignmentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees/payment"
          element={
            <ProtectedRoute>
              <PaymentRecordScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees/member/:memberId"
          element={
            <ProtectedRoute>
              <MemberFeeDetailScreen />
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
