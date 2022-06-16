import { createSlice } from '@reduxjs/toolkit';

const passwordInitialState = {
  loading: false,
  allowResetPassword: false,
  error: ''
};

const passwordSlice = createSlice({
  name: 'password',
  initialState: passwordInitialState,
  reducers: {
    passwordLoading: (state) => {
      state.loading = true;
      state.error = '';
    },

    forgotPasswordReceived: (state) => {
      state.loading = false;
      state.allowResetPassword = true;
      state.error = '';
    },

    resetPasswordReceived: (state) => {
      state.loading = false;
      state.allowResetPassword = false;
      state.error = '';
    },

    passwordError: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = action.payload;
    },

    passwordClearError: (state) => {
      state.error = '';
    }
  }
})
export const { passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError, passwordClearError } = passwordSlice.actions;
export const passwordReducer = passwordSlice.reducer;