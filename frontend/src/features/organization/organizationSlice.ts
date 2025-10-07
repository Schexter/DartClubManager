/**
 * Organization Redux Slice
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { organizationService } from '../../lib/api/services';
import type { Organization } from '../../lib/api/types';
import { setCurrentOrg } from '../auth/authSlice';  // ⭐ NEU: Import von authSlice

// ========================================
// STATE INTERFACE
// ========================================

interface OrganizationState {
  currentOrganization: Organization | null;
  organizations: Organization[];
  isLoading: boolean;
  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: OrganizationState = {
  currentOrganization: null,
  organizations: [],
  isLoading: false,
  error: null,
};

// ========================================
// ASYNC THUNKS
// ========================================

/**
 * Alle Organisationen des Users abrufen
 */
export const fetchMyOrganizations = createAsyncThunk<
  Organization[],
  void,
  { rejectValue: string }
>(
  'organization/fetchMyOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      return await organizationService.getMyOrganizations();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Fehler beim Laden der Organisationen'
      );
    }
  }
);

/**
 * Organisation wechseln (generiert neues JWT-Token)
 * TODO: Implement switchOrganization endpoint in backend
 */
// export const switchOrganization = createAsyncThunk<
//   { organization: Organization; token: string },
//   string, // orgId
//   { rejectValue: string }
// >(
//   'organization/switchOrganization',
//   async (orgId, { rejectWithValue, getState }) => {
//     try {
//       const response: AuthResponse = await organizationService.switchOrganization(orgId);
//
//       // Token speichern
//       setAuthToken(response.token);
//
//       // Organisation aus organizations-Liste finden
//       const state = getState() as { organization: OrganizationState };
//       const organization = state.organization.organizations.find(org => org.id === orgId);
//
//       if (!organization) {
//         throw new Error('Organisation nicht gefunden');
//       }
//
//       return { organization, token: response.token };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Fehler beim Wechseln der Organisation'
//       );
//     }
//   }
// );

// ========================================
// SLICE
// ========================================

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization: (state, action: PayloadAction<Organization | null>) => {
      state.currentOrganization = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ================== FETCH MY ORGANIZATIONS ==================
    builder.addCase(fetchMyOrganizations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMyOrganizations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.organizations = action.payload;
      
      // Wenn noch keine aktuelle Org: Erste Org als Standard setzen
      if (!state.currentOrganization && action.payload.length > 0) {
        state.currentOrganization = action.payload[0];
        // ⭐ NEU: Auch im authSlice und localStorage setzen
        // HINWEIS: Dies wird durch extraReducers gemacht, siehe unten
      }
    });
    builder.addCase(fetchMyOrganizations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Fehler';
    });

    // ================== SWITCH ORGANIZATION ==================
    // TODO: Uncomment when switchOrganization endpoint is implemented
    // builder.addCase(switchOrganization.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(switchOrganization.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.currentOrganization = action.payload.organization;
    // });
    // builder.addCase(switchOrganization.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload || 'Fehler';
    // });
  },
});

// ========================================
// EXPORTS
// ========================================

export const { setCurrentOrganization, clearError } = organizationSlice.actions;

export default organizationSlice.reducer;

// ========================================
// SELECTORS
// ========================================

export const selectCurrentOrganization = (state: { organization: OrganizationState }) => 
  state.organization.currentOrganization;

export const selectOrganizations = (state: { organization: OrganizationState }) => 
  state.organization.organizations;

export const selectOrganizationLoading = (state: { organization: OrganizationState }) => 
  state.organization.isLoading;

export const selectOrganizationError = (state: { organization: OrganizationState }) => 
  state.organization.error;
