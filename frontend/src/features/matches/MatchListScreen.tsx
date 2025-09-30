// DartClub Manager - Match List Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useNavigate } from 'react-router-dom'
import { Plus, Calendar, Trophy, MapPin } from 'lucide-react'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  venue: string
  league: string
  status: 'scheduled' | 'live' | 'finished'
  homeScore?: number
  awayScore?: number
}

// Mock Data
const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Falcons',
    awayTeam: 'Eagles',
    date: '29.09.2025',
    time: '19:00',
    venue: 'Vereinsheim Falcons',
    league: 'Kreisliga A',
    status: 'live',
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: '2',
    homeTeam: 'Hawks',
    awayTeam: 'Falcons',
    date: '05.10.2025',
    time: '18:30',
    venue: 'Sportheim Hawks',
    league: 'Kreisliga A',
    status: 'scheduled',
  },
  {
    id: '3',
    homeTeam: 'Falcons',
    awayTeam: 'Panthers',
    date: '26.09.2025',
    time: '19:00',
    venue: 'Vereinsheim Falcons',
    league: 'Kreisliga A',
    status: 'finished',
    homeScore: 5,
    awayScore: 3,
  },
]

export default function MatchListScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-background pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Matches</h1>
            <p className="text-primary-light text-sm">Alle Spiele im Überblick</p>
          </div>
          <button
            onClick={() => alert('Neues Match erstellen')}
            className="bg-white text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus size={24} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <FilterButton label="Alle" active={true} />
          <FilterButton label="Live" />
          <FilterButton label="Geplant" />
          <FilterButton label="Beendet" />
        </div>

        {/* Match List */}
        <div className="space-y-4">
          {mockMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onClick={() => {
                if (match.status === 'live') {
                  navigate(`/matches/${match.id}/scoring`)
                }
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

// Filter Button
function FilterButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )
}

// Match Card Component
function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return <span className="flex items-center space-x-1 bg-status-error text-white text-xs px-2 py-1 rounded-full animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span>LIVE</span>
        </span>
      case 'scheduled':
        return <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">📅 Geplant</span>
      case 'finished':
        return <span className="bg-status-success text-white text-xs px-2 py-1 rounded-full">✓ Beendet</span>
    }
  }

  return (
    <div
      onClick={onClick}
      className={`card hover:shadow-lg transition-shadow ${match.status === 'live' ? 'cursor-pointer border-2 border-status-error' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Trophy size={16} />
          <span className="font-medium">{match.league}</span>
        </div>
        {getStatusBadge()}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <p className="font-bold text-lg">{match.homeTeam}</p>
          <p className="text-gray-600">{match.awayTeam}</p>
        </div>
        {match.status !== 'scheduled' && (
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">
              {match.homeScore} : {match.awayScore}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>{match.date} • {match.time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={16} />
          <span>{match.venue}</span>
        </div>
      </div>
    </div>
  )
}
