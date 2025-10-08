/**
 * MatchFormScreen.tsx - Match erstellen/bearbeiten
 * 
 * Features:
 * - Neues Match anlegen
 * - Match bearbeiten
 * - Teams oder Gastspieler auswählen
 * - Match-Parameter konfigurieren
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createMatch, fetchMatchById, clearCurrentMatch } from './matchesSlice';
import { fetchTeams } from '../teams/teamsSlice';

type OpponentType = 'team' | 'guest';

export function MatchFormScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentMatch, isLoading } = useAppSelector(state => state.matches);
  const { teams } = useAppSelector(state => state.teams);

  const [opponentType, setOpponentType] = useState<OpponentType>('team');
  const [formData, setFormData] = useState({
    matchDate: '',
    venue: '',
    league: '',
    matchType: 'LEAGUE',
    homeTeamId: '',
    awayTeamId: '',
    awayPlayerName: '',
    bestOfSets: 3,
    bestOfLegs: 5,
    startingScore: 501,
    doubleOut: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Teams laden beim Mount
  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMatchById(id));
    }
    return () => {
      dispatch(clearCurrentMatch());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (currentMatch && id) {
      setFormData({
        matchDate: currentMatch.matchDate.slice(0, 16), // Format für datetime-local
        venue: currentMatch.venue || '',
        league: currentMatch.league || '',
        matchType: currentMatch.matchType,
        homeTeamId: currentMatch.homeTeamId || '',
        awayTeamId: currentMatch.awayTeamId || '',
        awayPlayerName: currentMatch.awayPlayerName || '',
        bestOfSets: currentMatch.bestOfSets,
        bestOfLegs: currentMatch.bestOfLegs,
        startingScore: currentMatch.startingScore,
        doubleOut: currentMatch.doubleOut,
      });
      
      // Opponent-Typ ermitteln
      if (currentMatch.awayPlayerName) {
        setOpponentType('guest');
      } else {
        setOpponentType('team');
      }
    }
  }, [currentMatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) : value
    }));
  };

  const handleOpponentTypeChange = (type: OpponentType) => {
    setOpponentType(type);
    // Reset opponent fields
    setFormData(prev => ({
      ...prev,
      awayTeamId: '',
      awayPlayerName: '',
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.matchDate) {
      newErrors.matchDate = 'Datum & Uhrzeit sind erforderlich';
    }

    if (opponentType === 'guest' && !formData.awayPlayerName.trim()) {
      newErrors.awayPlayerName = 'Name des Gastspielers ist erforderlich';
    }

    if (formData.bestOfSets < 1) {
      newErrors.bestOfSets = 'Mindestens 1 Set erforderlich';
    }

    if (formData.bestOfLegs < 1) {
      newErrors.bestOfLegs = 'Mindestens 1 Leg erforderlich';
    }

    if (formData.startingScore < 101) {
      newErrors.startingScore = 'Mindestens 101 Punkte erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Prepare data for backend
      const matchData: any = {
        matchDate: new Date(formData.matchDate).toISOString(),
        venue: formData.venue || null,
        league: formData.league || null,
        matchType: formData.matchType,
        bestOfSets: formData.bestOfSets,
        bestOfLegs: formData.bestOfLegs,
        startingScore: formData.startingScore,
        doubleOut: formData.doubleOut,
      };

      // Heim-Team (immer eigenes Team)
      if (formData.homeTeamId) {
        matchData.homeTeamId = formData.homeTeamId;
      }

      // Gegner: Team ODER Gastspieler
      if (opponentType === 'team' && formData.awayTeamId) {
        matchData.awayTeamId = formData.awayTeamId;
      } else if (opponentType === 'guest' && formData.awayPlayerName.trim()) {
        matchData.awayPlayerName = formData.awayPlayerName.trim();
      }

      await dispatch(createMatch(matchData)).unwrap();
      navigate('/matches');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {id ? 'Match bearbeiten' : 'Neues Match'}
            </h1>
            <button
              onClick={() => navigate('/matches')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          {/* Datum & Uhrzeit */}
          <div>
            <label htmlFor="matchDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Datum & Uhrzeit *
            </label>
            <input
              type="datetime-local"
              id="matchDate"
              name="matchDate"
              value={formData.matchDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.matchDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.matchDate}</p>
            )}
          </div>

          {/* Heim-Team */}
          <div>
            <label htmlFor="homeTeamId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Heim-Team
            </label>
            <select
              id="homeTeamId"
              name="homeTeamId"
              value={formData.homeTeamId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Kein Team --</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>

          {/* Gegner-Typ Auswahl */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Gegner-Typ
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleOpponentTypeChange('team')}
                className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors ${
                  opponentType === 'team'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🏠 Vereinsinternes Team
              </button>
              <button
                type="button"
                onClick={() => handleOpponentTypeChange('guest')}
                className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors ${
                  opponentType === 'guest'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                👤 Gastspieler
              </button>
            </div>
          </div>

          {/* Gegner-Details (je nach Typ) */}
          {opponentType === 'team' && (
            <div>
              <label htmlFor="awayTeamId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auswärts-Team
              </label>
              <select
                id="awayTeamId"
                name="awayTeamId"
                value={formData.awayTeamId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">-- Kein Team --</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          )}

          {opponentType === 'guest' && (
            <div>
              <label htmlFor="awayPlayerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name des Gastspielers *
              </label>
              <input
                type="text"
                id="awayPlayerName"
                name="awayPlayerName"
                value={formData.awayPlayerName}
                onChange={handleChange}
                placeholder="z.B. Max Mustermann"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.awayPlayerName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.awayPlayerName}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Trage den Namen eines Spielers ein, gegen den du spielst (z.B. von einem anderen Verein oder Freund)
              </p>
            </div>
          )}

          {/* Spielort & Liga */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spielort
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="z.B. Vereinsheim"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="league" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Liga / Wettbewerb
              </label>
              <input
                type="text"
                id="league"
                name="league"
                value={formData.league}
                onChange={handleChange}
                placeholder="z.B. Kreisliga A"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Match-Typ */}
          <div>
            <label htmlFor="matchType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Match-Typ
            </label>
            <select
              id="matchType"
              name="matchType"
              value={formData.matchType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="LEAGUE">Ligaspiel</option>
              <option value="FRIENDLY">Freundschaftsspiel</option>
              <option value="CUP">Pokalspiel</option>
              <option value="PRACTICE">Training</option>
              <option value="TOURNAMENT">Turnier</option>
            </select>
          </div>

          {/* Match-Parameter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="bestOfSets" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Best of Sets
              </label>
              <input
                type="number"
                id="bestOfSets"
                name="bestOfSets"
                value={formData.bestOfSets}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.bestOfSets && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bestOfSets}</p>
              )}
            </div>

            <div>
              <label htmlFor="bestOfLegs" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Best of Legs
              </label>
              <input
                type="number"
                id="bestOfLegs"
                name="bestOfLegs"
                value={formData.bestOfLegs}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {errors.bestOfLegs && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bestOfLegs}</p>
              )}
            </div>

            <div>
              <label htmlFor="startingScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Startpunkte
              </label>
              <select
                id="startingScore"
                name="startingScore"
                value={formData.startingScore}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="301">301</option>
                <option value="501">501</option>
                <option value="701">701</option>
              </select>
            </div>
          </div>

          {/* Double-Out */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="doubleOut"
              name="doubleOut"
              checked={formData.doubleOut}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="doubleOut" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Double-Out (Checkout mit Double erforderlich)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/matches')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md font-medium transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Speichert...' : id ? 'Änderungen speichern' : 'Match erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
