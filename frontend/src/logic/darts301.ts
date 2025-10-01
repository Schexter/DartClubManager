// frontend/src/logic/darts301.ts

export type Multiplier = 1 | 2 | 3;

export type Segment =
| { kind: "number"; value: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20 }
| { kind: "bull" }
| { kind: "bullseye" }
| { kind: "miss" };

export type ThrowInput = { segment: Segment; multiplier?: Multiplier };

export type ThrowResult = {
playerIndex: number;
scoreBefore: number;
scoreAfter: number;
pointsScored: number;
isBust: boolean;
endedLeg: boolean;
input: ThrowInput;
};

type Player = { name: string; score: number; dartsThisTurn: number };

type Settings = { startScore: number; doubleOut: boolean; dartsPerTurn: number };

function calcPoints(input: ThrowInput): number {
  const s = input.segment;
  if (s.kind === "miss") return 0;
  if (s.kind === "bull") return 25;
  if (s.kind === "bullseye") return 50;
  const m = input.multiplier ?? 1;
  return s.value * m;
}

function isDouble(input: ThrowInput): boolean {
  const s = input.segment;
  if (s.kind === "bullseye") return true;
  if (s.kind === "bull") return false;
  if (s.kind === "miss") return false;
  return (input.multiplier ?? 1) === 2;
}

function validateInput(input: ThrowInput) {
  const s = input.segment;
  if (s.kind === "number") {
    if (!input.multiplier || ![1,2,3].includes(input.multiplier)) {
      throw new Error("Für 1–20 muss multiplier ∈ {1,2,3} gesetzt sein.");
    }
  }
}

export class Darts301 {
  settings: Settings;
  players: Player[];
  private _currentPlayer = 0;
  private _turnLocked = false;
  private history: ThrowResult[] = [];

  constructor(names: string[], settings?: Partial<Settings>) {
    const s: Settings = { startScore: 301, doubleOut: false, dartsPerTurn: 3, ...settings };
    this.settings = s;
    this.players = names.map((name) => ({ name, score: s.startScore, dartsThisTurn: 0 }));
  }

  get currentPlayerIndex() { return this._currentPlayer; }
  get currentPlayer() { return this.players[this._currentPlayer]; }
  get turnLocked() { return this._turnLocked; }
  get lastThrow() { return this.history[this.history.length - 1] ?? null; }

  recordNumber(n: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20, m: Multiplier) {
    return this.recordThrow({ segment: { kind: "number", value: n }, multiplier: m });
  }
  recordMiss() { return this.recordThrow({ segment: { kind: "miss" } }); }
  recordBull() { return this.recordThrow({ segment: { kind: "bull" } }); }
  recordBullseye() { return this.recordThrow({ segment: { kind: "bullseye" } }); }
  undo() { return this.undoLast(); }
  nextPlayer() { return this.confirmNextPlayer(); }

  private recordThrow(input: ThrowInput): ThrowResult {
    if (this._turnLocked) throw new Error("Zug ist abgeschlossen. Bitte 'Nächster Spieler' bestätigen.");
    validateInput(input);
    const p = this.currentPlayer;
    if (p.score <= 0) throw new Error("Dieser Spieler ist bereits fertig.");
    if (p.dartsThisTurn >= this.settings.dartsPerTurn) throw new Error("3 Darts geworfen – bitte bestätigen.");

    const points = calcPoints(input);
    const before = p.score;
    let after = before - points;

    let isBust = false;
    let endedLeg = false;

    if (after < 0) {
      isBust = true; after = before;
    } else if (after === 0) {
      if (this.settings.doubleOut) { if (isDouble(input)) endedLeg = true; else { isBust = true; after = before; } }
      else { endedLeg = true; }
    } else if (this.settings.doubleOut && after === 1) {
      isBust = true; after = before;
    }

    p.dartsThisTurn += 1;
    p.score = after;

    const result: ThrowResult = {
      playerIndex: this._currentPlayer,
      scoreBefore: before,
      scoreAfter: after,
      pointsScored: isBust ? 0 : points,
      isBust,
      endedLeg,
      input,
    };
    this.history.push(result);

    if (isBust || endedLeg || p.dartsThisTurn >= this.settings.dartsPerTurn) {
      this._turnLocked = true;
    }

    return result;
  }

  private undoLast(): ThrowResult {
    const last = this.history.pop();
    if (!last) throw new Error("Kein Wurf zum Rückgängig machen vorhanden.");
    const player = this.players[last.playerIndex];
    if (this._currentPlayer !== last.playerIndex) this._currentPlayer = last.playerIndex;
    player.score = last.scoreBefore;
    player.dartsThisTurn = Math.max(0, player.dartsThisTurn - 1);
    this._turnLocked = false;
    return last;
  }

  private confirmNextPlayer() {
    if (!this._turnLocked) throw new Error("Der aktuelle Zug ist noch nicht abgeschlossen.");
    this.currentPlayer.dartsThisTurn = 0;
    this._turnLocked = false;
    this._currentPlayer = (this._currentPlayer + 1) % this.players.length;
  }

  getState() {
    return {
      settings: this.settings,
      currentPlayerIndex: this._currentPlayer,
      players: this.players.map((p) => ({ name: p.name, score: p.score, dartsThisTurn: p.dartsThisTurn })),
      lastThrow: this.lastThrow,
      turnLocked: this._turnLocked,
    };
  }
}
