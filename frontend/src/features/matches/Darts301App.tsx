import React, { useRef, useState } from "react";
import { Darts301, type ThrowResult } from "../logic/darts301";

export default function Darts301App() {
  const [namesDraft, setNamesDraft] = useState<string[]>(["Maya", "Leo", "Sara"]);
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
    try { game.recordNumber(n as any, 1); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordDouble = (n: number) => {
    try { game.recordNumber(n as any, 2); rerender(); } catch (e: any) { setError(e.message); }
  };
  const recordTriple = (n: number) => {
    try { game.recordNumber(n as any, 3); rerender(); } catch (e: any) { setError(e.message); }
  };
  const handleMiss = () => { try { game.recordMiss(); rerender(); } catch (e: any) { setError(e.message); } };
  const handleBull = () => { try { game.recordBull(); rerender(); } catch (e: any) { setError(e.message); } };
  const handleBullseye = () => { try { game.recordBullseye(); rerender(); } catch (e: any) { setError(e.message); } };
  const nextPlayer = () => { try { game.nextPlayer(); rerender(); } catch (e: any) { setError(e.message); } };
  const undo = () => { try { game.undo(); rerender(); } catch (e: any) { setError(e.message); } };

  const state = game.getState();
  const numberKeysTop = [1,2,3,4,5,6,7,8,9,10];
  const numberKeysBottom = [11,12,13,14,15,16,17,18,19,20];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Darts 301</h1>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={doubleOutDraft}
              onChange={(e) => setDoubleOutDraft(e.target.checked)}
            />
            Double-Out
          </label>
          <button onClick={undo}>Undo</button>
          <button onClick={startNewLeg}>Neues Leg starten</button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex gap-3 overflow-x-auto">
        {state.players.map((p, i) => (
          <div key={i} className={`p-4 border rounded ${i === state.currentPlayerIndex ? "ring-2 ring-black" : ""}`}>
            <div>{p.name}</div>
            <div className="text-2xl">{p.score}</div>
            <div>Darts: {p.dartsThisTurn}</div>
          </div>
        ))}
      </div>

      {/* Fehlermeldung */}
      {error && <div className="text-red-600 mt-2">{error}</div>}

      {/* Zahlenfelder */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        <div className="space-y-6">
          {/* Single */}
          <div>
            <div>Single 1-20</div>
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
          <div>
            <div>Double 1-20</div>
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
          <div>
            <div>Triple 1-20</div>
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
        <div className="grid grid-cols-2 gap-3">
          <ActionButton label="MISS" onClick={handleMiss} />
          <ActionButton label="Bull" onClick={handleBull} />
          <ActionButton label="Bullseye" onClick={handleBullseye} />
          <ActionButton label="Naechster Spieler" onClick={nextPlayer} variant="primary" />
        </div>
      </div>
    </div>
  );
}

function renderLastThrow(t: ThrowResult) {
  const seg = t.input.segment;
  let label = "";
  if (seg.kind === "number") label = `${t.input.multiplier ?? 1}x${seg.value}`; // x statt ×
  if (seg.kind === "bull") label = "Bull (25)";
  if (seg.kind === "bullseye") label = "Bullseye (50)";
  if (seg.kind === "miss") label = "Miss";
  const scored = t.isBust ? "BUST" : `-${t.pointsScored}`;
  return `${label} - ${scored} Rest: ${t.scoreAfter}`; // ASCII Minus statt Em-Dash
}

function NumberKey({ n, dots, onClick }: { n: number; dots: 0 | 2 | 3; onClick: () => void }) {
  return (
    <button onClick={onClick} className="aspect-square border rounded flex flex-col items-center">
      <span>{n}</span>
      {dots > 0 && <span className="text-xs">{Array(dots).fill(".").join(" ")}</span>}
    </button>
  );
}

function ActionButton({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "primary";
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${variant === "primary" ? "bg-black text-white" : "bg-white border"}`}
    >
      {label}
    </button>
  );
}
