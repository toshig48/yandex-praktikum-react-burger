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
    userLoginLoading: (state) => {
      state.loading = true;
      state.loggedIn = false;
      state.user = {};
      state.error = '';
    },

    userLoginReceived: (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
      state.error = '';
    },

    userLoginByToken: (state) => {
      state.loggedIn = true;
    },

    userLogoutLoading: (state) => {
      state.loading = true;
      state.error = '';
    },

    userLogoutReceived: (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.user = {};
      state.error = '';
    },

    userInfoLoading: (state) => {
      state.loading = true;
      state.error = '';
    },

    userInfoReceived: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    },

    userError: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.user = {};
      state.error = action.payload;
    },

    userClearError: (state) => {
      state.error = '';
    }
  }
})
export const { userLoginLoading, userLoginReceived, userLogoutLoading, userLogoutReceived, userInfoLoading, 
               userLoginByToken, userInfoReceived, userError, userClearError } = userSlice.actions;
export const userReducer = userSlice.reducer;