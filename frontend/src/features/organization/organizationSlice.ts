// Organization Redux Slice
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Organization } from '../../lib/api/types';

interface OrganizationState {
  currentOrganization: Organization | null;
  organizations: Organization[];
}

const initialState: OrganizationState = {
  currentOrganization: null,
  organizations: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization: (state, action: PayloadAction<Organization | null>) => {
      state.currentOrganization = action.payload;
    },
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
      if (action.payload.length > 0 && !state.currentOrganization) {
        state.currentOrganization = action.payload[0];
      }
    },
  },
});

export const { setCurrentOrganization, setOrganizations } = organizationSlice.actions;
export default organizationSlice.reducer;
