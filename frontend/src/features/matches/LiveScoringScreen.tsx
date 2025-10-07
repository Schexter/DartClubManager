// frontend/src/features/matches/LiveScoringScreen.tsx
// Live Scoring für Dart 301 - Basierend auf Lukas' Design
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import React, { useRef, useState } from "react";
import { Darts301, type ThrowResult } from "../../logic/darts301";

export default function LiveScoringScreen() {
  const [namesDraft, setNamesDraft] = useState<string[]>(["Spieler 1", "Spieler 2"]);
  const [doubleOutDraft, setDoubleOutDraft] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameRef = useRef<Darts301 | null>(
    new Darts301(namesDraft, { startScore: 301, doubleOut: doubleOutDraft })
  );
  const game = gameRef.current!;
  const [, force] = useState(0);
  const rerender = () => force((x) => x + 1);

  const startNewLeg = () => {
    gameRef.current = new Darts301(namesDraft, {
      startScore: 301,
      doubleOut: doubleOutDraft,
    });
    setError(null);
    rerender();
  };

  // === Button-Handler ===
  const recordSingle = (n: number) => {
    try { game.recordNumber(n as any, 1); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordDouble = (n: number) => {
    try { game.recordNumber(n as any, 2); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordTriple = (n: number) => {
    try { game.recordNumber(n as any, 3); setError(null); rerender(); } catch (e: any) { setError(e.message); }
  };
  const handleMiss = () => { 
    try { game.recordMiss(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const handleBull = () => { 
    try { game.recordBull(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const handleBullseye = () => { 
    try { game.recordBullseye(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const nextPlayer = () => { 
    try { game.nextPlayer(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };
  const undo = () => { 
    try { game.undo(); setError(null); rerender(); } catch (e: any) { setError(e.message); } 
  };

  const state = game.getState();
  const numberKeysTop = [1,2,3,4,5,6,7,8,9,10];
  const numberKeysBottom = [11,12,13,14,15,16,17,18,19,20];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 Live Scoring - Dart 301</h1>
          
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-sm">
              <input
                type="checkbox"
                checked={doubleOutDraft}
                onChange={(e) => setDoubleOutDraft(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Double-Out</span>
            </label>
            
            <button 
              onClick={undo}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 font-medium shadow-sm transition-colors"
            >
              ↶ Undo
            </button>
            
            <button 
              onClick={startNewLeg}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors"
            >
              🔄 Neues Leg
            </button>
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

      {/* Fehlermeldung */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-md">
            ⚠️ {error}
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
