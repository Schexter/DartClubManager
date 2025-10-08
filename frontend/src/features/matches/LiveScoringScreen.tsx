// frontend/src/features/matches/LiveScoringScreen.tsx
// Live Scoring für Dart 301/501/701 - Verbessertes Design
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMatchById, finalizeMatch, selectCurrentMatch, selectMatchesLoading } from "./matchesSlice";
import { Darts301, type ThrowResult } from "../../logic/darts301";
import { ArrowLeft, Trophy, Target, Undo2 } from "lucide-react";

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
  const [editingNames, setEditingNames] = useState(!matchId);
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
      setError("⚠️ Bitte beide Spielernamen eingeben!");
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
      setError(`❌ ${err || "Fehler beim Beenden des Matches"}`);
    }
  };

  const handleExit = () => {
    if (gameStarted && gameRef.current) {
      setShowExitDialog(true);
    } else {
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
    try { game.recordNumber(n as any, 1); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); }
  };
  const recordDouble = (n: number) => {
    if (!game) return;
    try { game.recordNumber(n as any, 2); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); }
  };
  const recordTriple = (n: number) => {
    if (!game) return;
    try { game.recordNumber(n as any, 3); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); }
  };
  const handleMiss = () => { 
    if (!game) return;
    try { game.recordMiss(); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); } 
  };
  const handleBull = () => { 
    if (!game) return;
    try { game.recordBull(); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); } 
  };
  const handleBullseye = () => { 
    if (!game) return;
    try { game.recordBullseye(); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); } 
  };
  const nextPlayer = () => { 
    if (!game) return;
    try { game.nextPlayer(); setError(null); rerender(); } catch (e: any) { setError(`❌ ${e.message}`); } 
  };
  const undo = () => { 
    if (!game) return;
    try { 
      const undoneThrow = game.undo(); 
      setError(`✅ Wurf rückgängig: ${undoneThrow.pointsScored} Punkte`);
      setTimeout(() => setError(null), 2000);
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Match wird geladen...</p>
        </div>
      </div>
    );
  }

  // Setup Screen (Namen eingeben)
  if (editingNames && !gameStarted) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Zurück Button */}
            <button
              onClick={() => navigate("/matches")}
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Zurück zur Übersicht</span>
            </button>

            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Live Scoring Setup
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bereite dein Match vor
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Spieler 1 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  🏠 Spieler 1 / Heimspieler
                </label>
                <input
                  type="text"
                  value={playerNames[0]}
                  onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
                  placeholder="Name eingeben..."
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  autoFocus
                />
              </div>

              {/* Spieler 2 */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  ✈️ Spieler 2 / Gastspieler
                </label>
                <input
                  type="text"
                  value={playerNames[1]}
                  onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
                  placeholder="Name eingeben..."
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Double-Out */}
              <label className="flex items-center gap-4 p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl cursor-pointer hover:shadow-md transition-all group">
                <input
                  type="checkbox"
                  checked={doubleOutDraft}
                  onChange={(e) => setDoubleOutDraft(e.target.checked)}
                  className="w-6 h-6 text-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <span className="text-gray-900 dark:text-gray-100 font-semibold block">Double-Out aktivieren</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Checkout mit Double erforderlich</span>
                </div>
              </label>

              {/* Fehler */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-5 py-4 rounded-xl font-medium animate-shake">
                  {error}
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={startGame}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Target className="w-6 h-6" />
                Spiel starten
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
    <div className="min-h-screen p-3 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                Live Scoring - {currentMatch?.startingScore ?? 301}
              </h1>
              {currentMatch?.league && (
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  {currentMatch.league}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button 
                onClick={handleExit}
                className="flex-1 md:flex-none px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </button>

              <button 
                onClick={undo}
                disabled={!game || (game.getState().players[0].dartsThisTurn === 0 && game.getState().players[1].dartsThisTurn === 0 && !game.lastThrow)}
                className="flex-1 md:flex-none px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Undo2 className="w-4 h-4" />
                UNDO
              </button>
              
              <button 
                onClick={startNewLeg}
                className="flex-1 md:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md transition-all"
              >
                🔄 Neues Leg
              </button>

              {matchId && (
                <button 
                  onClick={() => setShowFinishDialog(true)}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md transition-all"
                >
                  ✓ Beenden
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* VERBESSERTES SCOREBOARD */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {state.players.map((p, i) => (
            <div 
              key={i} 
              className={`
                relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300
                ${i === state.currentPlayerIndex 
                  ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white ring-4 ring-blue-400 dark:ring-blue-500 scale-105 md:scale-110" 
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                }
              `}
            >
              {/* Aktiver Spieler Indicator */}
              {i === state.currentPlayerIndex && (
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
              )}
              
              <div className="p-4 md:p-8">
                {/* Status Badge */}
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold mb-3
                  ${i === state.currentPlayerIndex 
                    ? "bg-white/20 backdrop-blur-sm text-white" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }
                `}>
                  {i === state.currentPlayerIndex ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      AM ZUG
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      Wartet
                    </>
                  )}
                </div>
                
                {/* Spielername */}
                <div className="text-xl md:text-3xl font-bold mb-3 md:mb-6 truncate">
                  {i === 0 ? "🏠 " : "✈️ "}{p.name}
                </div>
                
                {/* Restpunkte - GROSS */}
                <div className="mb-3 md:mb-6">
                  <div className={`
                    text-sm md:text-base font-medium mb-1 md:mb-2
                    ${i === state.currentPlayerIndex ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}
                  `}>
                    Restpunkte
                  </div>
                  <div className={`
                    text-5xl md:text-7xl lg:text-8xl font-black tracking-tight
                    ${p.score <= 40 ? "text-red-400 animate-pulse" : ""}
                  `}>
                    {p.score}
                  </div>
                </div>
                
                {/* Darts Counter */}
                <div className="flex items-center gap-2">
                  <span className={`
                    text-sm md:text-base font-medium
                    ${i === state.currentPlayerIndex ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}
                  `}>
                    Darts:
                  </span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((dart) => (
                      <div 
                        key={dart}
                        className={`
                          w-3 h-3 md:w-4 md:h-4 rounded-full transition-all
                          ${dart < p.dartsThisTurn 
                            ? i === state.currentPlayerIndex 
                              ? "bg-white" 
                              : "bg-blue-600"
                            : i === state.currentPlayerIndex
                              ? "bg-white/30"
                              : "bg-gray-300 dark:bg-gray-600"
                          }
                        `}
                      />
                    ))}
                  </div>
                  <span className={`
                    text-sm md:text-base font-bold ml-1
                    ${i === state.currentPlayerIndex ? "text-white" : "text-gray-900 dark:text-white"}
                  `}>
                    {p.dartsThisTurn}/3
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fehlermeldung / Erfolgsmeldung - AUFFÄLLIGER */}
      {error && (
        <div className="max-w-7xl mx-auto mb-4 md:mb-6">
          <div className={`
            px-4 md:px-6 py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg animate-bounce-once
            ${error.startsWith('✅') 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-400'
              : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-2 border-red-400'
            }
          `}>
            {error}
          </div>
        </div>
      )}

      {/* Letzter Wurf */}
      {state.lastThrow && (
        <div className="max-w-7xl mx-auto mb-4 md:mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Letzter Wurf:</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {renderLastThrow(state.lastThrow)}
            </div>
          </div>
        </div>
      )}

      {/* Wurf-Eingabe - GRÖSSERE BUTTONS */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 md:gap-6">
          {/* Zahlenfelder */}
          <div className="space-y-4 md:space-y-6">
            {/* Single */}
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Single 1-20
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`S-${n}`} n={n} dots={0} onClick={() => recordSingle(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`S-${n}`} n={n} dots={0} onClick={() => recordSingle(n)} />
                ))}
              </div>
            </div>

            {/* Double */}
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Double 1-20
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`D-${n}`} n={n} dots={2} onClick={() => recordDouble(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`D-${n}`} n={n} dots={2} onClick={() => recordDouble(n)} />
                ))}
              </div>
            </div>

            {/* Triple */}
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Triple 1-20
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2">
                {numberKeysTop.map((n) => (
                  <NumberKey key={`T-${n}`} n={n} dots={3} onClick={() => recordTriple(n)} />
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1.5 md:gap-2 mt-1.5 md:mt-2">
                {numberKeysBottom.map((n) => (
                  <NumberKey key={`T-${n}`} n={n} dots={3} onClick={() => recordTriple(n)} />
                ))}
              </div>
            </div>
          </div>

          {/* Spezialtasten */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <ActionButton label="MISS" onClick={handleMiss} icon="❌" variant="default" />
            <ActionButton label="Bull (25)" onClick={handleBull} icon="🎯" variant="default" />
            <ActionButton label="Bullseye (50)" onClick={handleBullseye} icon="🔴" variant="default" />
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                <ArrowLeft className="w-10 h-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Spiel verlassen?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Das aktuelle Spiel wird nicht gespeichert.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitDialog(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-all"
              >
                Abbrechen
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 font-semibold shadow-lg transition-all"
              >
                Ja, verlassen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finish Dialog */}
      {showFinishDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Match beenden?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Das Match wird archiviert und kann nicht mehr bearbeitet werden.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFinishDialog(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition-all"
              >
                Abbrechen
              </button>
              <button
                onClick={handleFinishMatch}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg transition-all"
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
  const dotColors = {
    0: "",
    2: "text-green-600",
    3: "text-red-600"
  };

  return (
    <button 
      onClick={onClick} 
      className="
        aspect-square 
        bg-gradient-to-br from-white to-gray-50
        dark:from-gray-700 dark:to-gray-800
        border-2 border-gray-300 dark:border-gray-600
        rounded-lg md:rounded-xl
        flex flex-col items-center justify-center
        hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100
        dark:hover:from-blue-900/30 dark:hover:to-blue-800/30
        hover:border-blue-500 dark:hover:border-blue-400
        active:scale-95
        transition-all
        font-bold text-base md:text-xl
        text-gray-900 dark:text-white
        shadow-sm hover:shadow-md
        min-h-[40px] md:min-h-[48px]
      "
    >
      <span>{n}</span>
      {dots > 0 && (
        <span className={`text-xs ${dotColors[dots]}`}>
          {Array(dots).fill("•").join("")}
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
  const baseClass = "p-4 md:p-5 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-base md:text-lg min-h-[60px] md:min-h-[70px]";
  const variantClass = variant === "primary" 
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-blue-500/50" 
    : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass}`}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
