/**
 * Matches Slice - Redux State Management für Matches
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchService } from '../../lib/api';
import type { Match, CreateMatchRequest, UpdateMatchRequest, CreateThrowRequest, Throw } from '../../lib/api/types';

// ========================================
// STATE INTERFACE
// ========================================

interface MatchesState {
  matches: Match[];
  currentMatch: Match | null;
  isLoading: boolean;
  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: MatchesState = {
  matches: [],
  currentMatch: null,
  isLoading: false,
  error: null,
};

// ========================================
// ASYNC THUNKS
// ========================================

/**
 * Fetch All Matches
 */
export const fetchMatches = createAsyncThunk<
  Match[],
  void,
  { rejectValue: string }
>(
  'matches/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await matchService.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden der Matches'
      );
    }
  }
);

/**
 * Fetch Single Match
 */
export const fetchMatchById = createAsyncThunk<
  Match,
  string,
  { rejectValue: string }
>(
  'matches/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await matchService.getById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden des Matches'
      );
    }
  }
);

/**
 * Create Match
 */
export const createMatch = createAsyncThunk<
  Match,
  CreateMatchRequest,
  { rejectValue: string }
>(
  'matches/create',
  async (data, { rejectWithValue }) => {
    try {
      return await matchService.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Erstellen des Matches'
      );
    }
  }
);

/**
 * Update Match
 */
export const updateMatch = createAsyncThunk<
  Match,
  { id: string; data: UpdateMatchRequest },
  { rejectValue: string }
>(
  'matches/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await matchService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Aktualisieren des Matches'
      );
    }
  }
);

/**
 * Delete Match
 */
export const deleteMatch = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'matches/delete',
  async (id, { rejectWithValue }) => {
    try {
      await matchService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Löschen des Matches'
      );
    }
  }
);

/**
 * Start Match
 */
export const startMatch = createAsyncThunk<
  Match,
  string,
  { rejectValue: string }
>(
  'matches/start',
  async (id, { rejectWithValue }) => {
    try {
      return await matchService.start(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Starten des Matches'
      );
    }
  }
);

/**
 * Finalize Match
 */
export const finalizeMatch = createAsyncThunk<
  Match,
  string,
  { rejectValue: string }
>(
  'matches/finalize',
  async (id, { rejectWithValue }) => {
    try {
      return await matchService.finalize(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Beenden des Matches'
      );
    }
  }
);

/**
 * Submit Throw (Live Scoring)
 */
export const submitThrow = createAsyncThunk<
  Throw,
  { matchId: string; legId: string; data: CreateThrowRequest },
  { rejectValue: string }
>(
  'matches/submitThrow',
  async ({ matchId, legId, data }, { rejectWithValue }) => {
    try {
      return await matchService.submitThrow(matchId, legId, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Eintragen des Wurfs'
      );
    }
  }
);

// ========================================
// SLICE
// ========================================

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
    // ================== FETCH ALL ==================
    builder.addCase(fetchMatches.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.isLoading = false;
      state.matches = action.payload;
    });
    builder.addCase(fetchMatches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== FETCH BY ID ==================
    builder.addCase(fetchMatchById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMatchById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentMatch = action.payload;
    });
    builder.addCase(fetchMatchById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== CREATE ==================
    builder.addCase(createMatch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.matches.push(action.payload);
    });
    builder.addCase(createMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== UPDATE ==================
    builder.addCase(updateMatch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.matches.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.matches[index] = action.payload;
      }
      state.currentMatch = action.payload;
    });
    builder.addCase(updateMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== DELETE ==================
    builder.addCase(deleteMatch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteMatch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.matches = state.matches.filter((m) => m.id !== action.payload);
    });
    builder.addCase(deleteMatch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== START MATCH ==================
    builder.addCase(startMatch.fulfilled, (state, action) => {
      const index = state.matches.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.matches[index] = action.payload;
      }
      state.currentMatch = action.payload;
    });

    // ================== FINALIZE MATCH ==================
    builder.addCase(finalizeMatch.fulfilled, (state, action) => {
      const index = state.matches.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.matches[index] = action.payload;
      }
      state.currentMatch = action.payload;
    });

    // ================== SUBMIT THROW ==================
    builder.addCase(submitThrow.pending, (state) => {
      state.error = null;
    });
    builder.addCase(submitThrow.fulfilled, () => {
      // Throw wurde erfolgreich eingetragen
      // Match wird via fetchMatchById neu geladen
    });
    builder.addCase(submitThrow.rejected, (state, action) => {
      state.error = action.payload || 'Fehler beim Wurf';
    });
  },
});

// ========================================
// EXPORTS
// ========================================

export const { clearError, clearCurrentMatch } = matchesSlice.actions;

export default matchesSlice.reducer;

// ========================================
// SELECTORS
// ========================================

export const selectMatches = (state: { matches: MatchesState }) => state.matches.matches;
export const selectCurrentMatch = (state: { matches: MatchesState }) => state.matches.currentMatch;
export const selectMatchesLoading = (state: { matches: MatchesState }) => state.matches.isLoading;
export const selectMatchesError = (state: { matches: MatchesState }) => state.matches.error;
