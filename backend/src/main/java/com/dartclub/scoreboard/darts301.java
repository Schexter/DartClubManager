package com.dartclub.scoreboard;

import java.util.*;

/**
 * Backend-Logik für Darts 301 – API spiegelt die Frontend-TS-Klasse wider.
 *
 * Pfad-Empfehlung: src/main/java/com/dartclub/scoreboard/darts301.java
 */
public class darts301 {

    // =====================
    // Types / DTOs
    // =====================

    public enum Multiplier {
        SINGLE(1), DOUBLE(2), TRIPLE(3);
        public final int v;
        Multiplier(int v) { this.v = v; }
    }

    public enum SegmentKind { NUMBER, BULL, BULLSEYE, MISS }

    public static final class Segment {
        public final SegmentKind kind;
        public final Integer value; // nur für NUMBER gesetzt (1..20)
        private Segment(SegmentKind kind, Integer value) {
            this.kind = kind; this.value = value;
        }
        public static Segment number(int value) { return new Segment(SegmentKind.NUMBER, value); }
        public static Segment bull() { return new Segment(SegmentKind.BULL, null); }
        public static Segment bullseye() { return new Segment(SegmentKind.BULLSEYE, null); }
        public static Segment miss() { return new Segment(SegmentKind.MISS, null); }
    }

    public static final class ThrowInput {
        public final Segment segment;
        public final Multiplier multiplier; // optional; nur für NUMBER relevant
        public ThrowInput(Segment segment, Multiplier multiplier) {
            this.segment = segment; this.multiplier = multiplier;
        }
    }

    public static final class ThrowResult {
        public final int playerIndex;
        public final int scoreBefore;
        public final int scoreAfter;
        public final int pointsScored;
        public final boolean isBust;
        public final boolean endedLeg;
        public final ThrowInput input;
        public ThrowResult(int playerIndex, int scoreBefore, int scoreAfter, int pointsScored,
                           boolean isBust, boolean endedLeg, ThrowInput input) {
            this.playerIndex = playerIndex; this.scoreBefore = scoreBefore; this.scoreAfter = scoreAfter;
            this.pointsScored = pointsScored; this.isBust = isBust; this.endedLeg = endedLeg; this.input = input;
        }
    }

    public static final class Player {
        public final String name;
        public int score;
        public int dartsThisTurn;
        public Player(String name, int score) {
            this.name = name; this.score = score; this.dartsThisTurn = 0;
        }
    }

    public static final class Settings {
        public final int startScore;
        public final boolean doubleOut;
        public final int dartsPerTurn;
        public Settings(int startScore, boolean doubleOut, int dartsPerTurn) {
            this.startScore = startScore; this.doubleOut = doubleOut; this.dartsPerTurn = dartsPerTurn;
        }
    }

    public static final class State {
        public final Settings settings;
        public final int currentPlayerIndex;
        public final List<PlayerView> players;
        public final ThrowResult lastThrow;
        public final boolean turnLocked;
        public State(Settings settings, int currentPlayerIndex, List<PlayerView> players, ThrowResult lastThrow, boolean turnLocked) {
            this.settings = settings; this.currentPlayerIndex = currentPlayerIndex; this.players = players;
            this.lastThrow = lastThrow; this.turnLocked = turnLocked;
        }
    }

    public static final class PlayerView {
        public final String name; public final int score; public final int dartsThisTurn;
        public PlayerView(String name, int score, int dartsThisTurn) {
            this.name = name; this.score = score; this.dartsThisTurn = dartsThisTurn;
        }
    }

    // =====================
    // Instanzzustand
    // =====================

    public final Settings settings;
    public final List<Player> players;
    private int currentPlayer = 0;
    private boolean turnLocked = false;
    private final Deque<ThrowResult> history = new ArrayDeque<>();

    // =====================
    // Konstruktor
    // =====================

    public darts301(List<String> playerNames, Settings settings) {
        Settings s = settings != null ? settings : new Settings(301, false, 3);
        this.settings = s;
        this.players = new ArrayList<>();
        for (String name : playerNames) this.players.add(new Player(name, s.startScore));
    }

    public darts301(List<String> playerNames) {
        this(playerNames, new Settings(301, false, 3));
    }

    // =====================
    // Öffentliche API (spiegelt TS)
    // =====================

    public ThrowResult recordNumber(int n, Multiplier m) {
        if (n < 1 || n > 20) throw new IllegalArgumentException("Zahl muss 1..20 sein");
        if (m == null) throw new IllegalArgumentException("Multiplier muss gesetzt sein");
        return recordThrow(new ThrowInput(Segment.number(n), m));
    }

    public ThrowResult recordMiss() { return recordThrow(new ThrowInput(Segment.miss(), null)); }
    public ThrowResult recordBull() { return recordThrow(new ThrowInput(Segment.bull(), null)); }
    public ThrowResult recordBullseye() { return recordThrow(new ThrowInput(Segment.bullseye(), null)); }

    public ThrowResult undo() {
        ThrowResult last = history.pollLast();
        if (last == null) throw new IllegalStateException("Kein Wurf zum Rückgängig machen vorhanden.");
        Player player = players.get(last.playerIndex);
        if (currentPlayer != last.playerIndex) currentPlayer = last.playerIndex;
        player.score = last.scoreBefore;
        player.dartsThisTurn = Math.max(0, player.dartsThisTurn - 1);
        turnLocked = false;
        return last;
    }

    public void nextPlayer() {
        if (!turnLocked) throw new IllegalStateException("Der aktuelle Zug ist noch nicht abgeschlossen.");
        Player p = players.get(currentPlayer);
        p.dartsThisTurn = 0;
        turnLocked = false;
        currentPlayer = (currentPlayer + 1) % players.size();
    }

    public State getState() {
        List<PlayerView> views = new ArrayList<>();
        for (Player p : players) views.add(new PlayerView(p.name, p.score, p.dartsThisTurn));
        ThrowResult last = history.peekLast();
        return new State(settings, currentPlayer, views, last, turnLocked);
    }

    // =====================
    // Kernlogik
    // =====================

    private ThrowResult recordThrow(ThrowInput input) {
        if (turnLocked) throw new IllegalStateException("Zug ist abgeschlossen. Bitte 'Nächster Spieler' bestätigen.");
        validateInput(input);
        Player p = players.get(currentPlayer);
        if (p.score <= 0) throw new IllegalStateException("Dieser Spieler ist bereits fertig.");
        if (p.dartsThisTurn >= settings.dartsPerTurn) throw new IllegalStateException("3 Darts geworfen – bitte bestätigen.");

        int points = calcPoints(input);
        int before = p.score;
        int after = before - points;

        boolean isBust = false;
        boolean endedLeg = false;

        if (after < 0) {
            isBust = true; after = before;
        } else if (after == 0) {
            if (settings.doubleOut) {
                if (isDouble(input)) endedLeg = true; else { isBust = true; after = before; }
            } else {
                endedLeg = true;
            }
        } else if (settings.doubleOut && after == 1) {
            isBust = true; after = before;
        }

        p.dartsThisTurn += 1;
        p.score = after;

        ThrowResult result = new ThrowResult(
                currentPlayer,
                before,
                after,
                isBust ? 0 : points,
                isBust,
                endedLeg,
                input
        );
        history.addLast(result);

        if (isBust || endedLeg || p.dartsThisTurn >= settings.dartsPerTurn) {
            turnLocked = true;
        }
        return result;
    }

    private static int calcPoints(ThrowInput input) {
        Segment s = input.segment;
        switch (s.kind) {
            case MISS: return 0;
            case BULL: return 25;
            case BULLSEYE: return 50;
            case NUMBER:
                int m = input.multiplier != null ? input.multiplier.v : 1;
                return s.value * m;
            default: throw new IllegalStateException("Unbekannter Segmenttyp");
        }
    }

    private static boolean isDouble(ThrowInput input) {
        Segment s = input.segment;
        if (s.kind == SegmentKind.BULLSEYE) return true;
        if (s.kind == SegmentKind.BULL || s.kind == SegmentKind.MISS) return false;
        return input.multiplier != null && input.multiplier == Multiplier.DOUBLE;
    }

    private static void validateInput(ThrowInput input) {
        Segment s = input.segment;
        if (s.kind == SegmentKind.NUMBER) {
            if (s.value == null || s.value < 1 || s.value > 20) {
                throw new IllegalArgumentException("Für NUMBER muss value ∈ 1..20 gesetzt sein.");
            }
            if (input.multiplier == null) {
                throw new IllegalArgumentException("Für NUMBER muss multiplier ∈ {SINGLE,DOUBLE,TRIPLE} gesetzt sein.");
            }
        }
    }
}
