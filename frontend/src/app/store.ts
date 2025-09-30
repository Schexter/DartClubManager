import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Typen für die Verwendung im gesamten Projekt ableiten
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
