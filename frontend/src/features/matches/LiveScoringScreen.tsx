// frontend/src/features/matches/LiveScoringScreen.tsx
// Live Scoring für Dart 301 - Basierend auf Lukas' Design
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMatchById, finalizeMatch, selectCurrentMatch, selectMatchesLoading } from "./matchesSlice";
import { Darts301, type ThrowResult } from "../../logic/darts301";
import { ArrowLeft } from "lucide-react";

export default function LiveScoringScreen() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentMatch = useAppSelector(selectCurrentMatch);
  const isLoading = useAppSelector(selectMatchesLoading);
  
  // Lade Match-Daten beim Mount (falls vorhanden)
  useEffect(() => {
    if (matchId) {
      dispatch(fetchMatchById(matchId));
    }
  }, [matchId, dispatch]);

  // Spielernamen - entweder aus Match oder editierbar
  const defaultNames = currentMatch 
    ? [
        currentMatch.homeTeam?.name || "Heimspieler",
        currentMatch.awayTeam?.name || "Gastspieler"
      ]
    : ["Spieler 1", "Spieler 2"];

  const [playerNames, setPlayerNames] = useState<string[]>(defaultNames);
  const [editingNames, setEditingNames] = useState(!matchId); // Bearbeitungsmodus wenn kein Match
  const [doubleOutDraft, setDoubleOutDraft] = useState(currentMatch?.doubleOut ?? false);
  const [error, setError] = useState<string | null>(null);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Sync mit Match-Daten
  useEffect(() => {
    if (currentMatch) {
      setDoubleOutDraft(currentMatch.doubleOut);
      if (!gameStarted) {
        setPlayerNames([
          currentMatch.homeTeam?.name || "Heimspieler",
          currentMatch.awayTeam?.name || "Gastspieler"
        ]);
      }
    }
  }, [currentMatch, gameStarted]);

  const gameRef = useRef<Darts301 | null>(null);
  const [, force] = useState(0);
  const rerender = () => force((x) => x + 1);

  const startGame = () => {
    if (!playerNames[0].trim() || !playerNames[1].trim()) {
      setError("Bitte beide Spielernamen eingeben!");
      return;
    }
    gameRef.current = new Darts301(playerNames, {
      startScore: currentMatch?.startingScore ?? 301,
      doubleOut: doubleOutDraft,
    });
    setEditingNames(false);
    setGameStarted(true);
    setError(null);
    rerender();
  };

  const startNewLeg = () => {
    if (!gameRef.current) return;
    gameRef.current = new Darts301(playerNames, {
      startScore: currentMatch?.startingScore ?? 301,
      doubleOut: doubleOutDraft,
    });
    setError(null);
    rerender();
  };

  const handleFinishMatch = async () => {
    if (!matchId) return;
    
    try {
      await dispatch(finalizeMatch(matchId)).unwrap();
      navigate("/matches");
    } catch (err: any) {
      setError(err || "Fehler beim Beenden des Matches");
    }
  };

  const handleExit = () => {
    // Wenn im Spiel, Bestätigungsdialog anzeigen
    if (gameStarted && gameRef.current) {
      setShowExitDialog(true);
    } else {
      // Sonst direkt zurück navigieren
      navigate(matchId ? `/matches/${matchId}` : "/matches");
    }
  };

  const confirmExit = () => {
    navigate(matchId ? `/matches/${matchId}` : "/matches");
  };

  // === Button-Handler ===
  const game = gameRef.current;
  const recordSingle = (n: number) => {
    if (!game) return;
    try { game.recordNumber(n as any, 1); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordDouble = (n: number) => {
    if (!game) return;
    try { game.recordNumber(n as any, 2); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordTriple = (n: number) => {
    if (!game) return;
    try { game.recordNumber(n as any, 3); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const handleMiss = () => { 
    if (!game) return;
    try { game.recordMiss(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const handleBull = () => { 
    if (!game) return;
    try { game.recordBull(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const handleBullseye = () => { 
    if (!game) return;
    try { game.recordBullseye(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const nextPlayer = () => { 
    if (!game) return;
    try { game.nextPlayer(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const undo = () => { 
    if (!game) return;
    try { 
      const undoneThrow = game.undo(); 
      setError(`✅ Wurf rückgängig gemacht: ${undoneThrow.pointsScored} Punkte`);
      setTimeout(() => setError(null), 2000); // Erfolgs-Message nach 2 Sek. ausblenden
      rerender(); 
    } catch (e: any) { 
      setError(`⚠️ ${e.message}`);
    } 
  };

  const numberKeysTop = [1,2,3,4,5,6,7,8,9,10];
  const numberKeysBottom = [11,12,13,14,15,16,17,18,19,20];

  // Loading State
  if (isLoading && matchId && !currentMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Match wird geladen...</p>
        </div>
      </div>
    );
  }

  // Setup Screen (Namen eingeben)
  if (editingNames && !gameStarted) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {/* Zurück Button */}
            <button
              onClick={() => navigate("/matches")}
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Übersicht</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🎯 Live Scoring Setup
            </h1>
            
            <div className="space-y-6">
              {/* Spieler 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Spieler 1 / Heimspieler
                </label>
                <input
                  type="text"
                  value={playerNames[0]}
                  onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
                  placeholder="Name eingeben..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>

              {/* Spieler 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Spieler 2 / Gastspieler
                </label>
                <input
                  type="text"
                  value={playerNames[1]}
                  onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
                  placeholder="Name eingeben..."
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Double-Out */}
              <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <input
                  type="checkbox"
                  checked={doubleOutDraft}
                  onChange={(e) => setDoubleOutDraft(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Double-Out aktivieren</span>
              </label>

              {/* Fehler */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-md">
                  ⚠️ {error}
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={startGame}
                className="w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold text-lg shadow-md transition-colors"
              >
                🎯 Spiel starten
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Screen
  const state = game?.getState();
  if (!state) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎯 Live Scoring - Dart {currentMatch?.startingScore ?? 301}
            </h1>
            {currentMatch?.league && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                🏆 {currentMatch.league}
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* ZURÜCK BUTTON - IMMER SICHTBAR */}
            <button 
              onClick={handleExit}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium shadow-sm transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>

            <button 
              onClick={undo}
              disabled={!game || (game.getState().players[0].dartsThisTurn === 0 && game.getState().players[1].dartsThisTurn === 0 && !game.lastThrow)}
              className="px-4 py-2 bg-orange-500 text-white border-2 border-orange-600 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed font-bold shadow-md transition-colors"
            >
              ↶ UNDO
            </button>
            
            <button 
              onClick={startNewLeg}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors"
            >
              🔄 Neues Leg
            </button>

            {matchId && (
              <button 
                onClick={() => setShowFinishDialog(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium shadow-sm transition-colors"
              >
                ✓ Spiel beenden
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="grid grid-cols-2 md:flex md:gap-4 gap-3">
          {state.players.map((p, i) => (
            <div 
              key={i} 
              className={`
                p-6 rounded-lg shadow-md transition-all
                ${i === state.currentPlayerIndex 
                  ? "bg-blue-600 text-white ring-4 ring-blue-400 dark:ring-blue-500 scale-105" 
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                }
              `}
            >
              <div className="text-sm font-medium mb-1 opacity-90">
                {i === state.currentPlayerIndex ? "🎯 AM ZUG" : "Wartet..."}
              </div>
              <div className="text-xl font-bold mb-2">{p.name}</div>
              <div className="text-4xl font-bold mb-2">{p.score}</div>
              <div className="text-sm opacity-90">
                Darts: {p.dartsThisTurn}/3
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fehlermeldung / Erfolgsmeldung */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className={`px-4 py-3 rounded-md ${
            error.startsWith('✅') 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          }`}>
            {error}
          </div>
        </div>
      )}

      {/* Letzter Wurf */}
      {state.lastThrow && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Letzter Wurf:</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {renderLastThrow(state.lastThrow)}
            </div>
          </div>
        </div>
      )}

      {/* Wurf-Eingabe */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Zahlenfelder */}
          <div className="space-y-6">
            {/* Single */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Single 1-20</div>
              <div className="grid grid-cols-10 gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`S-${n}`} n={n} dots={0} onClick={() => recordSingle(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`S-${n}`} n={n} dots={0} onClick={() => recordSingle(n)} />
                ))}
              </div>
            </div>

            {/* Double */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Double 1-20</div>
              <div className="grid grid-cols-10 gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`D-${n}`} n={n} dots={2} onClick={() => recordDouble(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`D-${n}`} n={n} dots={2} onClick={() => recordDouble(n)} />
                ))}
              </div>
            </div>

            {/* Triple */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Triple 1-20</div>
              <div className="grid grid-cols-10 gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`T-${n}`} n={n} dots={3} onClick={() => recordTriple(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-2 mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`T-${n}`} n={n} dots={3} onClick={() => recordTriple(n)} />
                ))}
              </div>
            </div>
          </div>

          {/* Spezialtasten */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <ActionButton label="MISS" onClick={handleMiss} icon="❌" />
            <ActionButton label="Bull (25)" onClick={handleBull} icon="🎯" />
            <ActionButton label="Bullseye (50)" onClick={handleBullseye} icon="🔴" />
            <ActionButton 
              label={state.turnLocked ? "Nächster Spieler" : "Zug läuft..."} 
              onClick={nextPlayer} 
              variant="primary"
              disabled={!state.turnLocked}
              icon="➡️"
            />
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ⚠️ Spiel verlassen?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Das aktuelle Spiel wird nicht gespeichert. Möchten Sie wirklich zurück zur Übersicht?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Ja, verlassen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finish Dialog */}
      {showFinishDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Match beenden?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Das Match wird archiviert und kann nicht mehr bearbeitet werden.
              Möchten Sie fortfahren?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFinishDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                onClick={handleFinishMatch}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Match beenden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderLastThrow(t: ThrowResult) {
  const seg = t.input.segment;
  let label = "";
  if (seg.kind === "number") label = `${t.input.multiplier ?? 1}x${seg.value}`;
  if (seg.kind === "bull") label = "Bull (25)";
  if (seg.kind === "bullseye") label = "Bullseye (50)";
  if (seg.kind === "miss") label = "Miss";
  const scored = t.isBust ? "🚫 BUST" : `-${t.pointsScored}`;
  return `${label} ${scored} → Rest: ${t.scoreAfter}`;
}

function NumberKey({ n, dots, onClick }: { n: number; dots: 0 | 2 | 3; onClick: () => void }) {
  return (
    <button 
      onClick={onClick} 
      className="
        aspect-square 
        bg-white dark:bg-gray-700 
        border-2 border-gray-300 dark:border-gray-600
        rounded-lg 
        flex flex-col items-center justify-center
        hover:bg-blue-50 dark:hover:bg-blue-900/30
        hover:border-blue-500 dark:hover:border-blue-400
        active:scale-95
        transition-all
        font-bold text-lg
        text-gray-900 dark:text-white
        shadow-sm
      "
    >
      <span>{n}</span>
      {dots > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Array(dots).fill("•").join(" ")}
        </span>
      )}
    </button>
  );
}

function ActionButton({
  label,
  onClick,
  variant = "default",
  disabled = false,
  icon,
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "primary";
  disabled?: boolean;
  icon?: string;
}) {
  const baseClass = "p-4 rounded-lg font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2";
  const variantClass = variant === "primary" 
    ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed" 
    : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
