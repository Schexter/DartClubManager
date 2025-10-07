/**
 * Redux Store - Central State Management
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import membersReducer from '../features/members/membersSlice';
import teamsReducer from '../features/teams/teamsSlice';
import matchesReducer from '../features/matches/matchesSlice';
import organizationReducer from '../features/organization/organizationSlice';
import eventsReducer from '../features/events/eventsSlice';
import feesReducer from '../features/fees/feesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    members: membersReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    organization: organizationReducer,
    events: eventsReducer,
    fees: feesReducer,
  },
  // Middleware für besseres Debugging (optional)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoriere diese Actions (wenn nötig)
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  // Redux DevTools in Production deaktivieren
  devTools: import.meta.env.MODE !== 'production',
});

// Typen für die Verwendung im gesamten Projekt ableiten
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
