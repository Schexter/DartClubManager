// DartClub Manager - Live Scoring Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Check, X } from 'lucide-react'

interface Player {
  id: string
  name: string
  remainingScore: number
  lastThrow?: string
  average: number
}

export default function LiveScoringScreen() {
  const { matchId } = useParams()
  const navigate = useNavigate()

  // State
  const [currentPlayer, setCurrentPlayer] = useState<'home' | 'away'>('home')
  const [currentThrow, setCurrentThrow] = useState<string[]>([])
  const [homePlayer] = useState<Player>({
    id: '1',
    name: 'Hans Hahn',
    remainingScore: 301,
    average: 89.34,
  })
  const [awayPlayer] = useState<Player>({
    id: '2',
    name: 'Peter Müller',
    remainingScore: 257,
    average: 82.15,
  })
  const [homeScore, setHomeScore] = useState(2)
  const [awayScore, setAwayScore] = useState(1)

  // Dart Buttons
  const dartOptions = [
    { label: 'T20', value: 60 },
    { label: 'T19', value: 57 },
    { label: 'T18', value: 54 },
    { label: 'D20', value: 40 },
    { label: 'D19', value: 38 },
    { label: 'D18', value: 36 },
    { label: '20', value: 20 },
    { label: '19', value: 19 },
    { label: '18', value: 18 },
    { label: '17', value: 17 },
    { label: '16', value: 16 },
    { label: '15', value: 15 },
    { label: 'Bull', value: 25 },
    { label: 'D-Bull', value: 50 },
    { label: '0', value: 0 },
  ]

  const addDart = (dart: string) => {
    if (currentThrow.length < 3) {
      setCurrentThrow([...currentThrow, dart])
    }
  }

  const clearThrow = () => {
    setCurrentThrow([])
  }

  const submitThrow = () => {
    if (currentThrow.length === 3) {
      // TODO: API Call to submit throw
      console.log('Submit throw:', currentThrow)
      setCurrentThrow([])
      // Switch player
      setCurrentPlayer(currentPlayer === 'home' ? 'away' : 'home')
    }
  }

  const markBust = () => {
    // TODO: Mark as bust
    console.log('Bust!')
    setCurrentThrow([])
    setCurrentPlayer(currentPlayer === 'home' ? 'away' : 'home')
  }

  const currentPlayerData = currentPlayer === 'home' ? homePlayer : awayPlayer

  return (
    <div className="min-h-screen bg-neutral-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <button
            onClick={() => navigate('/matches')}
            className="p-2 hover:bg-primary-dark rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Live Scoring</h1>
            <p className="text-sm text-primary-light">Set 1, Leg 3</p>
          </div>
        </div>
      </header>

      {/* Score Board */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6">
          <div className="text-center">
            <p className="text-sm opacity-90">🏠 Falcons</p>
            <p className="text-5xl font-bold">{homeScore}</p>
          </div>
          <div className="text-3xl font-bold">:</div>
          <div className="text-center">
            <p className="text-5xl font-bold">{awayScore}</p>
            <p className="text-sm opacity-90">Eagles ✈️</p>
          </div>
        </div>
      </div>

      {/* Current Player Info */}
      <div className={`p-4 ${currentPlayer === 'home' ? 'bg-blue-50' : 'bg-orange-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktueller Spieler</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentPlayer === 'home' ? '🏠' : '✈️'} {currentPlayerData.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Restpunkte</p>
              <p className="text-4xl font-bold text-primary">
                {currentPlayerData.remainingScore}
              </p>
            </div>
          </div>
          {currentPlayerData.lastThrow && (
            <p className="text-sm text-gray-600 mt-2">
              Letzter Wurf: {currentPlayerData.lastThrow}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        {/* Current Throw Display */}
        <div className="card mb-6">
          <p className="text-sm text-gray-600 mb-2">Aktueller Wurf</p>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2 flex-1">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="flex-1 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold"
                >
                  {currentThrow[index] || '-'}
                </div>
              ))}
            </div>
            <button
              onClick={clearThrow}
              className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>

        {/* Dart Input Pad */}
        <div className="card mb-6">
          <p className="text-sm text-gray-600 mb-3">Wurf eingeben</p>
          <div className="grid grid-cols-5 gap-2">
            {dartOptions.map((dart) => (
              <button
                key={dart.label}
                onClick={() => addDart(dart.label)}
                disabled={currentThrow.length >= 3}
                className="py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dart.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={markBust}
            className="py-4 bg-status-error text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <X size={24} />
            <span>BUST</span>
          </button>
          <button
            onClick={submitThrow}
            disabled={currentThrow.length !== 3}
            className="py-4 bg-status-success text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Check size={24} />
            <span>WURF BESTÄTIGEN</span>
          </button>
        </div>

        {/* Player Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <PlayerStatsCard
            player={homePlayer}
            isActive={currentPlayer === 'home'}
            team="🏠"
          />
          <PlayerStatsCard
            player={awayPlayer}
            isActive={currentPlayer === 'away'}
            team="✈️"
          />
        </div>
      </main>
    </div>
  )
}

// Player Stats Card
function PlayerStatsCard({ player, isActive, team }: {
  player: Player
  isActive: boolean
  team: string
}) {
  return (
    <div className={`card ${isActive ? 'border-2 border-primary' : ''}`}>
      <p className="text-sm text-gray-600 mb-1">{team} {player.name}</p>
      <p className="text-3xl font-bold text-gray-900 mb-2">
        {player.remainingScore}
      </p>
      <p className="text-sm text-gray-600">
        Ø {player.average.toFixed(2)}
      </p>
    </div>
  )
}
