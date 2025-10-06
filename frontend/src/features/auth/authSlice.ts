/**
 * Auth Slice - Redux State Management für Authentifizierung
 * 
 * Features:
 * - Login/Register mit API
 * - JWT Token Management
 * - User State
 * - Async Thunks für API Calls
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService, setAuthToken, removeAuthToken } from '../../lib/api';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../../lib/api/types';

// ========================================
// STATE INTERFACE
// ========================================

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ========================================
// INITIAL STATE
// ========================================

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
};

// ========================================
// ASYNC THUNKS
// ========================================

/**
 * Login Thunk
 */
export const login = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      
      // Token speichern
      setAuthToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Login fehlgeschlagen. Bitte überprüfe deine Daten.'
      );
    }
  }
);

/**
 * Register Thunk
 */
export const register = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      
      // Token speichern
      setAuthToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registrierung fehlgeschlagen.'
      );
    }
  }
);

/**
 * Get Current User Thunk (für automatisches Login bei Page Reload)
 */
export const getCurrentUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.me();
      return response;
    } catch (error: any) {
      // Token ungültig → ausloggen
      removeAuthToken();
      return rejectWithValue('Session abgelaufen. Bitte erneut einloggen.');
    }
  }
);

/**
 * Logout Thunk
 */
export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      removeAuthToken();
    } catch (error: any) {
      // Auch bei Fehler ausloggen (Client-Side)
      removeAuthToken();
      return rejectWithValue('Logout fehlgeschlagen');
    }
  }
);

// ========================================
// SLICE
// ========================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clear Error
     */
    clearError: (state) => {
      state.error = null;
    },
    
    /**
     * Manual Logout (Client-Side only, ohne API Call)
     */
    logoutLocal: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeAuthToken();
    },
  },
  extraReducers: (builder) => {
    // ================== LOGIN ==================
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload || 'Login fehlgeschlagen';
    });

    // ================== REGISTER ==================
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload || 'Registrierung fehlgeschlagen';
    });

    // ================== GET CURRENT USER ==================
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      removeAuthToken();
    });

    // ================== LOGOUT ==================
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
  },
});

// ========================================
// EXPORTS
// ========================================

export const { clearError, logoutLocal } = authSlice.actions;

export default authSlice.reducer;

// ========================================
// SELECTORS
// ========================================

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
