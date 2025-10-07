// frontend/src/features/matches/LiveScoringScreenNew.tsx
// Live Scoring mit vollständiger Backend-Integration
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMatchById, selectCurrentMatch, selectMatchesLoading, startMatch as startMatchAction } from "./matchesSlice";
import { matchService } from "../../lib/api/services";
import { ArrowLeft, Save } from "lucide-react";

// Typen für Dart-Eingabe
type Multiplier = 0 | 1 | 2 | 3;
type Segment = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 25;

interface DartInput {
  multiplier: Multiplier;
  segment: Segment;
}

interface CurrentThrow {
  darts: DartInput[];
}

export default function LiveScoringScreenNew() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentMatch = useAppSelector(selectCurrentMatch);
  const isLoading = useAppSelector(selectMatchesLoading);

  // State
  const [currentLegId, setCurrentLegId] = useState<string | null>(null);
  const [currentThrow, setCurrentThrow] = useState<CurrentThrow>({ darts: [] });
  const [playerScores, setPlayerScores] = useState<[number, number]>([301, 301]);
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextMultiplier, setNextMultiplier] = useState<Multiplier | null>(null);

  // Lade Match-Daten beim Mount
  useEffect(() => {
    if (matchId) {
      dispatch(fetchMatchById(matchId));
    }
  }, [matchId, dispatch]);

  // Match starten
  const handleStartMatch = async () => {
    if (!matchId) return;

    try {
      setSaving(true);
      setError(null);

      // Match starten über API → Backend erstellt erstes Set und Leg
      await matchService.start(matchId);

      // Hole aktuelle Leg-ID aus dem Backend
      const response = await fetch(`http://localhost:8080/api/matches/${matchId}/current-leg`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'X-Org-Id': localStorage.getItem('currentOrgId') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Laden des aktuellen Legs');
      }

      const legData = await response.json();
      setCurrentLegId(legData.id);
      setGameStarted(true);
      setPlayerScores([currentMatch?.startingScore || 301, currentMatch?.startingScore || 301]);

    } catch (err: any) {
      setError(err.message || 'Fehler beim Starten des Matches');
    } finally {
      setSaving(false);
    }
  };

  // Dart aufzeichnen
  const recordDart = (multiplier: Multiplier, segment: Segment) => {
    if (currentThrow.darts.length >= 3) {
      setError('Bereits 3 Darts geworfen. Bitte abschließen.');
      return;
    }

    // Wenn ein Multiplier gesetzt ist, nutze diesen
    const finalMultiplier = nextMultiplier !== null ? nextMultiplier : multiplier;
    const newDart: DartInput = { multiplier: finalMultiplier, segment };
    const newDarts = [...currentThrow.darts, newDart];
    setCurrentThrow({ darts: newDarts });
    setNextMultiplier(null); // Zurücksetzen
    setError(null);

    // Automatisch abschließen nach 3 Darts
    if (newDarts.length === 3) {
      setTimeout(() => submitThrow(newDarts), 500);
    }
  };

  // Wurf an Backend senden
  const submitThrow = async (darts: DartInput[]) => {
    if (!matchId || !currentLegId) {
      setError('Match oder Leg nicht geladen');
      return;
    }

    if (darts.length !== 3) {
      setError('Es müssen genau 3 Darts eingegeben werden');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Sende an Backend
      const response = await matchService.submitThrow(matchId, {
        legId: currentLegId,
        darts: darts,
      });

      // Aktualisiere lokalen Score basierend auf Response
      const newScores: [number, number] = [...playerScores];
      newScores[currentPlayer] = response.remainingScore;
      setPlayerScores(newScores);

      // Prüfe auf Leg-Ende
      if (response.legFinished) {
        setError(`🎉 Leg gewonnen von ${currentPlayer === 0 ? currentMatch?.homeTeam?.name : currentMatch?.awayTeam?.name}!`);

        // Neues Leg laden
        setTimeout(async () => {
          try {
            const legResponse = await fetch(`http://localhost:8080/api/matches/${matchId}/current-leg`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-Org-Id': localStorage.getItem('currentOrgId') || '',
              },
            });

            if (legResponse.ok) {
              const legData = await legResponse.json();
              setCurrentLegId(legData.id);
              setPlayerScores([currentMatch?.startingScore || 301, currentMatch?.startingScore || 301]);
              setCurrentPlayer(0);
              setError(null);
            }
          } catch (e) {
            setError('Fehler beim Laden des nächsten Legs');
          }
        }, 2000);
      } else {
        // Setze Wurf zurück
        setCurrentThrow({ darts: [] });

        // Wechsle Spieler
        setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'Fehler beim Speichern des Wurfs');
    } finally {
      setSaving(false);
    }
  };

  // Einzelne Dart-Button-Handler
  const recordSingle = (n: Segment) => recordDart(1, n);
  const recordDouble = (n: Segment) => recordDart(2, n);
  const recordTriple = (n: Segment) => recordDart(3, n);
  const recordMiss = () => recordDart(0, 0);
  const recordBull = () => recordDart(1, 25);
  const recordBullseye = () => recordDart(2, 25);

  // Undo letzter Dart
  const undoLastDart = () => {
    if (currentThrow.darts.length === 0) {
      setError('Keine Darts zum Rückgängig machen');
      return;
    }

    const newDarts = currentThrow.darts.slice(0, -1);
    setCurrentThrow({ darts: newDarts });
    setError(null);
  };

  const numberKeysTop = [1,2,3,4,5,6,7,8,9,10];
  const numberKeysBottom = [11,12,13,14,15,16,17,18,19,20];

  if (isLoading && !currentMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Match wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <button
              onClick={() => navigate("/matches")}
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Übersicht</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🎯 Live Scoring
            </h1>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Heimteam</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentMatch?.homeTeam?.name || 'Team 1'}
                </p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Gastteam</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentMatch?.awayTeam?.name || 'Team 2'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartMatch}
              disabled={saving}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {saving ? 'Wird gestartet...' : 'Match starten'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/matches")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🎯 Live Scoring
          </h1>
          <div className="w-20" />
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Player 1 */}
          <div className={`p-6 rounded-lg ${currentPlayer === 0 ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' : 'bg-white dark:bg-gray-800'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Heim</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentMatch?.homeTeam?.name || 'Spieler 1'}
            </p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              {playerScores[0]}
            </p>
          </div>

          {/* Player 2 */}
          <div className={`p-6 rounded-lg ${currentPlayer === 1 ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' : 'bg-white dark:bg-gray-800'}`}>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gast</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentMatch?.awayTeam?.name || 'Spieler 2'}
            </p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              {playerScores[1]}
            </p>
          </div>
        </div>

        {/* Current Throw Display */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Aktueller Wurf:</p>
          <div className="flex items-center gap-4">
            {currentThrow.darts.map((dart, idx) => (
              <div key={idx} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                <span className="font-mono text-lg">
                  {dart.multiplier === 0 ? 'Miss' :
                   dart.multiplier === 1 && dart.segment === 25 ? 'Bull' :
                   dart.multiplier === 2 && dart.segment === 25 ? 'Bullseye' :
                   `${dart.multiplier === 2 ? 'D' : dart.multiplier === 3 ? 'T' : ''}${dart.segment}`}
                </span>
              </div>
            ))}
            {[...Array(3 - currentThrow.darts.length)].map((_, idx) => (
              <div key={`empty-${idx}`} className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                <span className="font-mono text-lg text-gray-400">---</span>
              </div>
            ))}
          </div>
          {currentThrow.darts.length > 0 && (
            <button
              onClick={undoLastDart}
              className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Letzten Dart rückgängig
            </button>
          )}
        </div>

        {/* Dart Input Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-4">
          {/* Number Buttons */}
          <div className="mb-4">
            <div className="grid grid-cols-10 gap-2 mb-2">
              {numberKeysTop.map((n) => (
                <button
                  key={n}
                  onClick={() => recordSingle(n as Segment)}
                  disabled={currentThrow.darts.length >= 3 || saving}
                  className="aspect-square bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-semibold text-gray-900 dark:text-white disabled:opacity-50 transition-colors"
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-2">
              {numberKeysBottom.map((n) => (
                <button
                  key={n}
                  onClick={() => recordSingle(n as Segment)}
                  disabled={currentThrow.darts.length >= 3 || saving}
                  className="aspect-square bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-semibold text-gray-900 dark:text-white disabled:opacity-50 transition-colors"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Multiplier Buttons */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <button
              onClick={recordMiss}
              disabled={currentThrow.darts.length >= 3 || saving}
              className="py-3 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 rounded-md font-semibold text-white disabled:opacity-50 transition-colors"
            >
              Miss
            </button>
            <button
              onClick={recordBull}
              disabled={currentThrow.darts.length >= 3 || saving}
              className="py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md font-semibold text-white disabled:opacity-50 transition-colors"
            >
              Bull
            </button>
            <button
              onClick={recordBullseye}
              disabled={currentThrow.darts.length >= 3 || saving}
              className="py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-white disabled:opacity-50 transition-colors"
            >
              Bullseye
            </button>
          </div>

          {/* Modifier Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setNextMultiplier(2);
                setError('Wähle eine Zahl für Double');
              }}
              disabled={currentThrow.darts.length >= 3 || saving}
              className={`py-3 rounded-md font-semibold text-white disabled:opacity-50 transition-colors ${
                nextMultiplier === 2 ? 'bg-green-700 ring-2 ring-green-300' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Double
            </button>
            <button
              onClick={() => {
                setNextMultiplier(3);
                setError('Wähle eine Zahl für Triple');
              }}
              disabled={currentThrow.darts.length >= 3 || saving}
              className={`py-3 rounded-md font-semibold text-white disabled:opacity-50 transition-colors ${
                nextMultiplier === 3 ? 'bg-orange-700 ring-2 ring-orange-300' : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              Triple
            </button>
          </div>
        </div>

        {/* Error/Status Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {saving && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md text-blue-600 dark:text-blue-400 text-sm flex items-center gap-2">
            <Save className="w-4 h-4 animate-pulse" />
            Speichert...
          </div>
        )}
      </div>
    </div>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten
