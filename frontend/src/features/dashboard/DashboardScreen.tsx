// DartClub Manager - Dashboard Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Users, Trophy, Calendar, Settings, LogOut } from 'lucide-react'

type Tab = 'home' | 'teams' | 'matches' | 'calendar' | 'settings'

export default function DashboardScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const handleLogout = () => {
    // TODO: Logout-Logik
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DartClub Manager</h1>
              <p className="text-sm text-gray-500">Falcons Dartclub</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-status-error transition-colors"
            title="Abmelden"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'home' && <HomeContent navigate={navigate} />}
        {activeTab === 'teams' && <TeamsContent />}
        {activeTab === 'matches' && <MatchesContent />}
        {activeTab === 'calendar' && <CalendarContent />}
        {activeTab === 'settings' && <SettingsContent />}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <NavButton
              icon={<Home size={24} />}
              label="Home"
              active={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
            />
            <NavButton
              icon={<Users size={24} />}
              label="Teams"
              active={activeTab === 'teams'}
              onClick={() => setActiveTab('teams')}
            />
            <NavButton
              icon={<Trophy size={24} />}
              label="Matches"
              active={activeTab === 'matches'}
              onClick={() => setActiveTab('matches')}
            />
            <NavButton
              icon={<Calendar size={24} />}
              label="Kalender"
              active={activeTab === 'calendar'}
              onClick={() => setActiveTab('calendar')}
            />
            <NavButton
              icon={<Settings size={24} />}
              label="Einstellungen"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

// Navigation Button Component
function NavButton({ icon, label, active, onClick }: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-3 px-4 transition-colors ${
        active
          ? 'text-primary'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

// Home Content
function HomeContent({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Übersicht</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Nächstes Match"
          value="Heute, 19:00"
          subtitle="vs. Eagles"
          color="bg-primary"
        />
        <StatCard
          title="Aktive Spieler"
          value="24"
          subtitle="Mitglieder"
          color="bg-secondary"
        />
        <StatCard
          title="Diese Saison"
          value="12 - 3"
          subtitle="Siege - Niederlagen"
          color="bg-status-success"
        />
      </div>

      {/* Quick Actions */}
      <div className="card space-y-4">
        <h3 className="text-lg font-semibold">Schnellaktionen</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/matches')}
            className="btn-primary py-4"
          >
            Neues Match
          </button>
          <button className="btn-secondary py-4">
            Training planen
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-4 px-4 rounded transition-colors">
            Spieler hinzufügen
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-4 px-4 rounded transition-colors">
            Statistiken
          </button>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Letzte Matches</h3>
        <div className="space-y-3">
          <MatchItem
            home="Falcons"
            away="Eagles"
            score="5 : 3"
            date="26.09.2025"
            won={true}
          />
          <MatchItem
            home="Hawks"
            away="Falcons"
            score="4 : 5"
            date="19.09.2025"
            won={true}
          />
          <MatchItem
            home="Falcons"
            away="Panthers"
            score="3 : 5"
            date="12.09.2025"
            won={false}
          />
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, subtitle, color }: {
  title: string
  value: string
  subtitle: string
  color: string
}) {
  return (
    <div className={`${color} text-white rounded-lg p-4 shadow-md`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold my-1">{value}</p>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  )
}

// Match Item Component
function MatchItem({ home, away, score, date, won }: {
  home: string
  away: string
  score: string
  date: string
  won: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{home} vs {away}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{score}</p>
        <span className={`text-xs px-2 py-1 rounded ${
          won ? 'bg-status-success text-white' : 'bg-gray-300 text-gray-700'
        }`}>
          {won ? 'Gewonnen' : 'Verloren'}
        </span>
      </div>
    </div>
  )
}

// Placeholder Content Components
function TeamsContent() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Teams</h2>
      <p className="text-gray-600">Teams-Verwaltung kommt hier hin...</p>
    </div>
  )
}

function MatchesContent() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Matches</h2>
      <p className="text-gray-600">Match-Verwaltung kommt hier hin...</p>
    </div>
  )
}

function CalendarContent() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Kalender</h2>
      <p className="text-gray-600">Terminverwaltung kommt hier hin...</p>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Einstellungen</h2>
      <p className="text-gray-600">Einstellungen kommen hier hin...</p>
    </div>
  )
}
