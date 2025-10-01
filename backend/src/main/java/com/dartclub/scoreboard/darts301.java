package com.dartclub.scoreboard;

import java.util.*;

/**
 * Backend-Logik für Darts 301 – API spiegelt die Frontend-TS-Klasse wider.
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
        public final Integer value;
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
        public final Multiplier multiplier;
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
            this.pointsScored = pointsScored;
