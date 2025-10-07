/**
 * matchesSlice.ts - Redux State für Matches
 * 
 * Features:
 * - Match-Liste laden
 * - Match-Details laden
 * - Match erstellen
 * - Match starten/beenden
 * - Loading & Error States
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { matchService } from '../../services/matchService';

// Types
export interface Match {
  id: string;
  orgId: string;
  matchDate: string;
  venue?: string;
  league?: string;
  matchType: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELLED';
  homeTeamId?: string;
  awayTeamId?: string;
  homeSets: number;
  awaySets: number;
  bestOfSets: number;
  bestOfLegs: number;
  startingScore: number;
  doubleOut: boolean;
  createdAt: string;
  updatedAt: string;
  finishedAt?: string;
}

interface MatchesState {
  matches: Match[];
  currentMatch: Match | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  currentMatch: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchMatches = createAsyncThunk(
  'matches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await matchService.getAll();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Laden der Matches');
    }
  }
);

export const fetchMatchById = createAsyncThunk(
  'matches/fetchById',
  async (matchId: string, { rejectWithValue }) => {
    try {
      const response = await matchService.getById(matchId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Laden des Matches');
    }
  }
);

export const createMatch = createAsyncThunk(
  'matches/create',
  async (matchData: Partial<Match>, { rejectWithValue }) => {
    try {
      const response = await matchService.create(matchData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Erstellen des Matches');
    }
  }
);

export const startMatch = createAsyncThunk(
  'matches/start',
  async (matchId: string, { rejectWithValue }) => {
    try {
      const response = await matchService.start(matchId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Starten des Matches');
    }
  }
);

export const finalizeMatch = createAsyncThunk(
  'matches/finalize',
  async (matchId: string, { rejectWithValue }) => {
    try {
      const response = await matchService.finalize(matchId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Beenden des Matches');
    }
  }
);

// Slice
const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMatch: (state) => {
      state.currentMatch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Matches
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Match By ID
      .addCase(fetchMatchById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatchById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMatch = action.payload;
      })
      .addCase(fetchMatchById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Match
      .addCase(createMatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.matches.push(action.payload);
      })
      .addCase(createMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Start Match
      .addCase(startMatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMatch = action.payload;
        // Update in list
        const index = state.matches.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.matches[index] = action.payload;
        }
      })
      .addCase(startMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Finalize Match
      .addCase(finalizeMatch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(finalizeMatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMatch = action.payload;
        // Update in list
        const index = state.matches.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.matches[index] = action.payload;
        }
      })
      .addCase(finalizeMatch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectCurrentMatch = (state: { matches: MatchesState }) => state.matches.currentMatch;
export const selectMatchesLoading = (state: { matches: MatchesState }) => state.matches.isLoading;

export const { clearError, clearCurrentMatch } = matchesSlice.actions;
export default matchesSlice.reducer;
