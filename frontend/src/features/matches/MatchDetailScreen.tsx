/**
 * MatchDetailScreen.tsx - Match-Details mit Spielerauswahl
 *
 * Features:
 * - Match-Informationen anzeigen
 * - Spieler vor dem Start auswählen
 * - Mitglieder aus DB oder Gastnamen eingeben
 * - Match starten mit ausgewählten Spielern
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMatchById, clearCurrentMatch } from './matchesSlice';
import { memberService, matchService } from '../../lib/api/services';
import { Member } from '../../lib/api/types';

export function MatchDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentMatch, isLoading, error } = useAppSelector(state => state.matches);

  const [members, setMembers] = useState<Member[]>([]);
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);
  const [selectedHomePlayer, setSelectedHomePlayer] = useState<string>('');
  const [selectedAwayPlayer, setSelectedAwayPlayer] = useState<string>('');
  const [homePlayerName, setHomePlayerName] = useState('');
  const [awayPlayerName, setAwayPlayerName] = useState('');
  const [useGuestHome, setUseGuestHome] = useState(false);
  const [useGuestAway, setUseGuestAway] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMatchById(id));
      loadMembers();
    }
    return () => {
      dispatch(clearCurrentMatch());
    };
  }, [id, dispatch]);

  const loadMembers = async () => {
    try {
      const memberList = await memberService.getAll();
      setMembers(memberList.filter(m => m.status === 'ACTIVE'));
    } catch (err) {
      console.error('Fehler beim Laden der Mitglieder:', err);
    }
  };

  const handleStartMatch = async () => {
    if (!id) return;

    try {
      setStarting(true);

      const requestBody: any = {};

      // Spielerdaten nur aus dem Dialog übernehmen, wenn er auch genutzt wurde
      if (showPlayerSelection) {
        // Heim-Spieler
        if (useGuestHome && homePlayerName.trim()) {
          requestBody.homePlayerName = homePlayerName.trim();
        } else if (selectedHomePlayer) {
          requestBody.homePlayerId = selectedHomePlayer;
        }

        // Auswärts-Spieler
        if (useGuestAway && awayPlayerName.trim()) {
          requestBody.awayPlayerName = awayPlayerName.trim();
        } else if (selectedAwayPlayer) {
          requestBody.awayPlayerId = selectedAwayPlayer;
        }
      }

      // Sende API-Aufruf zum Starten des Matches
      await matchService.start(id, Object.keys(requestBody).length > 0 ? requestBody : undefined);
      
      // Navigiere zum Live-Scoring
      navigate(`/matches/${id}/scoring`);

    } catch (err: any) {
      console.error('Fehler beim Starten:', err);
      alert(err.response?.data?.message || 'Fehler beim Starten des Matches');
    } finally {
      setStarting(false);
      setShowPlayerSelection(false); // Dialog nach dem Start schließen
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
                onClick={handleStartMatch} // KORREKTUR: Direkter Start ohne Spielerauswahl
                disabled={starting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {starting ? 'Startet...' : 'Schnellstart'}
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
              {(currentMatch as any).homeTeam?.name || 'Heim'}
              {' vs. '}
              {(currentMatch as any).awayTeam?.name || 'Auswärts'}
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
                {currentMatch.matchType === 'LEAGUE' ? 'Ligaspiel' :
                 currentMatch.matchType === 'FRIENDLY' ? 'Freundschaftsspiel' :
                 currentMatch.matchType === 'CUP' ? 'Pokalspiel' :
                 currentMatch.matchType === 'PRACTICE' ? 'Training' :
                 currentMatch.matchType === 'TOURNAMENT' ? 'Turnier' : currentMatch.matchType}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Modus
              </h3>
              <p className="text-gray-900 dark:text-white">
                Best of {currentMatch.bestOfSets} Sets | Best of {currentMatch.bestOfLegs} Legs
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
              onClick={() => setShowPlayerSelection(true)} // Dieser Button öffnet jetzt den Dialog
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors"
            >
              Spieler auswählen & Starten
            </button>
          )}
        </div>
      </div>

      {/* Spielerauswahl-Dialog */}
      {showPlayerSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Spieler für das Match festlegen
              </h2>

              {/* Heim-Spieler */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Heim-Spieler
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id="guestHome"
                    checked={useGuestHome}
                    onChange={(e) => setUseGuestHome(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="guestHome" className="text-sm text-gray-600 dark:text-gray-400">
                    Gastname eingeben
                  </label>
                </div>
                {useGuestHome ? (
                  <input
                    type="text"
                    value={homePlayerName}
                    onChange={(e) => setHomePlayerName(e.target.value)}
                    placeholder="z.B. Max Mustermann"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <select
                    value={selectedHomePlayer}
                    onChange={(e) => setSelectedHomePlayer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Mitglied auswählen --</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Auswärts-Spieler */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Auswärts-Spieler
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id="guestAway"
                    checked={useGuestAway}
                    onChange={(e) => setUseGuestAway(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="guestAway" className="text-sm text-gray-600 dark:text-gray-400">
                    Gastname eingeben
                  </label>
                </div>
                {useGuestAway ? (
                  <input
                    type="text"
                    value={awayPlayerName}
                    onChange={(e) => setAwayPlayerName(e.target.value)}
                    placeholder="z.B. Erika Musterfrau"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <select
                    value={selectedAwayPlayer}
                    onChange={(e) => setSelectedAwayPlayer(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Mitglied auswählen --</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Hinweis */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  ℹ️ Falls keine Spieler ausgewählt werden, verwendet das System automatisch verfügbare Spieler aus den Teams oder der Mitgliederliste.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPlayerSelection(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md font-medium transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleStartMatch} // Dieser Button startet das Match mit den ausgewählten Spielern
                  disabled={starting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
                >
                  {starting ? 'Startet...' : 'Bestätigen & Starten'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
