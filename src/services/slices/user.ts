import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserAndEmail, TUserState } from "../types";
import { SliceNames } from '../constant'

const userInitialState: TUserState = {
  loading: false,
  loggedIn: false,
  user: null,
  error: ''
};

const userSlice = createSlice({
  name: SliceNames.USER,
  initialState: userInitialState,
  reducers: {
    userLoginLoading: (state: TUserState) => {
      state.loading = true;
      state.loggedIn = false;
      state.user = null;
      state.error = '';
    },

    userLoginReceived: (state: TUserState, action: PayloadAction<TUserAndEmail>) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = action.payload;
      state.error = '';
    },

    userLoginByToken: (state: TUserState) => {
      state.loggedIn = true;
      state.error = '';
    },

    userLogoutLoading: (state: TUserState) => {
      state.loading = true;
      state.error = '';
    },

    userLogoutReceived: () => userInitialState,

    userInfoLoading: (state: TUserState) => {
      state.loading = true;
      state.error = '';
    },

    userInfoReceived: (state: TUserState, action: PayloadAction<TUserAndEmail>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    },

    userError: (state: TUserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },

    userClear: () => userInitialState
  }
})
export const { userLoginLoading, userLoginReceived, userLogoutLoading, userLogoutReceived, userInfoLoading,
  userLoginByToken, userInfoReceived, userError, userClear } = userSlice.actions;
export const userReducer = userSlice.reducer;