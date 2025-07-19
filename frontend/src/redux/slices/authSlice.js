import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;