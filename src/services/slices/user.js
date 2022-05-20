import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  loading: false,
  loggedIn: false,
  user: {},
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userLoading: (state) => {
      state.loading = true;
      state.loggedIn = false;
      state.user = {};
      state.error = '';
    },

    userReceived: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
      state.error = '';
    },

    userError: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.user = [];
      state.error = action.payload;
    },
  }
})
export const { userLoading, userReceived, userError } = userSlice.actions;
export const userReducer = userSlice.reducer;