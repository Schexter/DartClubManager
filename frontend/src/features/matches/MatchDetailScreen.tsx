/**
 * MatchDetailScreen.tsx - Match-Details anzeigen
 * 
 * Features:
 * - Match-Informationen anzeigen
 * - Teams & Aufstellungen
 * - Match starten Button
 * - Navigation zu Live-Scoring
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMatchById, startMatch, clearCurrentMatch } from './matchesSlice';

export function MatchDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentMatch, isLoading, error } = useAppSelector(state => state.matches);

  useEffect(() => {
    if (id) {
      dispatch(fetchMatchById(id));
    }
    return () => {
      dispatch(clearCurrentMatch());
    };
  }, [id, dispatch]);

  const handleStartMatch = async () => {
    if (!id) return;
    
    try {
      await dispatch(startMatch(id)).unwrap();
      navigate(`/matches/${id}/scoring`);
    } catch (error) {
      console.error('Fehler beim Starten des Matches:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !currentMatch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-800 dark:text-red-200">
            {error || 'Match nicht gefunden'}
          </p>
          <button
            onClick={() => navigate('/matches')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/matches')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ← Zurück
            </button>
            {currentMatch.status === 'SCHEDULED' && (
              <button
                onClick={handleStartMatch}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Match starten
              </button>
            )}
            {currentMatch.status === 'LIVE' && (
              <button
                onClick={() => navigate(`/matches/${id}/scoring`)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors animate-pulse"
              >
                Zum Live-Scoring
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          {/* Status Badge */}
          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentMatch.status === 'SCHEDULED'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : currentMatch.status === 'LIVE'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}
            >
              {currentMatch.status === 'SCHEDULED'
                ? 'Geplant'
                : currentMatch.status === 'LIVE'
                ? '🔴 LIVE'
                : 'Beendet'}
            </span>
          </div>

          {/* Teams */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentMatch.homeTeamId ? `Team ${currentMatch.homeTeamId}` : 'Heim'}
              {' vs. '}
              {currentMatch.awayTeamId ? `Team ${currentMatch.awayTeamId}` : 'Auswärts'}
            </h1>
            {currentMatch.status !== 'SCHEDULED' && (
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                {currentMatch.homeSets} : {currentMatch.awaySets}
              </div>
            )}
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Datum & Uhrzeit
              </h3>
              <p className="text-gray-900 dark:text-white">
                {formatDate(currentMatch.matchDate)}
              </p>
            </div>

            {currentMatch.venue && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Spielort
                </h3>
                <p className="text-gray-900 dark:text-white">{currentMatch.venue}</p>
              </div>
            )}

            {currentMatch.league && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Liga / Wettbewerb
                </h3>
                <p className="text-gray-900 dark:text-white">{currentMatch.league}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Match-Typ
              </h3>
              <p className="text-gray-900 dark:text-white">
                {currentMatch.matchType === 'league' ? 'Ligaspiel' : 'Freundschaftsspiel'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Modus
              </h3>
              <p className="text-gray-900 dark:text-white">
                Best of {currentMatch.bestOfSets} Sets (Best of {currentMatch.bestOfLegs} Legs)
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Startpunkte
              </h3>
              <p className="text-gray-900 dark:text-white">
                {currentMatch.startingScore} {currentMatch.doubleOut && '(Double-Out)'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/matches/${id}/edit`)}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md font-medium transition-colors"
          >
            Bearbeiten
          </button>
          {currentMatch.status === 'SCHEDULED' && (
            <button
              onClick={handleStartMatch}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium transition-colors"
            >
              Match jetzt starten
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
