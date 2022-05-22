import { createSlice } from '@reduxjs/toolkit';

const tokenInitialState = {
  loading: false, 
  error: ''
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenInitialState,
  reducers: {
    tokenLoading: (state) => {
      state.loading = true;
      state.error = '';
    },

    tokenReceived: (state) => {
      state.loading = false;
      state.error = '';
    },

    tokenError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
})
export const { tokenLoading, tokenReceived, tokenError } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;