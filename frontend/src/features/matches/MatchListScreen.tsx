// DartClub Manager - Match List Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Trophy, MapPin } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { apiClient } from '../../lib/api/client';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  league: string;
  status: 'scheduled' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
}

export default function MatchListScreen() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Fehler beim Laden der Matches:', error);
      setMatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMatches = matches.filter((match) => {
    if (filterStatus === 'all') return true;
    return match.status === filterStatus;
  });

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
          <p className="text-gray-600 mt-1">
            {filteredMatches.length} {filteredMatches.length === 1 ? 'Match' : 'Matches'}
          </p>
        </div>
        <button
          onClick={() => navigate('/matches/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Neues Match</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
        <FilterButton 
          label="Alle" 
          active={filterStatus === 'all'} 
          onClick={() => setFilterStatus('all')}
        />
        <FilterButton 
          label="Live" 
          active={filterStatus === 'live'} 
          onClick={() => setFilterStatus('live')}
        />
        <FilterButton 
          label="Geplant" 
          active={filterStatus === 'scheduled'} 
          onClick={() => setFilterStatus('scheduled')}
        />
        <FilterButton 
          label="Beendet" 
          active={filterStatus === 'finished'} 
          onClick={() => setFilterStatus('finished')}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Matches...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMatches.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterStatus === 'all' ? 'Noch keine Matches' : `Keine ${filterStatus === 'live' ? 'Live-' : filterStatus === 'scheduled' ? 'geplanten' : 'beendeten'} Matches`}
          </h3>
          <p className="text-gray-600 mb-4">
            {filterStatus === 'all' 
              ? 'Erstelle dein erstes Match!' 
              : 'Versuche einen anderen Filter'
            }
          </p>
          {filterStatus === 'all' && (
            <button
              onClick={() => navigate('/matches/new')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Match erstellen
            </button>
          )}
        </div>
      )}

      {/* Match List */}
      {!isLoading && filteredMatches.length > 0 && (
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onClick={() => {
                // Live Matches -> Live Scoring
                if (match.status === 'live') {
                  navigate(`/matches/${match.id}/scoring`);
                } else {
                  // Andere Matches -> Detail View
                  navigate(`/matches/${match.id}`);
                }
              }}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

// Filter Button
function FilterButton({ 
  label, 
  active = false,
  onClick 
}: { 
  label: string; 
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

// Match Card Component
function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return (
          <span className="flex items-center space-x-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span>LIVE</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            📅 Geplant
          </span>
        );
      case 'finished':
        return (
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            ✓ Beendet
          </span>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] ${
        match.status === 'live' ? 'border-2 border-red-600' : ''
      }`}
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
          <p className="font-bold text-lg text-gray-900">{match.homeTeam}</p>
          <p className="text-gray-600">{match.awayTeam}</p>
        </div>
        {match.status !== 'scheduled' && (
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">
              {match.homeScore} : {match.awayScore}
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>
            {match.date} • {match.time}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={16} />
          <span>{match.venue}</span>
        </div>
      </div>
    </div>
  );
}
