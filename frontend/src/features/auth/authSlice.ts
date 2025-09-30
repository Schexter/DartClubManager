import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types'; // Annahme: User-Typ ist in types/index.ts definiert

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'), // Token beim Start aus dem LocalStorage laden
  isAuthenticated: !!localStorage.getItem('authToken'),
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer für den Login-Erfolg
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('authToken', action.payload.token);
    },
    // Reducer für den Logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
