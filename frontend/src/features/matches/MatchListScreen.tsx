/**
 * MatchListScreen.tsx - Übersicht aller Matches
 * 
 * Features:
 * - Liste aller Matches (kommende + vergangene)
 * - Filter nach Status (SCHEDULED, LIVE, FINISHED)
 * - Navigation zu Match-Details & Live-Scoring
 * - Neues Match erstellen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMatches, clearError, Match } from './matchesSlice';

export function MatchListScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { matches, isLoading, error } = useAppSelector(state => state.matches);
  const [filter, setFilter] = useState<'ALL' | 'SCHEDULED' | 'LIVE' | 'FINISHED'>('ALL');

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const filteredMatches = matches.filter(match => {
    if (filter === 'ALL') return true;
    return match.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'LIVE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse';
      case 'FINISHED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Geplant';
      case 'LIVE':
        return '🔴 LIVE';
      case 'FINISHED':
        return 'Beendet';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading && matches.length === 0) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Matches</h1>
            <button
              onClick={() => navigate('/matches/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              + Neues Match
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
            {(['ALL', 'SCHEDULED', 'LIVE', 'FINISHED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 font-medium transition-colors ${
                  filter === status
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {status === 'ALL' ? 'Alle' : status === 'SCHEDULED' ? 'Geplant' : status === 'LIVE' ? 'Live' : 'Beendet'}
              </button>
            ))}
          </div>
        </div>

        {/* Matches List */}
        {filteredMatches.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Keine Matches gefunden</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                onClick={() => navigate(`/matches/${match.id}`)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Match Info */}
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}
                      >
                        {getStatusLabel(match.status)}
                      </span>
                      {match.league && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          🏆 {match.league}
                        </span>
                      )}
                    </div>

                    {/* Teams/Score */}
                    <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {match.homeTeamId ? `Team ${match.homeTeamId}` : 'Heim'} vs.{' '}
                      {match.awayTeamId ? `Team ${match.awayTeamId}` : 'Auswärts'}
                    </div>

                    {match.status !== 'SCHEDULED' && (
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {match.homeSets} : {match.awaySets}
                      </div>
                    )}

                    {/* Date & Venue */}
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>📅 {formatDate(match.matchDate)}</span>
                      {match.venue && <span>📍 {match.venue}</span>}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {match.status === 'SCHEDULED' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/matches/${match.id}/scoring`);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        Match starten
                      </button>
                    )}
                    {match.status === 'LIVE' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/matches/${match.id}/scoring`);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors animate-pulse"
                      >
                        Live-Scoring
                      </button>
                    )}
                    {match.status === 'FINISHED' && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Abgeschlossen
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
