/**
 * Teams Slice - Redux State Management für Teams
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teamService } from '../../lib/api';
import type { Team, CreateTeamRequest, UpdateTeamRequest, AddTeamMemberRequest } from '../../lib/api/types';

// ========================================
// STATE INTERFACE
// ========================================

interface TeamsState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: TeamsState = {
  teams: [],
  currentTeam: null,
  isLoading: false,
  error: null,
};

// ========================================
// ASYNC THUNKS
// ========================================

/**
 * Fetch All Teams
 */
export const fetchTeams = createAsyncThunk<
  Team[],
  void,
  { rejectValue: string }
>(
  'teams/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await teamService.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden der Teams'
      );
    }
  }
);

/**
 * Fetch Single Team
 */
export const fetchTeamById = createAsyncThunk<
  Team,
  string,
  { rejectValue: string }
>(
  'teams/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await teamService.getById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden des Teams'
      );
    }
  }
);

/**
 * Create Team
 */
export const createTeam = createAsyncThunk<
  Team,
  CreateTeamRequest,
  { rejectValue: string }
>(
  'teams/create',
  async (data, { rejectWithValue }) => {
    try {
      return await teamService.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Erstellen des Teams'
      );
    }
  }
);

/**
 * Update Team
 */
export const updateTeam = createAsyncThunk<
  Team,
  { id: string; data: UpdateTeamRequest },
  { rejectValue: string }
>(
  'teams/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await teamService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Aktualisieren des Teams'
      );
    }
  }
);

/**
 * Delete Team
 */
export const deleteTeam = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'teams/delete',
  async (id, { rejectWithValue }) => {
    try {
      await teamService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Löschen des Teams'
      );
    }
  }
);

/**
 * Add Member to Team
 */
export const addTeamMember = createAsyncThunk<
  Team,
  { teamId: string; data: AddTeamMemberRequest },
  { rejectValue: string }
>(
  'teams/addMember',
  async ({ teamId, data }, { rejectWithValue }) => {
    try {
      return await teamService.addMember(teamId, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Hinzufügen des Mitglieds'
      );
    }
  }
);

/**
 * Remove Member from Team
 */
export const removeTeamMember = createAsyncThunk<
  { teamId: string; memberId: string },
  { teamId: string; memberId: string },
  { rejectValue: string }
>(
  'teams/removeMember',
  async ({ teamId, memberId }, { rejectWithValue }) => {
    try {
      await teamService.removeMember(teamId, memberId);
      return { teamId, memberId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Entfernen des Mitglieds'
      );
    }
  }
);

// ========================================
// SLICE
// ========================================

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTeam: (state) => {
      state.currentTeam = null;
    },
  },
  extraReducers: (builder) => {
    // ================== FETCH ALL ==================
    builder.addCase(fetchTeams.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== FETCH BY ID ==================
    builder.addCase(fetchTeamById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeamById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentTeam = action.payload;
    });
    builder.addCase(fetchTeamById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== CREATE ==================
    builder.addCase(createTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams.push(action.payload);
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== UPDATE ==================
    builder.addCase(updateTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.teams.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
      state.currentTeam = action.payload;
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== DELETE ==================
    builder.addCase(deleteTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams = state.teams.filter((t) => t.id !== action.payload);
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== ADD MEMBER ==================
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      const index = state.teams.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
      if (state.currentTeam?.id === action.payload.id) {
        state.currentTeam = action.payload;
      }
    });

    // ================== REMOVE MEMBER ==================
    builder.addCase(removeTeamMember.fulfilled, (state, action) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team && team.members) {
        team.members = team.members.filter((m) => m.id !== action.payload.memberId);
      }
      if (state.currentTeam?.id === action.payload.teamId && state.currentTeam.members) {
        state.currentTeam.members = state.currentTeam.members.filter(
          (m) => m.id !== action.payload.memberId
        );
      }
    });
  },
});

// ========================================
// EXPORTS
// ========================================

export const { clearError, clearCurrentTeam } = teamsSlice.actions;

export default teamsSlice.reducer;

// ========================================
// SELECTORS
// ========================================

export const selectTeams = (state: { teams: TeamsState }) => state.teams.teams;
export const selectCurrentTeam = (state: { teams: TeamsState }) => state.teams.currentTeam;
export const selectTeamsLoading = (state: { teams: TeamsState }) => state.teams.isLoading;
export const selectTeamsError = (state: { teams: TeamsState }) => state.teams.error;
