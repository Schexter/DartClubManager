// DartClub Manager - Dashboard Screen (Landing Page Design)
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Tab = 'home' | 'teams' | 'matches' | 'calendar' | 'settings'

// Icon Components (inline SVGs wie auf der Landing Page)
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const TrophyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LogOutIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const FireIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
  </svg>
)

const ArrowTrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
)

export default function DashboardScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    // TODO: Logout-Logik
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Modern Header mit Gradient */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Club Name mit Gradient */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="text-4xl">🎯</div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  DartClub Manager
                </h1>
                <p className="text-sm text-gray-600 font-medium">Falcons Dartclub</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-primary transition-colors relative"
                  title="Benachrichtigungen"
                >
                  <BellIcon />
                  {/* Badge für neue Benachrichtigungen */}
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 animate-scale-in">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900">Benachrichtigungen</h3>
                    </div>
                    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                      <NotificationItem
                        icon="🎯"
                        title="Neues Match heute Abend"
                        description="Falcons vs Eagles, 19:00 Uhr"
                        time="vor 2 Stunden"
                      />
                      <NotificationItem
                        icon="👥"
                        title="Neue Mitgliederanfrage"
                        description="Max Mustermann möchte beitreten"
                        time="vor 5 Stunden"
                      />
                      <NotificationItem
                        icon="📅"
                        title="Training verschoben"
                        description="Mittwoch-Training auf 20:00 Uhr"
                        time="gestern"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-secondary transition-all duration-200 hover:scale-110"
                title="Abmelden"
              >
                <LogOutIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <div className="animate-fade-in-up">
          {activeTab === 'home' && <HomeContent navigate={navigate} />}
          {activeTab === 'teams' && <TeamsContent />}
          {activeTab === 'matches' && <MatchesContent />}
          {activeTab === 'calendar' && <CalendarContent />}
          {activeTab === 'settings' && <SettingsContent />}
        </div>
      </main>

      {/* Modern Bottom Navigation mit Gradient */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <NavButton
              icon={<HomeIcon />}
              label="Home"
              active={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
            />
            <NavButton
              icon={<UsersIcon />}
              label="Teams"
              active={activeTab === 'teams'}
              onClick={() => setActiveTab('teams')}
            />
            <NavButton
              icon={<TrophyIcon />}
              label="Matches"
              active={activeTab === 'matches'}
              onClick={() => setActiveTab('matches')}
            />
            <NavButton
              icon={<CalendarIcon />}
              label="Kalender"
              active={activeTab === 'calendar'}
              onClick={() => setActiveTab('calendar')}
            />
            <NavButton
              icon={<SettingsIcon />}
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

// Navigation Button Component mit modernem Design
function NavButton({ icon, label, active, onClick }: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-3 px-4 transition-all duration-200 relative ${
        active
          ? 'text-primary scale-110'
          : 'text-gray-500 hover:text-gray-700 hover:scale-105'
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      )}
      
      <div className={active ? 'animate-scale-in' : ''}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

// Notification Item Component
function NotificationItem({ icon, title, description, time }: {
  icon: string
  title: string
  description: string
  time: string
}) {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <p className="font-medium text-gray-900 text-sm">{title}</p>
        <p className="text-gray-600 text-xs mt-1">{description}</p>
        <p className="text-gray-400 text-xs mt-1">{time}</p>
      </div>
    </div>
  )
}

// Home Content mit Landing Page Design
function HomeContent({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner mit Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-gray-900 rounded-2xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Willkommen zurück! 🎯</h2>
          <p className="text-white/90 text-lg">Bereit für das nächste Match?</p>
        </div>
      </div>

      {/* Quick Stats mit modernem Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ModernStatCard
          icon={<FireIcon />}
          title="Nächstes Match"
          value="Heute, 19:00"
          subtitle="vs. Eagles"
          gradient="from-red-500 to-orange-500"
          badge="LIVE"
        />
        <ModernStatCard
          icon={<UsersIcon />}
          title="Aktive Spieler"
          value="24"
          subtitle="Mitglieder"
          gradient="from-blue-500 to-cyan-500"
        />
        <ModernStatCard
          icon={<ArrowTrendingUpIcon />}
          title="Diese Saison"
          value="12 - 3"
          subtitle="Siege - Niederlagen"
          gradient="from-green-500 to-emerald-500"
        />
      </div>

      {/* Quick Actions mit modernem Design */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">⚡</span>
          Schnellaktionen
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            onClick={() => navigate('/matches')}
            gradient="from-primary to-primary-dark"
            icon="🎯"
            label="Neues Match"
          />
          <ActionButton
            gradient="from-secondary to-orange-600"
            icon="🏋️"
            label="Training planen"
          />
          <ActionButton
            gradient="from-purple-500 to-pink-500"
            icon="👤"
            label="Spieler hinzufügen"
          />
          <ActionButton
            gradient="from-cyan-500 to-blue-500"
            icon="📊"
            label="Statistiken"
          />
        </div>
      </div>

      {/* Recent Matches mit modernem Design */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🏆</span>
          Letzte Matches
        </h3>
        <div className="space-y-3">
          <ModernMatchItem
            home="Falcons"
            away="Eagles"
            score="5 : 3"
            date="26.09.2025"
            won={true}
          />
          <ModernMatchItem
            home="Hawks"
            away="Falcons"
            score="4 : 5"
            date="19.09.2025"
            won={true}
          />
          <ModernMatchItem
            home="Falcons"
            away="Panthers"
            score="3 : 5"
            date="12.09.2025"
            won={false}
          />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📅</span>
          Nächste Termine
        </h3>
        <div className="space-y-3">
          <EventItem
            title="Training Kreisliga"
            date="Mittwoch, 02.10.2025"
            time="19:00 - 21:00 Uhr"
            location="Vereinsheim"
          />
          <EventItem
            title="Auswärtsspiel vs Hawks"
            date="Samstag, 05.10.2025"
            time="18:00 Uhr"
            location="Hawks Clubhouse"
          />
        </div>
      </div>
    </div>
  )
}

// Modern Stat Card Component
function ModernStatCard({ icon, title, value, subtitle, gradient, badge }: {
  icon: React.ReactNode
  title: string
  value: string
  subtitle: string
  gradient: string
  badge?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <div className="absolute top-0 right-0 -mr-4 -mt-4 text-white/10 transform scale-150">
        {icon}
      </div>
      
      {badge && (
        <div className="absolute top-3 right-3">
          <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            {badge}
          </span>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="mb-2 opacity-90">
          {icon}
        </div>
        <p className="text-sm opacity-90 mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </div>
  )
}

// Action Button Component
function ActionButton({ onClick, gradient, icon, label }: {
  onClick?: () => void
  gradient: string
  icon: string
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${gradient} text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2`}
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

// Modern Match Item Component
function ModernMatchItem({ home, away, score, date, won }: {
  home: string
  away: string
  score: string
  date: string
  won: boolean
}) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer">
      {/* Win/Loss Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${won ? 'bg-green-500' : 'bg-red-500'}`}></div>
      
      <div className="flex items-center justify-between pl-3">
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
            {home} vs {away}
          </p>
          <p className="text-sm text-gray-500 mt-1">📅 {date}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-2xl text-gray-900 mb-1">{score}</p>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            won 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
          }`}>
            {won ? '✓ Gewonnen' : '✗ Verloren'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Event Item Component
function EventItem({ title, date, time, location }: {
  title: string
  date: string
  time: string
  location: string
}) {
  return (
    <div className="bg-white rounded-lg p-4 border border-amber-200 hover:border-amber-400 transition-colors cursor-pointer">
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      <div className="text-sm text-gray-600 space-y-1">
        <p>📅 {date}</p>
        <p>🕐 {time}</p>
        <p>📍 {location}</p>
      </div>
    </div>
  )
}

// Placeholder Content Components mit modernem Design
function TeamsContent() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        Teams
      </h2>
      <p className="text-gray-600 text-lg">Teams-Verwaltung kommt hier hin...</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-bold text-xl mb-2">⚡ Kreisliga Team</h3>
          <p className="text-gray-600">8 Spieler</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-xl mb-2">🌟 Bezirksliga Team</h3>
          <p className="text-gray-600">12 Spieler</p>
        </div>
      </div>
    </div>
  )
}

function MatchesContent() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        Matches
      </h2>
      <p className="text-gray-600 text-lg">Match-Verwaltung kommt hier hin...</p>
    </div>
  )
}

function CalendarContent() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        Kalender
      </h2>
      <p className="text-gray-600 text-lg">Terminverwaltung kommt hier hin...</p>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        Einstellungen
      </h2>
      <p className="text-gray-600 text-lg">Einstellungen kommen hier hin...</p>
    </div>
  )
}
