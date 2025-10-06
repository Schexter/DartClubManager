/**
 * Members Slice - Redux State Management für Mitglieder
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { memberService } from '../../lib/api';
import type { Member, CreateMemberRequest, UpdateMemberRequest } from '../../lib/api/types';

// ========================================
// STATE INTERFACE
// ========================================

interface MembersState {
  members: Member[];
  currentMember: Member | null;
  isLoading: boolean;
  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: MembersState = {
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,
};

// ========================================
// ASYNC THUNKS
// ========================================

/**
 * Fetch All Members
 */
export const fetchMembers = createAsyncThunk<
  Member[],
  void,
  { rejectValue: string }
>(
  'members/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await memberService.getAll();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden der Mitglieder'
      );
    }
  }
);

/**
 * Fetch Single Member
 */
export const fetchMemberById = createAsyncThunk<
  Member,
  string,
  { rejectValue: string }
>(
  'members/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await memberService.getById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden des Mitglieds'
      );
    }
  }
);

/**
 * Create Member
 */
export const createMember = createAsyncThunk<
  Member,
  CreateMemberRequest,
  { rejectValue: string }
>(
  'members/create',
  async (data, { rejectWithValue }) => {
    try {
      return await memberService.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Erstellen des Mitglieds'
      );
    }
  }
);

/**
 * Update Member
 */
export const updateMember = createAsyncThunk<
  Member,
  { id: string; data: UpdateMemberRequest },
  { rejectValue: string }
>(
  'members/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await memberService.update(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Aktualisieren des Mitglieds'
      );
    }
  }
);

/**
 * Delete Member
 */
export const deleteMember = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'members/delete',
  async (id, { rejectWithValue }) => {
    try {
      await memberService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Löschen des Mitglieds'
      );
    }
  }
);

// ========================================
// SLICE
// ========================================

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMember: (state) => {
      state.currentMember = null;
    },
  },
  extraReducers: (builder) => {
    // ================== FETCH ALL ==================
    builder.addCase(fetchMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = action.payload;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== FETCH BY ID ==================
    builder.addCase(fetchMemberById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMemberById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentMember = action.payload;
    });
    builder.addCase(fetchMemberById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== CREATE ==================
    builder.addCase(createMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members.push(action.payload);
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== UPDATE ==================
    builder.addCase(updateMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.members.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
      state.currentMember = action.payload;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== DELETE ==================
    builder.addCase(deleteMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.members = state.members.filter((m) => m.id !== action.payload);
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });
  },
});

// ========================================
// EXPORTS
// ========================================

export const { clearError, clearCurrentMember } = membersSlice.actions;

export default membersSlice.reducer;

// ========================================
// SELECTORS
// ========================================

export const selectMembers = (state: { members: MembersState }) => state.members.members;
export const selectCurrentMember = (state: { members: MembersState }) => state.members.currentMember;
export const selectMembersLoading = (state: { members: MembersState }) => state.members.isLoading;
export const selectMembersError = (state: { members: MembersState }) => state.members.error;
